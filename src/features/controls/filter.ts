import { type DataRow } from "../archive";

import { type ArchiveControls } from "./controls.slice";

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
  const rowFabrics = row.Fabric?.split(",").map((f) => f.trim()) || [];
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
  filters: ArchiveControls["filters"]
): FilterArchiveResult {
  let filtered = full;
  const topLevelFiltered = full.filter((row) =>
    matchCategories(row, filters.category)
  );
  filtered = topLevelFiltered.filter((row) =>
    matchFabrics(row, filters.fabric)
  );
  filtered = filtered.filter((row) => matchColor(row, filters.color));
  filtered = filtered.filter((row) => matchText(row, filters.text));

  return { full, filtered, topLevelFiltered };
}

export function filterArchiveForStyle(
  full: DataRow[],
  inputStyleId: string
): FilterArchiveResult {
  const styleId = inputStyleId.trim().toUpperCase();
  const filtered = full.filter((row) => matchStyle(row, styleId));

  return { full: filtered, filtered, topLevelFiltered: filtered };
}
