import React, { Component } from "react";
import { connect } from "react-redux";

import { ArchiveState } from "../../state";
import ArchivePresent from "./Archive";
import {
  ReleaseSummary,
  ReleaseColorSummary,
  ReleaseFabricSummary,
} from "../../data";

function mapStateToProps(state) {
  const archive = state.archive;
  const summary =
    archive.summary.baseline.priceBins == null
      ? null
      : new ReleaseSummary(
          archive.data.filtered,
          archive.summary.baseline
        ).compute();
  const fabricSummary =
    archive.summary.baseline.priceBins == null
      ? null
      : new ReleaseFabricSummary(archive.data.preFabricFilter).compute();
  const colorSummary =
    archive.summary.baseline.priceBins == null
      ? null
      : new ReleaseColorSummary(archive.data.filtered).compute();
  if (fabricSummary != null) {
    fabricSummary.colorUseCount = colorSummary.colorUseCount;
  }
  return { archive, summary, fabricSummary };
}

function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      displaySettingHandlers: {
        onArchiveDisplaySetImages: () =>
          dispatch(ArchiveState.display.setImages()),
        onArchiveDisplaySetText: () => dispatch(ArchiveState.display.setText()),
        onArchiveDisplaySetChronological: () =>
          dispatch(ArchiveState.display.setChronological()),
        onArchiveDisplaySetGrouped: () =>
          dispatch(ArchiveState.display.setGrouped()),
        onArchiveFilterToggle: (f) =>
          dispatch(ArchiveState.filters.toggleFilter(f)),
        onArchiveFilterClearAll: () =>
          dispatch(ArchiveState.filters.clearAll()),
      },
    },
  };
}

class ArchiveWrapper extends Component {
  render() {
    return (
      <ArchivePresent
        archive={this.props.archive}
        handlers={this.props.handlers}
        summary={this.props.summary}
        fabricSummary={this.props.fabricSummary}
        productUrl="/product"
      />
    );
  }
}

const Archive = connect(mapStateToProps, mapDispatchToProps)(ArchiveWrapper);

export default Archive;
