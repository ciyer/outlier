import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux';

import MarkdownPageState from './MarkdownPageState';
import ArchiveState from './ArchiveState';
import FilterSummary from './FilterSummary'


let composeEnhancers;
if (process.env.NODE_ENV === "development")
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
else
  composeEnhancers = compose;

function createGlobalStore() {

  return createStore(
    combineReducers({archive: ArchiveState.reduce, pages: MarkdownPageState.reduce}),
    composeEnhancers(applyMiddleware(thunk)));
}

export { ArchiveState, FilterSummary, MarkdownPageState, createGlobalStore }
