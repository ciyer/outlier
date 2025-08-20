import * as d3Array from "d3-array";
import * as d3Time from "d3-time";
import * as d3Collection from "d3-collection";
import _ from "lodash";

import type { DataRow, ReduxDataRow } from "./Data";

type DetailedHistogramData = {
  min: number;
  max: number;
  count: number;
  name: string;
};

export type ComputedReleaseSummary = {
  monthHistogram: (DetailedHistogramData & { month: number })[];
  priceHistogram: DetailedHistogramData[];
  priceMedian: number | undefined;
  seasonHistogram: Pick<DetailedHistogramData, "count" | "name">[];
  releaseGapWeeks: {
    year: number;
    bin: number;
    count: number;
  }[];
};

type Duration = {
  year: number;
  durationWeeks: number;
};

function toIntegerString(num: number) {
  return num.toFixed(0);
}

function toPrices(releases: ReduxDataRow[]) {
  return releases
    .filter(
      (d) => "FALSE" === d["Historic"] && d["Price"] != null && d["Price"] > 0
    )
    .map((d) => d["Price"] as number);
}

/**
 * Compute the global price bins for releases
 */
export class ReleaseBaselineStats {
  releases: ReduxDataRow[];

  constructor(releases: ReduxDataRow[]) {
    this.releases = releases;
  }

  priceBins(): number[] {
    const releases = this.releases;
    const prices = toPrices(releases);
    const sortedPrices = prices.sort(d3Array.ascending);

    // const quartiles = [0.0, 0.25, 0.5, 0.75, 1.0];
    const quintiles = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const bins = quintiles
      .map((q) => d3Array.quantile(sortedPrices, q))
      .filter((d) => d != null);
    return bins as number[];
  }

  compute(): { priceBins: number[] } {
    const priceBins = this.priceBins();
    return { priceBins };
  }
}

/**
 * Summarize releases by price, season, month, and release frequency.
 */
export class ReleaseSummary {
  releases: DataRow[];
  stats: { priceBins: number[] };
  histogramData: DataRow[];

  constructor(releases: DataRow[], stats: { priceBins: number[] }) {
    this.releases = releases;
    this.stats = stats;
    this.histogramData = releases.filter(
      (d) => "FALSE" === d["Historic"] && null != d.releaseDate
    );
  }

  monthHistogram() {
    const histogramData = this.histogramData;
    const thresholds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const hist = d3Array.bin().thresholds(thresholds)(
      histogramData.map((d) => d.releaseDate?.getMonth() ?? 0)
    );
    const names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const result = thresholds.map((t) => ({
      min: 0,
      max: 0,
      count: 0,
      month: t + 1,
      name: names[t],
    }));
    hist.forEach((d) => {
      if (d.x0 == null || d.x1 == null) return;
      result[d.x0] = {
        min: d.x0,
        max: d.x1,
        count: d.length,
        month: d.x0 + 1,
        name: names[d.x0],
      };
    });
    return result;
  }

  seasonHistogram() {
    const histogramData = this.histogramData;
    const seasons = ["Winter", "Spring", "Summer", "Fall"];
    const resultMap: Record<string, { count: number; name: string }> = {};
    seasons.forEach((s) => {
      resultMap[s] = { count: 0, name: s };
    });
    histogramData.forEach((d) => {
      resultMap[d.season].count += 1;
    });
    return seasons.map((s) => resultMap[s]);
  }

  priceStats() {
    const releases = this.releases;
    const prices = toPrices(releases);
    const sortedPrices = prices
      .sort(d3Array.ascending)
      .filter((d) => d != null);
    const priceBins = this.stats.priceBins;
    let length = priceBins.length;
    const rawPriceHist = d3Array
      .bin()
      .thresholds(priceBins.slice(0, length - 1))(sortedPrices);
    length = priceBins.length;
    const priceHistogram = priceBins.slice(0, length - 1).map((d, i) => {
      const priceBinAmt =
        i == 0
          ? toIntegerString(priceBins[i + 1] - 1)
          : toIntegerString(priceBins[i + 1]);
      const name =
        i > 0
          ? i === length - 2
            ? `<=${priceBinAmt}`
            : `<${priceBinAmt}`
          : `$${d}-${priceBinAmt}`;
      const bin = { min: priceBins[i], max: priceBins[i + 1], count: 0 };
      if (rawPriceHist[i] != null) bin["count"] = rawPriceHist[i].length;
      return { name, ...bin };
    });
    const priceMedian = d3Array.median(prices);
    return { priceHistogram, priceMedian };
  }

  releaseGapWeeks() {
    const thisYear = new Date().getFullYear();
    // Only look at releases in the last 7 years
    const cutoffYear = thisYear - 8;
    const releases = this.releases.filter(
      (d) =>
        "FALSE" === d["Historic"] &&
        null != d.releaseDate &&
        cutoffYear < d.releaseDate.getFullYear()
    );
    if (releases.length < 1) return [];
    // Get all number of weeks between releases
    const durations: Duration[] = [];
    const seenYears: Record<number, boolean> = {};
    releases.reduce((later, earlier) => {
      if (later != null) {
        const year = later.releaseDate!.getFullYear();
        seenYears[year] = true;
        durations.push({
          year: year,
          durationWeeks: d3Time.timeWeek.count(
            earlier.releaseDate!,
            later.releaseDate!
          ),
        });
      }
      return earlier;
    });
    // Ensure all years since cutoff are represented
    for (let i = 0; i < thisYear - cutoffYear; ++i) {
      const year = cutoffYear + 1 + i;
      if (seenYears[year] == null) {
        durations.push({ year: year, durationWeeks: -1 });
      }
    }
    // Group the release gaps by year and duration
    const durationsMap = d3Collection
      .nest<Duration, number>()
      .key((d) => `${d.year}`)
      .sortKeys(d3Array.ascending)
      .key((d) => `${d.durationWeeks}`)
      .sortKeys(d3Array.ascending)
      .rollup((c) => c.length)
      .entries(durations);
    // Flatten the array;
    const result: { year: number; bin: number; count: number }[] = [];
    durationsMap.forEach((y) => {
      const year = y.key;
      const durs: { key: string; value: number }[] = y.values;
      durs.forEach((d) => {
        const binNum = +d.key;
        const bin = binNum > -1 ? binNum : 0;
        const count = binNum > -1 ? +d.value : 0;
        result.push({ year: +year, bin, count });
      });
    });
    return result;
  }

  compute(): ComputedReleaseSummary {
    const monthHistogram = this.monthHistogram();
    const { priceHistogram, priceMedian } = this.priceStats();
    const seasonHistogram = this.seasonHistogram();
    const releaseGapWeeks = this.releaseGapWeeks();
    return {
      monthHistogram,
      priceHistogram,
      priceMedian,
      seasonHistogram,
      releaseGapWeeks,
    };
  }
}

/**
 * Summarize Fabrics in the releases
 */
export class ReleaseFabricSummary {
  releases: ReduxDataRow[];
  constructor(releases: ReduxDataRow[]) {
    this.releases = releases;
  }

  fabricUseCount() {
    const releases = this.releases;
    const result: Record<string, number> = {};
    releases.forEach((r) => {
      const count = result[r.Fabric] ? result[r.Fabric] + 1 : 1;
      result[r.Fabric] = count;
    });
    return result;
  }

  compute() {
    const fabricUseCount = this.fabricUseCount();
    return { fabricUseCount };
  }
}

function colorsArrayFromField(colors: string): string[] {
  return colors
    .split(",")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

/**
 * Summarize Colors in the releases
 */
export class ReleaseColorSummary {
  releases: ReduxDataRow[];
  constructor(releases: ReduxDataRow[]) {
    this.releases = releases;
  }

  colorUseCount() {
    const releases = this.releases;
    const result: Record<string, number> = {};
    releases.forEach((r) => {
      if (r["Colors"] == null || r["Colors"].length === 0) return;
      colorsArrayFromField(r["Colors"]).forEach((c) => {
        const count = result[c] ? result[c] + 1 : 1;
        result[c] = count;
      });
    });
    return result;
  }

  compute() {
    const colorUseCount = this.colorUseCount();
    return { colorUseCount };
  }
}

function stopWords(d: string): boolean {
  const w = d.toLowerCase();
  const hits = ["the", "a", "+", "-"].filter((s) => s === w);
  return hits.length === 0;
}

/**
 * Summarize Text in the releases
 */
export class ReleaseTextSummary {
  releases: ReduxDataRow[];
  constructor(releases: ReduxDataRow[]) {
    this.releases = releases;
  }

  textUseCount() {
    const releases = this.releases;
    const result: Record<string, number> = {};
    releases.forEach((r) => {
      r["Product"]
        .split(" ")
        .map((w) => w.trim())
        .filter(stopWords)
        .forEach((w) => {
          const count = result[w] ? result[w] + 1 : 1;
          result[w] = count;
        });
    });
    return result;
  }

  compute() {
    const textUseCount = this.textUseCount();
    return { textUseCount };
  }
}
