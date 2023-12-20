import { groupedData } from './';

import { beforeEach, describe, expect, it } from "vitest";

import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { simpleData } from '../data/Data.test';
import { createGlobalStore, ArchiveState } from '../state'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createMockStore = configureMockStore([thunk]);

describe('chronological grouping', () => {
  beforeEach(() => { fetch.resetMocks() });

  it('groups data chronologically', () => {
    fetch.mockResponseOnce(simpleData);
    const store = createGlobalStore();
    return store.dispatch(ArchiveState.data.retrieve('archiveData')).then(() => {
        const state = store.getState();
        const groups = groupedData(state.archive.data, state.archive.settings)
        expect(groups.length).toEqual(1);
        const group = groups[0];
        expect(group.name).toEqual("'18 Spring");
        expect(group.entries.length).toEqual(12);
    });
  });
});
