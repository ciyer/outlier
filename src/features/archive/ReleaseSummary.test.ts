import { beforeEach, describe, expect, it } from "vitest";
import { type FetchMock } from "vitest-fetch-mock";

import {
  ReleaseSummary,
  ReleaseBaselineStats,
  ReleaseColorSummary,
  ReleaseFabricSummary,
} from "./ReleaseSummary";

import Data from "./Data";
import { simpleData } from "./Data.test";

const fetch = global.fetch as FetchMock;

/* eslint-disable max-nested-callbacks */

describe("summary", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("computes summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([
        110, 124, 164.00000000000003, 212, 350, 750,
      ]);

      const summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.monthHistogram).toEqual([
        { min: 0, max: 0, count: 0, month: 1, name: "Jan" },
        { min: 0, max: 0, count: 0, month: 2, name: "Feb" },
        { min: 0, max: 0, count: 0, month: 3, name: "Mar" },
        { min: 0, max: 0, count: 0, month: 4, name: "Apr" },
        { min: 0, max: 0, count: 0, month: 5, name: "May" },
        { min: 0, max: 0, count: 0, month: 6, name: "Jun" },
        { min: 6, max: 6, count: 12, month: 7, name: "Jul" },
        { min: 0, max: 0, count: 0, month: 8, name: "Aug" },
        { min: 0, max: 0, count: 0, month: 9, name: "Sep" },
        { min: 0, max: 0, count: 0, month: 10, name: "Oct" },
        { min: 0, max: 0, count: 0, month: 11, name: "Nov" },
        { min: 0, max: 0, count: 0, month: 12, name: "Dec" },
      ]);
      expect(summary.seasonHistogram).toEqual([
        { count: 0, name: "Winter" },
        { count: 0, name: "Spring" },
        { count: 12, name: "Summer" },
        { count: 0, name: "Fall" },
      ]);
      expect(summary.priceMedian).toEqual(200);
      expect(summary.priceHistogram).toEqual([
        { count: 3, max: 124, min: 110, name: "$110-124" },
        { count: 2, max: 164.00000000000003, min: 124, name: "<164" },
        { count: 2, max: 212, min: 164.00000000000003, name: "<212" },
        { count: 1, max: 350, min: 212, name: "<350" },
        { count: 4, max: 750, min: 350, name: "<=750" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2026)).toEqual([
        { bin: 0, count: 0, year: 2018 },
        {
          bin: 0,
          count: 0,
          year: 2019,
        },
        {
          bin: 0,
          count: 0,
          year: 2020,
        },
        {
          bin: 0,
          count: 0,
          year: 2021,
        },
        {
          bin: 0,
          count: 0,
          year: 2022,
        },
        {
          bin: 0,
          count: 0,
          year: 2023,
        },
        {
          bin: 0,
          count: 0,
          year: 2024,
        },
        {
          bin: 0,
          count: 8,
          year: 2025,
        },
        {
          bin: 1,
          count: 3,
          year: 2025,
        },
      ]);
    });
  });

  it("computes filtered price histogram", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([
        110, 124, 164.00000000000003, 212, 350, 750,
      ]);

      let summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.priceMedian).toEqual(200);
      expect(summary.priceHistogram).toEqual([
        { count: 3, max: 124, min: 110, name: "$110-124" },
        { count: 2, max: 164.00000000000003, min: 124, name: "<164" },
        { count: 2, max: 212, min: 164.00000000000003, name: "<212" },
        { count: 1, max: 350, min: 212, name: "<350" },
        { count: 4, max: 750, min: 350, name: "<=750" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2026)).toEqual([
        { bin: 0, count: 0, year: 2018 },
        {
          bin: 0,
          count: 0,
          year: 2019,
        },
        {
          bin: 0,
          count: 0,
          year: 2020,
        },
        { bin: 0, count: 0, year: 2021 },
        {
          bin: 0,
          count: 0,
          year: 2022,
        },
        {
          bin: 0,
          count: 0,
          year: 2023,
        },
        {
          bin: 0,
          count: 0,
          year: 2024,
        },
        {
          bin: 0,
          count: 8,
          year: 2025,
        },
        {
          bin: 1,
          count: 3,
          year: 2025,
        },
      ]);

      const pants = releases.filter((d) => d.subcategory === "Pants");
      summary = new ReleaseSummary(pants, stats).compute();
      expect(summary.priceMedian).toEqual(210);
      expect(summary.priceHistogram).toEqual([
        { count: 0, max: 124, min: 110, name: "$110-124" },
        {
          count: 0,
          max: 164.00000000000003,
          min: 124,
          name: "<164",
        },
        { count: 0, max: 212, min: 164.00000000000003, name: "<212" },
        { count: 1, max: 350, min: 212, name: "<350" },
        { count: 0, max: 750, min: 350, name: "<=750" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2022)).toEqual([
        { bin: 0, count: 0, year: 2018 },
        {
          bin: 0,
          count: 0,
          year: 2019,
        },
        {
          bin: 0,
          count: 0,
          year: 2020,
        },
        {
          bin: 0,
          count: 0,
          year: 2021,
        },
      ]);
    });
  });

  it("computes fabric use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const summary = new ReleaseFabricSummary(releases).compute();
      expect(summary.fabricUseCount).toEqual({
        /* eslint-disable @cspell/spellchecker */
        "Air/jex": 2,
        "Daydry Merino Ciclo Jersey": 1,
        "F. Cloth": 2,
        Freecotton: 2,
        "Injected Linen": 1,
        Nycogaze: 2,
        Sunwarp: 1,
        Trackwool: 1,
        /* eslint-enable @cspell/spellchecker */
      });
    });
  });

  it("computes filtered fabric use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const pants = releases.filter((d) => d.subcategory === "Pants");
      const summary = new ReleaseFabricSummary(pants).compute();
      expect(summary.fabricUseCount).toEqual({
        "F. Cloth": 2,
      });
    });
  });

  it("computes color use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const summary = new ReleaseColorSummary(releases).compute();
      expect(summary.colorUseCount).toEqual({
        /* eslint-disable @cspell/spellchecker */
        Alienseahorsedog: 1,
        Anthracite: 2,
        Black: 4,
        "Black + White": 1,
        Blackgauze: 2,
        Bluegauze: 2,
        Bluestripe: 2,
        Chillbrown: 1,
        Concrete: 1,
        Crossedlines: 2,
        "Dark Navy": 2,
        "Darkpink Irigrid": 1,
        Darkstripe: 1,
        "Darkyellow Irigrid": 1,
        "Darkyellow Sweethome": 1,
        Doubleblack: 1,
        Dryblack: 1,
        "Dust Olive": 1,
        Freakedflag: 1,
        "Gothic + Black": 1,
        "Hi Viz Yellow": 1,
        Lightglitch: 1,
        Mauvesmoke: 1,
        "Navylit + Lightlines": 1,
        "Olive + Sativa": 1,
        Olivegauze: 2,
        "Pale Sky": 2,
        "Pink Snakelightning": 1,
        Pinkgeometries: 1,
        Ravenwing: 1,
        Smoketaupe: 1,
        Subprintblack: 1,
        Taupedusk: 1,
        "White + Black": 1,
        "Yellow Rockstatic": 1,
        /* eslint-enable @cspell/spellchecker */
      });
    });
  });

  it("computes filtered fabric use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const pants = releases.filter((d) => d.subcategory === "Pants");
      const summary = new ReleaseColorSummary(pants).compute();
      expect(summary.colorUseCount).toEqual({
        /* eslint-disable @cspell/spellchecker */
        Anthracite: 1,
        Black: 2,
        Chillbrown: 1,
        Concrete: 1,
        "Dark Navy": 2,
        "Dust Olive": 1,
        Smoketaupe: 1,
        /* eslint-enable @cspell/spellchecker */
      });
    });
  });
});
