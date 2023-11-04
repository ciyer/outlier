import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, connect } from "react-redux";
// import App from './App.tsx'

import "./index.css";
// import "./styles/index.scss";
import "./styles/index.css";
import App from "./App";
import { ArchiveState, createGlobalStore } from "./state/index.js";

// State
const store = createGlobalStore();

function mapStateToProps(state) {
  return { archive: state.archive };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDispatchToProps(dispatch) {
  return { doRetrieve: () => dispatch(ArchiveState.data.retrieve()) };
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <VisibleApp />
    </Provider>
  </React.StrictMode>
);
