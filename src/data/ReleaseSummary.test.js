import { beforeEach, describe, expect, it } from "vitest";

import {
  ReleaseSummary,
  ReleaseBaselineStats,
  ReleaseColorSummary,
  ReleaseFabricSummary,
} from "./ReleaseSummary";

import Data from "./Data";
import { simpleData } from "./Data.test";

describe("summary", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("computes summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([59, 120, 125, 130, 185.4, 495]);

      const summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.monthHistogram).toEqual([
        { min: 0, max: 0, count: 0, month: 1, name: "Jan" },
        { min: 0, max: 0, count: 0, month: 2, name: "Feb" },
        { min: 2, max: 3, count: 5, month: 3, name: "Mar" },
        { min: 3, max: 3, count: 7, month: 4, name: "Apr" },
        { min: 0, max: 0, count: 0, month: 5, name: "May" },
        { min: 0, max: 0, count: 0, month: 6, name: "Jun" },
        { min: 0, max: 0, count: 0, month: 7, name: "Jul" },
        { min: 0, max: 0, count: 0, month: 8, name: "Aug" },
        { min: 0, max: 0, count: 0, month: 9, name: "Sep" },
        { min: 0, max: 0, count: 0, month: 10, name: "Oct" },
        { min: 0, max: 0, count: 0, month: 11, name: "Nov" },
        { min: 0, max: 0, count: 0, month: 12, name: "Dec" },
      ]);
      expect(summary.seasonHistogram).toEqual([
        { count: 0, name: "Winter" },
        { count: 12, name: "Spring" },
        { count: 0, name: "Summer" },
        { count: 0, name: "Fall" },
      ]);
      expect(summary.priceMedian).toEqual(127.5);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 2, name: "$59-120" },
        { min: 120, max: 125, count: 2, name: "<125" },
        { min: 125, max: 130, count: 2, name: "<130" },
        { min: 130, max: 185.4, count: 3, name: "<185" },
        { min: 185.4, max: 495, count: 3, name: "<=495" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2022)).toEqual([
        { year: 2018, bin: 0, count: 8 },
        { year: 2018, bin: 1, count: 3 },
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

  it("computes filtered price histogram", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([59, 120, 125, 130, 185.4, 495]);

      let summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.priceMedian).toEqual(127.5);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 2, name: "$59-120" },
        { min: 120, max: 125, count: 2, name: "<125" },
        { min: 125, max: 130, count: 2, name: "<130" },
        { min: 130, max: 185.4, count: 3, name: "<185" },
        { min: 185.4, max: 495, count: 3, name: "<=495" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2019)).toEqual([
        { bin: 0, count: 8, year: 2018 },
        { bin: 1, count: 3, year: 2018 },
      ]);

      const pants = releases.filter((d) => d.subcategory === "Pants");
      summary = new ReleaseSummary(pants, stats).compute();
      expect(summary.priceMedian).toEqual(130);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 0, name: "$59-120" },
        { min: 120, max: 125, count: 2, name: "<125" },
        { min: 125, max: 130, count: 0, name: "<130" },
        { min: 130, max: 185.4, count: 3, name: "<185" },
        { min: 185.4, max: 495, count: 2, name: "<=495" },
      ]);
      expect(summary.releaseGapWeeks.filter((d) => d.year < 2022)).toEqual([
        { bin: 0, count: 4, year: 2018 },
        { bin: 1, count: 1, year: 2018 },
        { bin: 2, count: 1, year: 2018 },
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
        Dyneema: 1,
        "F. Cloth": 4,
        Linen: 3,
        Ramie: 1,
        Strongtwill: 1,
        "Ultra Ultra": 1,
        "“60/30”": 1,
      });
    });
  });

  it("computes filtered fabric use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const pants = releases.filter((d) => d.subcategory === "Pants");
      const summary = new ReleaseFabricSummary(pants).compute();
      expect(summary.fabricUseCount).toEqual({
        "F. Cloth": 4,
        Strongtwill: 1,
        "Ultra Ultra": 1,
        "“60/30”": 1,
      });
    });
  });

  it("computes color use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const summary = new ReleaseColorSummary(releases).compute();
      expect(summary.colorUseCount).toEqual({
        "Artificial Grape": 3,
        Black: 4,
        "Black Rock": 3,
        "Blade Gray": 4,
        "Blue AF": 4,
        Brick: 1,
        Charcoal: 2,
        "Charcoal Brown": 1,
        "Dark Marine": 1,
        "Deep Gray": 4,
        "Dry Rose": 4,
        "Earth Taupe": 1,
        "Flat Black": 4,
        "Gray Rock": 3,
        "Gray Space": 1,
        Lemon: 3,
        Magenta: 1,
        "Matte Navy": 1,
        Navy: 2,
        Olive: 1,
        Orange: 3,
        Purple: 1,
        Refraction: 4,
        Sand: 1,
        "Sky Blue": 3,
        Teal: 1,
        "Titian Blue": 4,
        White: 1,
      });
    });
  });

  it("computes filtered fabric use summary", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const pants = releases.filter((d) => d.subcategory === "Pants");
      const summary = new ReleaseColorSummary(pants).compute();
      expect(summary.colorUseCount).toEqual({
        Black: 2,
        "Blade Gray": 4,
        "Blue AF": 4,
        Brick: 1,
        Charcoal: 2,
        "Dark Marine": 1,
        "Deep Gray": 4,
        "Dry Rose": 4,
        "Earth Taupe": 1,
        "Flat Black": 4,
        "Gray Space": 1,
        "Matte Navy": 1,
        Navy: 1,
        Refraction: 4,
        "Titian Blue": 4,
      });
    });
  });
});
