import { beforeEach, describe, expect, it } from "vitest";
import { type FetchMock } from "vitest-fetch-mock";

import Data from "../archive/Data";
import { groupedByStyle, groupedByYearQuarter } from "./utils";
import { simpleData } from "../archive/Data.test";

const fetch = global.fetch as FetchMock;

describe("chronological grouping", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("groups data chronologically", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const groups = groupedByYearQuarter(releases);
      expect(groups.length).toEqual(1);
      const group = groups[0];
      expect(group.name).toEqual("'25 Summer");
      expect(group.entries.length).toEqual(12);
    });
  });

  it("groups data by style", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const groups = groupedByStyle(releases);
      // eslint-disable-next-line max-nested-callbacks
      const names = groups.map((g) => g.name);
      expect(names).toEqual([
        "S314",
        "S315",
        "O634",
        "S273-i2",
        "S259-i2",
        "K413",
        "P169-i4",
        "K548",
        "K413-I2",
        "K567",
        "O636",
        "P245",
      ]);
      expect(groups.length).toEqual(12);
      const group = groups[0];
      expect(group.name).toEqual("S314");
      expect(group.entries.length).toEqual(1);
    });
  });
});
