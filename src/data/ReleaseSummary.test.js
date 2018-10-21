import { ReleaseSummary, ReleaseBaselineStats } from './ReleaseSummary';

import Data from './Data';
import { simpleData } from './Data.test';

describe('summary', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('computes summary', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(releases => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([59, 120, 125, 130, 188, 495]);

      const summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.monthHistogram).toEqual([
        { min: 0, max: 0, count: 0, month: 1, name: 'Jan' },
        { min: 0, max: 0, count: 0, month: 2, name: 'Feb' },
        { min: 2, max: 3, count: 2, month: 3, name: 'Mar' },
        { min: 3, max: 3, count: 4, month: 4, name: 'Apr' },
        { min: 0, max: 0, count: 0, month: 5, name: 'May' },
        { min: 0, max: 0, count: 0, month: 6, name: 'Jun' },
        { min: 0, max: 0, count: 0, month: 7, name: 'Jul' },
        { min: 0, max: 0, count: 0, month: 8, name: 'Aug' },
        { min: 0, max: 0, count: 0, month: 9, name: 'Sep' },
        { min: 0, max: 0, count: 0, month: 10, name: 'Oct' },
        { min: 0, max: 0, count: 0, month: 11, name: 'Nov' },
        { min: 0, max: 0, count: 0, month: 12, name: 'Dec' },
      ]);
      expect(summary.seasonHistogram).toEqual([
        { count: 0, name: 'Winter' },
        { count: 6, name: 'Spring' },
        { count: 0, name: 'Summer' },
        { count: 0, name: 'Fall' },
      ]);
      expect(summary.priceMedian).toEqual(127.5);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 1, name: "$59-120" },
        { min: 120, max: 125, count: 1, name: "<125" },
        { min: 125, max: 130, count: 1, name: "<130" },
        { min: 130, max: 188, count: 1, name: "<188" },
        { min: 188, max: 495, count: 2, "name": "<=495" }
      ]);
      expect(summary.releaseGapWeeks.filter(d => d.year < 2019)).toEqual([
        { year: 2012, bin: 0, count: 0},
        { year: 2013, bin: 0, count: 0},
        { year: 2014, bin: 0, count: 0},
        { year: 2015, bin: 0, count: 0},
        { year: 2016, bin: 0, count: 0},
        { year: 2017, bin: 0, count: 0},
        { year: 2018, bin: 0, count: 3},
        { year: 2018, bin: 1, count: 1},
        { year: 2018, bin: 2, count: 1}
      ]);
    });
  });

  it('computes filtered price histogram', () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then(releases => {
      const stats = new ReleaseBaselineStats(releases).compute();
      expect(stats.priceBins).toEqual([59, 120, 125, 130, 188, 495]);

      let summary = new ReleaseSummary(releases, stats).compute();
      expect(summary.priceMedian).toEqual(127.5);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 1, name: "$59-120" },
        { min: 120, max: 125, count: 1, name: "<125" },
        { min: 125, max: 130, count: 1, name: "<130" },
        { min: 130, max: 188, count: 1, name: "<188" },
        { min: 188, max: 495, count: 2, "name": "<=495" }
      ]);
      expect(summary.releaseGapWeeks.filter(d => d.year < 2019)).toEqual([
        { year: 2012, bin: 0, count: 0},
        { year: 2013, bin: 0, count: 0},
        { year: 2014, bin: 0, count: 0},
        { year: 2015, bin: 0, count: 0},
        { year: 2016, bin: 0, count: 0},
        { year: 2017, bin: 0, count: 0},
        { year: 2018, bin: 0, count: 3},
        { year: 2018, bin: 1, count: 1},
        { year: 2018, bin: 2, count: 1}
      ]);

      const pants = releases.filter(d => d.subcategory === 'Pants');
      summary = new ReleaseSummary(pants, stats).compute();
      expect(summary.priceMedian).toEqual(130);
      expect(summary.priceHistogram).toEqual([
        { min: 59, max: 120, count: 0, name: "$59-120" },
        { min: 120, max: 125, count: 1, name: "<125" },
        { min: 125, max: 130, count: 0, name: "<130" },
        { min: 130, max: 188, count: 1, name: "<188" },
        { min: 188, max: 495, count: 1, "name": "<=495" }
      ]);
      expect(summary.releaseGapWeeks.filter(d => d.year < 2019)).toEqual([
        { year: 2012, bin: 0, count: 0},
        { year: 2013, bin: 0, count: 0},
        { year: 2014, bin: 0, count: 0},
        { year: 2015, bin: 0, count: 0},
        { year: 2016, bin: 0, count: 0},
        { year: 2017, bin: 0, count: 0},
        { year: 2018, bin: 0, count: 1},
        { year: 2018, bin: 3, count: 1}
      ]);
    });
  });
});
