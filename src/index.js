import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// State
import { Provider, connect } from 'react-redux';
import { ArchiveState, createGlobalStore } from './state'

const store = createGlobalStore();


function mapStateToProps(state, ownProps) {
  return {archive: state.archive}
}

function mapDispatchToProps(dispatch) {
  return {doRetrieve: () => dispatch(ArchiveState.data.retrieve()) }
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(<Provider store={store}><VisibleApp /></Provider>, document.getElementById('root'));
registerServiceWorker();
