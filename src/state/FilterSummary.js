import { filterCategoryFilteredMap } from './ArchiveState';

/**
 * Summarize the active filters
 */
class FilterSummary {
  constructor(filters) {
    this.filters = filters;
  }

  compute() {
    const onCategoryFilters = filterCategoryFilteredMap(this.filters, (d) => d.isOn);
    const summaries = Object.keys(onCategoryFilters).sort().map(k => {
      const onFilters = onCategoryFilters[k];
      if (onFilters.length < 2) return onFilters[0].type;
      return `(${onFilters.map(f => f.type).join(" or ")})`
    });
    return (summaries.length < 1) ?
      "(show all)" :
      summaries.join(" and ")
  }
}

export default FilterSummary;
