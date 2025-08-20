import { type ArchiveControls } from "./controls.slice";

export function computeFilterSummary(filters: ArchiveControls["filters"]) {
  const groups: (keyof typeof filters)[] = [
    "category",
    "experiment",
    "fabric",
    "text",
    "color",
  ];
  const summaries = groups
    .map((g) => {
      const activeFilters = filters[g];
      if (activeFilters == null || activeFilters.length < 1) return null;
      if (activeFilters.length < 2) return activeFilters[0];
      return `(${activeFilters.map((f) => f).join(" or ")})`;
    })
    .filter((s) => s != null);
  return summaries.length < 1 ? "(show all)" : summaries.join(" and ");
}
