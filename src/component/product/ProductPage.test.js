import React from 'react';
import ReactDOM from 'react-dom';
import ProductPage from './ProductPage.container';

// Test data
import { ArchiveState, createGlobalStore } from '../../state'
import { Provider, connect } from 'react-redux';
const store = createGlobalStore();
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as d3dsv from 'd3-dsv';

import Data from '../../data/Data';
import { simpleData } from '../../data/Data.test';

// State

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.mockResponseOnce(simpleData);
  return store.dispatch(ArchiveState.data.retrieve('archiveData')).then(() => {
    // TODO -- check that there is actual data that is rendered
    ReactDOM.render(<Provider store={store}><ProductPage product="Strong+Dungarees" /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
