import { type DataRow } from "../archive";

import { Period, type ArchiveControls } from "./controls.slice";

function matchCategories(row: DataRow, categories: string[]): boolean {
  return (
    categories.length === 0 || categories.some((cat) => row.subcategory == cat)
  );
}

function matchColor(row: DataRow, colors: string[]): boolean {
  const rowColors = row.Colors?.split(",").map((c) => c.trim()) || [];
  return colors.length === 0 || colors.some((col) => rowColors.includes(col));
}

function matchFabrics(row: DataRow, fabrics: string[]): boolean {
  const rowFabrics =
    row.Fabric?.split(",").map((f) => f.trim().toUpperCase()) || [];
  return (
    fabrics.length === 0 || fabrics.some((fab) => rowFabrics.includes(fab))
  );
}

function matchStyle(row: DataRow, styleId: string): boolean {
  const rowStyle = row["Web Style"].trim().toUpperCase();
  return styleId.length === 0 || rowStyle.startsWith(styleId);
}

function matchText(row: DataRow, text: string[]): boolean {
  const rowText = row.Product;
  return text.length === 0 || text.some((txt) => rowText.includes(txt));
}

export type FilterArchiveResult = {
  full: DataRow[];
  filtered: DataRow[];
  topLevelFiltered: DataRow[];
};

export function filterArchive(
  full: DataRow[],
  filters: ArchiveControls["filters"],
  period: ArchiveControls["period"],
  year: number | null = null
): FilterArchiveResult {
  let filtered = full;
  if (year != null) {
    filtered = filterArchiveForYear(full, year).filtered;
  } else if (period !== Period.ALL) {
    filtered = filterArchiveForPeriod(full, period).filtered;
  }
  const topLevelFiltered = filtered.filter((row) =>
    matchCategories(row, filters.category)
  );
  filtered = topLevelFiltered.filter((row) =>
    matchFabrics(
      row,
      filters.fabric.map((d) => d.trim().toUpperCase())
    )
  );
  filtered = filtered.filter((row) => matchColor(row, filters.color));
  filtered = filtered.filter((row) => matchText(row, filters.text));

  return { full, filtered, topLevelFiltered };
}

export function filterArchiveForFabric(
  full: DataRow[],
  inputFabricId: string,
  filters: ArchiveControls["filters"]
): FilterArchiveResult {
  const fabricId = inputFabricId.trim().toUpperCase();
  const topLevelFiltered = full.filter((row) => matchFabrics(row, [fabricId]));
  let filtered = topLevelFiltered.filter((row) =>
    matchFabrics(
      row,
      filters.fabric.map((d) => d.trim().toUpperCase())
    )
  );
  filtered = filtered.filter((row) => matchColor(row, filters.color));
  filtered = filtered.filter((row) => matchText(row, filters.text));

  return { full: topLevelFiltered, filtered, topLevelFiltered };
}

export function filterArchiveForStyle(
  full: DataRow[],
  inputStyleId: string,
  filters: ArchiveControls["filters"]
): FilterArchiveResult {
  const styleId = inputStyleId.trim().toUpperCase();
  const topLevelFiltered = full.filter((row) => matchStyle(row, styleId));
  let filtered = topLevelFiltered.filter((row) =>
    matchFabrics(
      row,
      filters.fabric.map((d) => d.trim().toUpperCase())
    )
  );
  filtered = filtered.filter((row) => matchColor(row, filters.color));
  filtered = filtered.filter((row) => matchText(row, filters.text));

  return { full: topLevelFiltered, filtered, topLevelFiltered };
}

export function filterArchiveForPeriod(
  full: DataRow[],
  period: Period
): FilterArchiveResult {
  const now = new Date();
  let filtered = full;
  const start =
    period == Period.ALL
      ? null
      : period == Period.LAST_5_YEARS
      ? // Start of the year 5 years ago
        new Date(now.getFullYear() - 5, 0, 1)
      : period == Period.CURRENT
      ? // Start of last year
        new Date(now.getFullYear() - 1, 0, 1)
      : // Start of this year
        new Date(now.getFullYear(), 0, 1);

  filtered =
    start == null
      ? filtered
      : filtered.filter(
          (row) => row.releaseDate != null && row.releaseDate >= start
        );
  return { full, filtered, topLevelFiltered: filtered };
}

export function filterArchiveForYear(
  full: DataRow[],
  year: number
): FilterArchiveResult {
  const filtered = full.filter(
    (row) => row.releaseDate != null && row.releaseDate.getFullYear() == year
  );
  return { full, filtered, topLevelFiltered: filtered };
}


export function periodFilterDescription(period: Period): string | null {
  if (period === Period.ALL) return null;
  const now = new Date();
  const start =
    period == Period.LAST_5_YEARS
      ? // Start of the year 5 years ago
        new Date(now.getFullYear() - 5, 0, 1)
      : period == Period.CURRENT
      ? // Start of last year
        new Date(now.getFullYear() - 1, 0, 1)
      : // Start of this year
        new Date(now.getFullYear(), 0, 1);

  return `Jan ${start.getFullYear()} — today`;
}
