import * as d3fetch from "d3-fetch";
import * as d3time from "d3-time-format";
import { csvParse } from "d3-dsv";

const dateParser = d3time.timeParse("%Y-%m-%d");
const releaseDateFormatter = d3time.timeFormat("%Y-%m-%d");
const dateFormatter = d3time.timeFormat("%b %d %Y");

interface FileDataRow {
  Product: string;
  Type: string;
  Category: string;
  Fabric: string;
  Release: string;
  Colors: string;
  Price: string;
  "Re-up": string;
  Historic: string;
  MWU: string;
  InSitu: string;
  Image: string;
  "Release Name": string;
  "Previous Iteration": string;
  Family: string;
  Notes: string;
  "Web Style": string;
  Style: string;
  Archive: string;
}

interface ReduxDataRow extends Omit<FileDataRow, "Price"> {
  Price: number | undefined;
  category: string;
  releaseDateString: string | null;
  season: string;
  subcategory: string;
}

interface DataRow extends ReduxDataRow {
  releaseDate: Date | null;
}

function augmentWithReleaseDate(row: ReduxDataRow): DataRow {
  const result: DataRow = { ...row, releaseDate: null };
  if (row.releaseDateString != null) {
    const releaseDate = dateParser(row.releaseDateString);
    result.releaseDate = releaseDate;
  }

  return result;
}

function dateToSeason(date: Date) {
  const month = date.getMonth();
  if (month < 2) return "Winter";
  else if (month < 5) return "Spring";
  else if (month < 8) return "Summer";
  else if (month < 11) return "Fall";
  return "Winter";
}

function dataToSubcategory(category: string, dropType: string) {
  if (category !== "Clothes") return "Object";
  const dtype = dropType;
  if (dtype === "Pants" || dtype === "Shorts" || dtype === "Sweatpants")
    return "Pants";
  if (dtype === "Shirt" || dtype === "T-Shirt" || dtype === "Tank Top")
    return "Shirts";
  return "Outerwear";
}

function cleanCsvRow(row: FileDataRow): ReduxDataRow {
  const {
    Category: category,
    Colors: colors,
    Price: price,
    Release: release,
    Type: dropType,
    ...rest
  } = row;
  const d = { category, Type: dropType, ...rest } as Partial<ReduxDataRow>;
  d["Price"] = price.length > 0 ? +price : undefined;
  if (d["Web Style"] == null || d["Style"] != null) {
    d["Web Style"] = d["Style"];
  }

  d.subcategory = dataToSubcategory(category, dropType);
  if (release.length > 0) {
    const releaseDate = dateParser(release);
    if (releaseDate != null) {
      d.releaseDateString = releaseDateFormatter(releaseDate);
      d["Release"] = dateFormatter(releaseDate);
      d.season = dateToSeason(releaseDate);
    } else {
      d.releaseDateString = null;
      d.season = "Unknown";
    }
    d["Colors"] = colors
      .split(",")
      .map((c) => c.trim())
      .sort()
      .join(", ");
  } else {
    d.releaseDateString = null;
  }

  return d as ReduxDataRow;
}

async function read() {
  const rawRows = await d3fetch.csv("/outlier-data.csv", cleanCsvRow);
  const rows = rawRows.map(augmentWithReleaseDate);
  return rows;
}

function parseArchiveCsv(csv: string): ReduxDataRow[] {
  const parsed = csvParse(csv, cleanCsvRow);
  return parsed;
}

const Data = { read };
export default Data;
export { augmentWithReleaseDate, parseArchiveCsv };
export type { DataRow, ReduxDataRow };
