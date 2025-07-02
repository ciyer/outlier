import { beforeEach, describe, expect, it } from "vitest";
import { type FetchMock } from "vitest-fetch-mock";

import Data from "../archive/Data";
import { groupedByYearQuarter } from "./utils";
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
      expect(group.name).toEqual("'18 Spring");
      expect(group.entries.length).toEqual(12);
    });
  });
});
