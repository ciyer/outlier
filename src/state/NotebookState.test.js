import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { beforeEach, describe, expect, it } from "vitest";

import NotebookState from "./NotebookState";
import { createGlobalStore } from "./";

const createMockStore = configureMockStore([thunk]);

const simpleNotebookData = `{
  "cells": [
   {
    "cell_type": "markdown",
    "metadata": {},
    "source": [
     "A dummy notebook."
    ]
   }
  ],
  "metadata": {
   "kernelspec": {
    "display_name": "Python 3",
    "language": "python",
    "name": "python3"
   },
   "language_info": {
    "codemirror_mode": {
     "name": "ipython",
     "version": 3
    },
    "file_extension": ".py",
    "mimetype": "text/x-python",
    "name": "python",
    "nbconvert_exporter": "python",
    "pygments_lexer": "ipython3",
    "version": "3.7.4"
   }
  },
  "nbformat": 4,
  "nbformat_minor": 4
 }`;

const simpleNotebook = JSON.parse(simpleNotebookData);

describe("page retrieval", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("invokes expected actions", () => {
    fetch.mockResponseOnce(simpleNotebookData);
    const store = createMockStore({ simpleNotebook: null });
    const expectedActions = [
      { source: "simpleNotebook", type: "NotebookState.CONTENT_REQUEST" },
      {
        payload: { simpleNotebook: simpleNotebook },
        type: "NotebookState.CONTENT_RETURN",
      },
    ];
    return store.dispatch(NotebookState.retrieve("simpleNotebook")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("updates store", () => {
    fetch.mockResponseOnce(simpleNotebookData);
    const store = createGlobalStore();
    store.dispatch(NotebookState.retrieve("simpleNotebook")).then(() => {
      // return of async actions
      expect(store.getState().notebooks).toEqual({
        simpleNotebook: simpleNotebook,
      });
    });
  });
});

export { simpleNotebookData };
