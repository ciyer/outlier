import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as d3dsv from 'd3-dsv';

import ArchiveState from './ArchiveState';
import FilterSummary from './FilterSummary';
import Data from '../data/Data';
import { simpleData } from '../data/Data.test';
import { createGlobalStore } from './'

const createMockStore = configureMockStore([thunk]);

describe('state manipulation', () => {
  const store = createGlobalStore();
  it('initializes as expected', () => {
    let state = store.getState();
    expect(state.archive.data.full).toEqual([]);
    expect(state.archive.data.filtered).toEqual([]);
    expect(state.archive.settings.display).toEqual({showImages: true, listing: "chronological"});
    expect(state.archive.settings.filters).toEqual({});
    expect(new FilterSummary(state.archive.settings.filters).compute()).toEqual("(show all)");
    expect(state.archive.summary).toEqual({baseline: {}});
  });

  it('updates display as expected', () => {
    store.dispatch(ArchiveState.display.setText());
    let state = store.getState();
    expect(state.archive.settings.display).toEqual({showImages: false, listing: "chronological"});

    store.dispatch(ArchiveState.display.setGrouped());
    state = store.getState();
    expect(state.archive.settings.display).toEqual({showImages: false, listing: "grouped"});

    store.dispatch(ArchiveState.display.setImages());
    store.dispatch(ArchiveState.display.setChronological());
    state = store.getState();
    expect(state.archive.settings.display).toEqual({showImages: true, listing: "chronological"});
  });
});

describe('data retrieval', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('invokes expected actions', () => {
    fetch.mockResponseOnce(simpleData);
    const store = createMockStore({data: null});
    const simpleResponse = d3dsv.csvParse(simpleData).map(Data.cleanCsvRow);
    const expectedActions = [
      {"type": "ArchiveState.CONTENT_REQUEST"},
      {"payload": {"archiveData": simpleResponse}, "type": "ArchiveState.CONTENT_RETURN"}];
    return store.dispatch(ArchiveState.data.retrieve('archiveData')).then(() => {
        // return of async actions
        const actions = store.getActions()
        expect(actions[0]).toEqual(expectedActions[0]);
        expect(actions[1].type).toEqual(expectedActions[1].type);

        const archiveData = actions[1].payload.archiveData;
        const expectedArchiveData = expectedActions[1].payload.archiveData;
        expect(archiveData.length).toEqual(expectedArchiveData.length);
        expect(archiveData[0]).toEqual(expectedArchiveData[0]);
        expect(archiveData[1]).toEqual(expectedArchiveData[1]);
      })
  });
});


describe('store update', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('retrieves and filters data', () => {
    fetch.mockResponseOnce(simpleData);
    const store = createGlobalStore();
    const fullDataLength = 6;
    const baselinePriceBins = [59, 120, 125, 130, 188, 495];
    return store.dispatch(ArchiveState.data.retrieve('archiveData')).then(() => {
        // Check that initial data is correct
        expect(store.getState().archive.data.full.length).toEqual(fullDataLength);
        expect(store.getState().archive.data.filtered.length).toEqual(fullDataLength);
        let filters = store.getState().archive.settings.filters;
        expect(Object.keys(filters).length).toEqual(6);
        expect(store.getState().archive.summary.baseline.priceBins).toEqual(baselinePriceBins);
        expect(store.getState().archive.settings.display).toEqual({showImages: true, listing: "chronological"});

        // Check that the test filter is off
        const pantsFilter = store.getState().archive.settings.filters.Category[2];
        expect(pantsFilter.category).toEqual("Category");
        expect(pantsFilter.type).toEqual("Pants");
        expect(pantsFilter.isOn).toEqual(false);
        // Turn on the test filter
        store.dispatch(ArchiveState.filters.toggleFilter(pantsFilter));
        expect(store.getState().archive.settings.filters.Category[2].isOn).toEqual(true);
        expect(store.getState().archive.data.full.length).toEqual(fullDataLength);
        expect(store.getState().archive.data.filtered.length).toEqual(3);
        expect(store.getState().archive.summary.baseline.priceBins).toEqual(baselinePriceBins);
        expect(store.getState().archive.settings.display).toEqual({showImages: true, listing: "chronological"});
        expect(new FilterSummary(store.getState().archive.settings.filters).compute()).toEqual("Pants");

        // Add another filter
        const springFilter = store.getState().archive.settings.filters.Season[1];
        expect(springFilter.category).toEqual("Season");
        expect(springFilter.type).toEqual("Spring");
        expect(springFilter.isOn).toEqual(false);
        store.dispatch(ArchiveState.filters.toggleFilter(springFilter));
        expect(store.getState().archive.settings.filters.Season[1].isOn).toEqual(true);
        expect(store.getState().archive.data.filtered.length).toEqual(3);
        expect(new FilterSummary(store.getState().archive.settings.filters).compute()).toEqual("Pants and Spring");

        // Add another filter
        const outerwearFilter = store.getState().archive.settings.filters.Category[1];
        expect(outerwearFilter.category).toEqual("Category");
        expect(outerwearFilter.type).toEqual("Outerwear");
        expect(outerwearFilter.isOn).toEqual(false);
        store.dispatch(ArchiveState.filters.toggleFilter(outerwearFilter));
        expect(store.getState().archive.settings.filters.Category[1].isOn).toEqual(true);
        expect(store.getState().archive.data.filtered.length).toEqual(4);
        expect(new FilterSummary(store.getState().archive.settings.filters).compute()).toEqual("(Outerwear or Pants) and Spring");

        // Add yet another filter
        const shortsFilter = store.getState().archive.settings.filters.GarmentTypes[2];
        expect(shortsFilter.category).toEqual("Garment Type");
        expect(shortsFilter.type).toEqual("Shorts");
        expect(shortsFilter.isOn).toEqual(false);
        store.dispatch(ArchiveState.filters.toggleFilter(shortsFilter));
        expect(store.getState().archive.settings.filters.GarmentTypes[2].isOn).toEqual(true);
        expect(store.getState().archive.data.filtered.length).toEqual(2);
        expect(new FilterSummary(store.getState().archive.settings.filters).compute()).toEqual("(Outerwear or Pants) and Shorts and Spring");

        // Clear all filters
        store.dispatch(ArchiveState.filters.clearAll());
        expect(store.getState().archive.settings.filters.Category[1].isOn).toEqual(false);
        expect(store.getState().archive.settings.filters.Category[2].isOn).toEqual(false);
        expect(store.getState().archive.settings.filters.Season[1].isOn).toEqual(false);
        expect(store.getState().archive.data.full.length).toEqual(fullDataLength);
        expect(store.getState().archive.data.filtered.length).toEqual(fullDataLength);
        expect(store.getState().archive.summary.baseline.priceBins).toEqual(baselinePriceBins);
        expect(new FilterSummary(store.getState().archive.settings.filters).compute()).toEqual("(show all)");
    });
  });
});
