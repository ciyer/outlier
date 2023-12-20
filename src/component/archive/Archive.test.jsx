/**
 * @vitest-environment jsdom
 */

import React from "react";
import ReactDOM from "react-dom";
import Archive from "./Archive.container";

import { it } from "vitest";

import { BrowserRouter as Router } from "react-router-dom";

// Test data
import { ArchiveState, createGlobalStore } from "../../state";
import { Provider } from "react-redux";
const store = createGlobalStore();

import { simpleData } from "../../data/Data.test";

it.skip("renders without crashing", () => {
  const div = document.createElement("div");
  fetch.mockResponseOnce(simpleData);
  return store.dispatch(ArchiveState.data.retrieve("archiveData")).then(() => {
    // TODO -- check that there is actual data that is rendered
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Archive />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
