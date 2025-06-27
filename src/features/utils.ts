import * as d3Collection from "d3-collection";
import { type DataRow } from "./archive";

export function groupedByYearQuarter(data: DataRow[]) {
  if (data.length < 1) return [{ name: "Chronological", entries: data }];
  const keyFunc = (d: DataRow) => {
    if (d.releaseDate == null) return "??";
    const yearNum = d.releaseDate.getFullYear() - 2000;
    // Winter spans two years
    const year =
      d.season === "Winter"
        ? d.releaseDate.getMonth() < 3
          ? `${yearNum - 1}-'${yearNum}`
          : `${yearNum}-'${yearNum + 1}`
        : `'${yearNum} ${d.season}`;
    return year;
  };
  // Group the data chronologically (by year, quarter)
  const groups = d3Collection
    .nest<DataRow, DataRow[]>()
    .key(keyFunc)
    .entries(data)
    .map((g) => ({ name: g.key, entries: g.values as DataRow[] }));
  return groups;
}

export function urlStringForProductName(name: string): string {
  return name.replace(/\//g, "%2F").replace(/ /g, "+");
}
