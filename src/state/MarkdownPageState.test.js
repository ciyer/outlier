import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { beforeEach, describe, expect, it } from "vitest";

import MarkdownPageState from "./MarkdownPageState";
import { createGlobalStore } from "./";

const createMockStore = configureMockStore([thunk]);

const simplePageData = `#Intro
Hello World`;

describe("page retrieval", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("invokes expected actions", () => {
    fetch.mockResponseOnce(simplePageData);
    const store = createMockStore({ simplePageData: null });
    const expectedActions = [
      { source: "simplePageData", type: "MarkdownPageState.CONTENT_REQUEST" },
      {
        payload: { simplePageData: simplePageData },
        type: "MarkdownPageState.CONTENT_RETURN",
      },
    ];
    return store
      .dispatch(MarkdownPageState.retrieve("simplePageData"))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("updates store", () => {
    fetch.mockResponseOnce(simplePageData);
    const store = createGlobalStore();
    store.dispatch(MarkdownPageState.retrieve("simplePageData")).then(() => {
      // return of async actions
      expect(store.getState().pages).toEqual({
        simplePageData: simplePageData,
      });
    });
  });
});

export { simplePageData };
