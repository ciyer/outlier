import { beforeEach, describe, expect, it } from "vitest";
import { type FetchMock } from "vitest-fetch-mock";

import Data from "../archive/Data";
import { groupedByFabric, groupedByStyle, groupedByYearQuarter } from "./utils";
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
        "S273",
        "S259",
        "K413",
        "P169",
        "K548",
        "K567",
        "O636",
        "P245",
      ]);
      expect(groups.length).toEqual(11);
      const group = groups[0];
      expect(group.name).toEqual("S314");
      expect(group.entries.length).toEqual(1);
    });
  });
  it("groups data by fabric", () => {
    fetch.mockResponseOnce(simpleData);
    return Data.read().then((releases) => {
      const groups = groupedByFabric(releases);
      // eslint-disable-next-line max-nested-callbacks
      const names = groups.map((g) => g.name);
      /* eslint-disable @cspell/spellchecker */
      expect(names).toEqual([
        "Air/jex",
        "Injected Linen",
        "Freecotton",
        "Daydry Merino Ciclo Jersey",
        "F. Cloth",
        "Nycogaze",
        "Sunwarp",
        "Trackwool",
      ]);
      /* eslint-enable @cspell/spellchecker */
      expect(groups.length).toEqual(8);
      const group = groups[0];
      expect(group.name).toEqual("Air/jex");
      expect(group.entries.length).toEqual(2);
    });
  });
});
