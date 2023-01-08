import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";

import ArchiveState from "./ArchiveState";
import FilterSummary from "./FilterSummary";
import MarkdownPageState from "./MarkdownPageState";
import NotebookState from "./NotebookState";

let composeEnhancers;
if (process.env.NODE_ENV === "development")
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
else composeEnhancers = compose;

function createGlobalStore() {
  return legacy_createStore(
    combineReducers({
      archive: ArchiveState.reduce,
      pages: MarkdownPageState.reduce,
      notebooks: NotebookState.reduce,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
}

export {
  ArchiveState,
  FilterSummary,
  NotebookState,
  MarkdownPageState,
  createGlobalStore,
};
