import * as d3fetch from "d3-fetch";
import * as d3time from "d3-time-format";
import { csvParse } from "d3-dsv";

const dateParser = d3time.timeParse("%Y-%m-%d");
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
  Archive: string;
}

interface DataRow extends Omit<FileDataRow, "Price"> {
  Price: number | undefined;
  releaseDate: Date | null;
  season: string;
  subcategory: string;
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

function cleanCsvRow(row: FileDataRow): DataRow {
  const {
    Category: category,
    Colors: colors,
    Price: price,
    Release: release,
    Type: dropType,
    ...rest
  } = row;
  const d = { category, Type: dropType, ...rest } as Partial<DataRow>;
  d["Price"] = price.length > 0 ? +price : undefined;

  d.subcategory = dataToSubcategory(category, dropType);
  if (release.length > 0) {
    const releaseDate = dateParser(release);
    if (releaseDate != null) {
      d.releaseDate = releaseDate;
      d["Release"] = dateFormatter(releaseDate);
      d.season = dateToSeason(releaseDate);
    } else {
      d.releaseDate = null;
      d.season = "Unknown";
    }
    d["Colors"] = colors
      .split(",")
      .map((c) => c.trim())
      .sort()
      .join(", ");
  } else {
    d.releaseDate = null;
  }

  return d as DataRow;
}

async function read() {
  const rows = await d3fetch.csv("/outlier-data.csv", cleanCsvRow);
  return rows;
}

function parseArchiveCsv(csv: string): DataRow[] {
  const parsed = csvParse(csv, cleanCsvRow);
  return parsed;
}

const Data = { read };
export default Data;
export { parseArchiveCsv };
export type { DataRow };
