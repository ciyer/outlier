import { Data, ReleaseBaselineStats } from '../data';
import * as d3Array from 'd3-array';
import _ from 'lodash/collection';

const ActionType = {
  CONTENT_REQUEST: 'ArchiveState.CONTENT_REQUEST',
  CONTENT_RETURN: 'ArchiveState.CONTENT_RETURN',
  DISPLAY_SETTING: 'ArchiveState.DISPLAY_SETTING',
  FILTER_TOGGLE: 'ArchiveState.FILTER_TOGGLE',
  FILTER_CLEAR: 'ArchiveState.FILTER_CLEAR'
};

function filterCategoryFilteredMap(filterMap, filterFunc) {
  // Return a map, keyed by category of filter, with a list of filters matching filterFunc
  const result = {}
  Object.keys(filterMap).forEach(k => {
    const catFilters = []
    filterMap[k].forEach((f) => {
      if (filterFunc(f)) catFilters.push(f);
    });
    if (catFilters.length > 0) result[k] = catFilters;
  });
  return result;
}

const ArchiveDisplay = {
  setImages: () => {
    return (dispatch) => {
      return ArchiveDisplay._set(dispatch, {showImages: true});
    }
  },
  setText: () => {
    return (dispatch) => {
      return ArchiveDisplay._set(dispatch, {showImages: false});
    }
  },
  setChronological: () => {
    return (dispatch) => {
      return ArchiveDisplay._set(dispatch, {listing: "chronological"});
    }
  },
  setGrouped: () => {
    return (dispatch) => {
      return ArchiveDisplay._set(dispatch, {listing: "grouped"});
    }
  },
  _set: (dispatch, value) => {
    return dispatch({type: ActionType.DISPLAY_SETTING, payload: value});
  },
};

const ArchiveData = {
  retrieve: () => {
    return (dispatch) => {
      dispatch({type: ActionType.CONTENT_REQUEST});
      return Data.read()
        .then(d => dispatch({type: ActionType.CONTENT_RETURN, payload: {archiveData: d}}))
    }
  }
}

class ArchiveFilter {
  constructor(category, type, isHit, isOn=false) {
    this.category = category;
    this.type = type;
    this.isHit = isHit;
    this.isOn = isOn;
  }

  inspect() {
    return JSON.stringify(this);
  }

  toggle() {
    return new ArchiveFilter(this.category, this.type, this.isHit, !this.isOn)
  }

  asOff() {
    if (!this.isOn) return this;
    return this.toggle();
  }
}

/**
 * Return false on words that should be included in the index.
 * @param {string} d
 */
function stopWords(d) {
  const w = d.toLowerCase();
  const hits = ["the", "a", "+", "-"].filter(s => s === w);
  return hits.length === 0;
}

const ArchiveFilters = {
  clearAll: () => {
    return (dispatch) => {
      return dispatch({type: ActionType.FILTER_CLEAR});
    }
  },
  toggleFilter: (filter) => {
    return (dispatch) => {
      return dispatch({type: ActionType.FILTER_TOGGLE, payload: filter});
    }
  },
  _asFilterCodes: (codesMap) => Object.keys(codesMap).sort(d3Array.ascending),
  _asTextFilterCodes: (codesMap) => {
    // Move numbers etc to the end of the list
    const numRe = /^\d+/;
    const wordRe = /^\w.+/;
    const [numbers, words] =
      _.partition(Object.keys(codesMap), (k) => k.match(numRe));
    const [wordWords, wordExtras] =
      _.partition(words, (k) => k.match(wordRe));
    return wordWords.sort(d3Array.ascending).concat(
      wordExtras.sort(d3Array.ascending),
      numbers.sort(d3Array.ascending)
    );
  },
  _filterCategoryMap: (filterMap, func) => {
    const result = {}
    Object.keys(filterMap).forEach((k) => {
      result[k] = filterMap[k].map(func)
    });
    return result;
  },
  _filterCategoryFilteredList: (filterMap, filterFunc) => {
    const result = []
    Object.keys(filterMap).forEach((k) => {
      filterMap[k].forEach((f) => {
        if (filterFunc(f)) result.push(f);
      });
    });
    return result;
  },
  _initializeFiltersAndData: (full) => {
    const filters = {};
    const fabricMap = {}, categoryMap = {}, mwuMap = {}, typeMap = {};
    const wordMap = {}, colorMap = {};
    // Compile the categories, fabrics, etc. from the data
    full.forEach(function(d) {
      categoryMap[d["subcategory"]] = true;
      fabricMap[d["Fabric"]] = true;
      mwuMap[d["MWU"]] = true;
      // only track garment types
      if (d["Category"] === "Clothes") typeMap[d["Type"]] = true;
      d["Product"].split(" ")
        .map(w => w.trim())
        .filter(stopWords)
        .forEach(w => wordMap[w] = true);
      d["Colors"].split(",")
      .map(w => w.trim()).filter(w => w.length > 0)
      .forEach(w => colorMap[w] = true);
    });

    const categories = ArchiveFilters._asFilterCodes(categoryMap);
    filters["Category"] = categories.map(f => new ArchiveFilter("Category", f, (d) => f === d["subcategory"]));

    const fabrics = ArchiveFilters._asFilterCodes(fabricMap);
    filters["Fabrics"] = fabrics.map(f => new ArchiveFilter("Fabric", f, (d) => f === d["Fabric"]));

    const mwu = ArchiveFilters._asFilterCodes(mwuMap);
    filters["Male/Female/Unisex"] = mwu.map(o => new ArchiveFilter("Male/Female/Unisex", o, (d) => o === d["MWU"]));

    const types = ArchiveFilters._asFilterCodes(typeMap);
    filters["GarmentTypes"] = types.map(f => new ArchiveFilter("Garment Type", f, (d) => f === d["Type"]));

    filters["Experiment"] = ["Experiment", "Public Prototype"]
      .map(o => new ArchiveFilter("Experiment", o, (d) => d["Product"].startsWith(o)));
    filters["Experiment"].push(
      new ArchiveFilter("Experiment", "Non-Exp",
        (d) => !(d["Product"].startsWith("Experiment") || d["Product"].startsWith("Public Prototype"))));
    filters["Season"] = ["Winter", "Spring", "Summer", "Fall"]
      .map(s => new ArchiveFilter("Season", s, (d) => d.season === s));

    const words = ArchiveFilters._asTextFilterCodes(wordMap);
    filters["Text"] = words.map(f => new ArchiveFilter("Text", f, (d) => d["Product"].match(f)));

    const colors = ArchiveFilters._asTextFilterCodes(colorMap);
    filters["Color"] = colors.map(f => new ArchiveFilter("Color", f, (d) => d["Colors"].match(f)));

    return {data: {full, filtered: full, preFabricFilter: full}, settings: {filters}};

  },
  _applyFilters: (full, filters) => {
    const onFilters = filterCategoryFilteredMap(filters, (f) => f.isOn);
    // We treat the fabric filters differently
    const filterCategories = Object.keys(onFilters);
    let filtered = full, preFabricFilter = full;
    if (filterCategories.length > 0) {
      const preFabricCategories = filterCategories.filter(c => c !== 'Fabrics');
      preFabricFilter = full.filter(row => {
        // For every category, check that at least one filter matches the row
        return preFabricCategories.map(cat =>
          onFilters[cat].map(f => f.isHit(row)).some(b=>b)).every(b=>b)
      });
      const fabricFilters = onFilters['Fabrics']
      if (fabricFilters != null) {
        filtered = preFabricFilter.filter(row => fabricFilters.map(f => f.isHit(row)).some(b=>b));
      } else {
        filtered = preFabricFilter;
      }
    }
    return {data: {full, filtered, preFabricFilter}, settings: {filters}};
  },
  _applyClear: (archiveData, filters) => {
    const toggledFilters = ArchiveFilters._filterCategoryMap(filters, (f) => f.asOff());
    return ArchiveFilters._applyFilters(archiveData, toggledFilters);
  },
  _applyToggle: (archiveData, filters, toToggle) => {
    const toggledFilters = ArchiveFilters._filterCategoryMap(filters, (f) => (f === toToggle) ? f.toggle() : f);
    return ArchiveFilters._applyFilters(archiveData, toggledFilters);
  },
}

const ArchiveState = {
  data: ArchiveData,
  display: ArchiveDisplay,
  filters: ArchiveFilters,
  reduce: (state, action) => {
    if (state == null) return {
      data: {full: [], filtered: [], preFabricFilter: []},
      settings: {
        display: {showImages: true, listing: "chronological"},
        filters: {}
      },
      summary: {baseline: {}}
    };
    // Take result and set it to the state
    if (action.type === ActionType.CONTENT_RETURN)
      return {...state, ...(ArchiveState._initializeState(state, action.payload.archiveData))};
    if (action.type ===  ActionType.DISPLAY_SETTING) {
      const display = {display: {...state.settings.display, ...action.payload}};
      const newSettings = {settings: {...state.settings, ...display}};
      return {...state, ...newSettings};
    } if (action.type ===  ActionType.FILTER_TOGGLE)
      return {...state, ...(ArchiveState._applyToggle(state, action.payload))};
    if (action.type ===  ActionType.FILTER_CLEAR)
      return {...state, ...(ArchiveState._applyClear(state))};
    return state
  },
  _initializeState: (oldState, archiveData) => {
    const state = ArchiveFilters._initializeFiltersAndData(archiveData);
    const baseline = (new ReleaseBaselineStats(state.data.full)).compute()
    state['summary'] = {baseline};
    state.settings.display = oldState.settings.display;
    return state;
  },
  _applyToggle: (oldState, toToggle) => {
    const {data, settings} = ArchiveFilters._applyToggle(oldState.data.full, oldState.settings.filters, toToggle);
    return {data, settings: {...oldState.settings, ...settings}, summary: oldState.summary};
  },
  _applyClear: (oldState) => {
    const {data, settings} = ArchiveFilters._applyClear(oldState.data.full, oldState.settings.filters);
    return {data, settings: {...oldState.settings, ...settings}, summary: oldState.summary};
  }
};

export default ArchiveState;
export { filterCategoryFilteredMap };
