import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownPage from './MarkdownPage.container';

// Test data
import { createGlobalStore } from '../../state'
import { Provider, connect } from 'react-redux';
const store = createGlobalStore();
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { simplePageData } from '../../state/MarkdownPageState.test';

describe('MarkdownPage', () => {
  beforeEach(() => {
      fetch.resetMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    fetch.mockResponseOnce(simplePageData);
    ReactDOM.render(<Provider store={store}><MarkdownPage /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
