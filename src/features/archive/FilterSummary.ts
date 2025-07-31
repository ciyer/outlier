/**
 * Summarize the active filters
 */

type ArchiveFilter = {
  isOn: boolean;
  type: string;
};

function filterCategoryFilteredMap(
  filterMap: Record<string, ArchiveFilter[]>,
  filterFunc: (f: ArchiveFilter) => boolean
) {
  // Return a map, keyed by category of filter, with a list of filters matching filterFunc
  const result: Record<string, ArchiveFilter[]> = {};
  Object.keys(filterMap).forEach((k) => {
    const catFilters: ArchiveFilter[] = [];
    filterMap[k].forEach((f) => {
      if (filterFunc(f)) catFilters.push(f);
    });
    if (catFilters.length > 0) result[k] = catFilters;
  });
  return result;
}

export default class FilterSummary {
  private filters: Record<string, ArchiveFilter[]>;
  constructor(filters: Record<string, ArchiveFilter[]>) {
    this.filters = filters;
  }

  compute() {
    const onCategoryFilters = filterCategoryFilteredMap(
      this.filters,
      (d) => d.isOn
    );
    const summaries = Object.keys(onCategoryFilters)
      .sort()
      .map((k) => {
        const onFilters = onCategoryFilters[k];
        if (onFilters.length < 2) return onFilters[0].type;
        return `(${onFilters.map((f) => f.type).join(" or ")})`;
      });
    return summaries.length < 1 ? "(show all)" : summaries.join(" and ");
  }
}
