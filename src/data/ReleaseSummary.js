import * as d3Array from 'd3-array';
import * as d3Time from 'd3-time';
import * as d3Collection from 'd3-collection';

function toIntegerString(num) {
  return num.toFixed(0);
}

function toPrices(releases) {
  return releases
    .filter(d => ("FALSE" === d["Historic"]) && (d["Price"] > 0))
    .map(d => d["Price"])
}

/**
 * Compute the global price bins for releases
 */
class ReleaseBaselineStats {
  constructor(releases) {
    this.releases = releases;
  }

  priceBins() {
    const releases = this.releases;
    const prices = toPrices(releases);
    const sortedPrices = prices.sort(d3Array.ascending);

    // const quartiles = [0.0, 0.25, 0.5, 0.75, 1.0];
    const quintiles = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const bins = quintiles.map(q => d3Array.quantile(sortedPrices, q));
    return bins;
  }

  compute() {
    const priceBins = this.priceBins();
    return {priceBins}
  }
}

/**
 * Summarize releases by price, season, month, and release frequency.
 */
class ReleaseSummary {
  constructor(releases, stats) {
    this.releases = releases;
    this.stats = stats;
    this.histogramData = releases.filter(d => ("FALSE" === d["Historic"]) && (null != d.releaseDate));
  }

  monthHistogram() {
    const histogramData = this.histogramData;
    const thresholds = [0,1,2,3,4,5,6,7,8,9,10,11];
    const hist = d3Array.histogram()
      .value((d) => d.releaseDate.getMonth())
      .thresholds(thresholds)(histogramData);
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const result = thresholds.map(t => ({min: 0, max: 0, count: 0, month: t+1, name: names[t]}));
    hist.forEach(d => { result[d.x0] = {min: d.x0, max: d.x1, count: d.length, month: d.x0 + 1, name: names[d.x0]} });
    return result;
  }

  seasonHistogram() {
    const histogramData = this.histogramData;
    const seasons = ["Winter", "Spring", "Summer", "Fall"];
    const resultMap = {};
    seasons.forEach(s => { resultMap[s] = {count: 0, name: s} });
    histogramData.forEach(d => {resultMap[d.season].count += 1});
    return seasons.map(s => resultMap[s]);
  }

  priceStats() {
    const releases = this.releases;
    const prices = toPrices(releases);
    const sortedPrices = prices.sort(d3Array.ascending);
    const priceBins = this.stats.priceBins;
    let length = priceBins.length;
    const rawPriceHist = d3Array.histogram().thresholds(priceBins.slice(0, length-1))(sortedPrices);
    length = rawPriceHist.length;
    const priceHistMap = {}
    rawPriceHist.forEach((d, i) => {
      priceHistMap[d.x0] = {min: d.x0, max: d.x1, count: d.length}
    });
    // Make sure the keys in the priceHistMap are from the bins, otherwise adjust
    Object.keys(priceHistMap).forEach(k => {
      const diffs = priceBins.map((b, i) => ({idx: i, bin: b, origBin: k, diff: Math.abs(b - k)}))
      diffs.sort((a, b) => a.diff - b.diff);
      if (diffs[0].diff !== 0) {
        const diff = diffs[0];
        priceHistMap[diff.bin] = priceHistMap[diff.origBin];
      }
    });
    length = priceBins.length;
    const priceHistogram = priceBins.slice(0, length-1).map((d, i) => {
      const priceBinAmt = toIntegerString(priceBins[i+1]);
      const name = (i > 0) ?
        (i === length - 2) ? `<=${priceBinAmt}` : `<${priceBinAmt}`
        : `$${d}-${priceBinAmt}`;
      const bin = {min: priceBins[i], max: priceBins[i+1], count: 0};
      if (priceHistMap[d] != null) bin['count'] = priceHistMap[d]['count']
      return {name, ...bin}
    });
    const priceMedian = d3Array.median(prices);
    return { priceHistogram, priceMedian }
  }

  releaseGapWeeks() {
    const thisYear = new Date().getFullYear();
    // Only look at releases in the last 7 years
    const cutoffYear = thisYear - 8;
    const releases = this.releases.filter(d => ("FALSE" === d["Historic"]) &&
      (null != d.releaseDate) &&
      (cutoffYear < d.releaseDate.getFullYear()));
    if (releases.length < 1) return [];
    // Get all number of weeks between releases
    const durations = [];
    const seenYears = {};
    releases.reduce((later, earlier) => {
      if (later != null) {
        const year = later.releaseDate.getFullYear();
        seenYears[year] = true;
        durations.push({year: year, durationWeeks: d3Time.timeWeek.count(earlier.releaseDate, later.releaseDate)});
      }
      return earlier;
    });
    // Ensure all years since cutoff are represented
    for (let i = 0; i < thisYear - cutoffYear; ++i) {
      const year = cutoffYear + 1 + i;
      if (seenYears[year] == null) {
        durations.push({year: year, durationWeeks: -1})
      }
    }
    // Group the release gaps by year and duration
    const durationsMap = d3Collection.nest()
      .key(d => d.year).sortKeys(d3Array.ascending)
      .key(d => d.durationWeeks).sortKeys(d3Array.ascending)
      .rollup(c => c.length)
      .entries(durations);
    // Flatten the array;
    const result = [];
    durationsMap.forEach(y => {
      const year = y.key;
      const durs = y.values;
      durs.forEach(d => {
        const binNum = +d.key;
        const bin = binNum > -1 ? binNum : 0;
        const count = binNum > -1 ? +d.value : 0
        result.push({year: +year, bin, count })
      })
    });
    return result;
  }

  compute() {
    const monthHistogram = this.monthHistogram();
    const { priceHistogram, priceMedian } = this.priceStats();
    const seasonHistogram = this.seasonHistogram();
    const releaseGapWeeks = this.releaseGapWeeks();
    return { monthHistogram, priceHistogram, priceMedian, seasonHistogram, releaseGapWeeks }
  }
}

/**
 * Summarize Fabrics in the releases
 */
class ReleaseFabricSummary {
  constructor(releases, stats) {
    this.releases = releases;
  }

  fabricUseCount() {
    const releases = this.releases;
    const result = {};
    releases.forEach(r => {
      const count = (result[r.Fabric]) ? result[r.Fabric] + 1 : 1;
      result[r.Fabric] = count;
    });
    return result;
  }

  compute() {
    const fabricUseCount = this.fabricUseCount();
    return { fabricUseCount }
  }
}

function colorsArrayFromField(colors) {
  return colors.split(",").map(w => w.trim()).filter(w => w.length > 0)
}

/**
 * Summarize Colors in the releases
 */
 class ReleaseColorSummary {
  constructor(releases, stats) {
    this.releases = releases;
  }

  colorUseCount() {
    const releases = this.releases;
    const result = {};
    releases.forEach(r => {
      colorsArrayFromField(r["Colors"]).forEach(c => {
        const count = (result[c]) ? result[c] + 1 : 1;
        result[c] = count;
      })
    });
    return result;
  }

  compute() {
    const colorUseCount = this.colorUseCount();
    return { colorUseCount }
  }
}

export { ReleaseSummary, ReleaseBaselineStats, ReleaseFabricSummary, ReleaseColorSummary };
