import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// State
import { Provider, connect } from "react-redux";
import { ArchiveState, createGlobalStore } from "./state";

const store = createGlobalStore();

function mapStateToProps(state, ownProps) {
  return { archiveData: state.archive.archiveData };
}

function mapDispatchToProps(dispatch) {
  return { doRetrieve: () => dispatch(ArchiveState.data.retrieve()) };
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <VisibleApp />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
