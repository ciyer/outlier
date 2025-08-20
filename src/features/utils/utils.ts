import * as d3Collection from "d3-collection";
import { type DataRow } from "../archive";

export type GroupedDataRows = {
  name: string;
  entries: DataRow[];
}[];

export function groupedByYearQuarter(data: DataRow[]): GroupedDataRows {
  if (data.length < 1) return [{ name: "Chronological", entries: data }];
  const keyFunc = (d: DataRow) => {
    if (d.releaseDate == null) return "??";
    const yearNum = d.releaseDate.getFullYear() - 2000;
    // Winter spans two years
    const year =
      d.season === "Winter"
        ? d.releaseDate.getMonth() < 3
          ? `${yearNum - 1}-'${yearNum} ${d.season}`
          : `${yearNum}-'${yearNum + 1} ${d.season}`
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

export function groupedByStyle(data: DataRow[]): GroupedDataRows {
  if (data.length < 1) return [{ name: "Chronological", entries: data }];
  const keyFunc = (d: DataRow) => {
    if (d["Web Style"] == null || d["Web Style"] === "") return "??";
    const webStyle = d["Web Style"];
    return webStyle.split("-")[0].trim(); // Remove any suffix like "-i2"
  };
  // Group the data chronologically (by year, quarter)
  const groups = d3Collection
    .nest<DataRow, DataRow[]>()
    .key(keyFunc)
    .entries(data)
    .map((g) => ({ name: g.key, entries: g.values as DataRow[] }))
    .filter((g) => g.name != null && g.name !== "??");
  return groups;
}

export function groupedByFabric(data: DataRow[]): GroupedDataRows {
  if (data.length < 1) return [{ name: "Chronological", entries: data }];
  const keyFunc = (d: DataRow) => {
    if (d["Fabric"] == null || d["Fabric"] === "") return "??";
    const fabric = d["Fabric"];
    return fabric;
  };
  // Group the data chronologically (by year, quarter)
  const groups = d3Collection
    .nest<DataRow, DataRow[]>()
    .key(keyFunc)
    .entries(data)
    .map((g) => ({ name: g.key, entries: g.values as DataRow[] }))
    .filter((g) => g.name != null && g.name !== "??");
  return groups;
}

export function groupedByProduct(data: DataRow[]): GroupedDataRows {
  if (data.length < 1) return [{ name: "Chronological", entries: data }];
  const keyFunc = (d: DataRow) => {
    if (d["Release Name"] != null && d["Release Name"] != "")
      return d["Release Name"];
    if (d["Product"] == null || d["Product"] === "") return "??";
    return d["Product"];
  };
  // Group the data chronologically (by year, quarter)
  const groups = d3Collection
    .nest<DataRow, DataRow[]>()
    .key(keyFunc)
    .entries(data)
    .map((g) => ({ name: g.key, entries: g.values as DataRow[] }))
    .filter((g) => g.name != null && g.name !== "??");
  return groups;
}

export function sortedByCount(groups: GroupedDataRows): GroupedDataRows {
  return groups.sort((a, b) => b.entries.length - a.entries.length);
}


export function productNameFromUrlString(urlString: string) {
  return urlString.replace(/%2F/g, "/").replace(/\+/g, " ");
}

export function urlStringForProductName(name: string): string {
  return name.replace(/\//g, "%2F").replace(/ /g, "+");
}
