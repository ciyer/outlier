import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ArchiveState } from '../../state';
import ArchivePresent from './Archive';
import { ReleaseSummary } from '../../data';

function mapStateToProps(state, ownProps) {
  const archive = state.archive;
  const summary = (archive.summary.baseline.priceBins == null) ?
    null :
    (new ReleaseSummary(archive.data.filtered, archive.summary.baseline)).compute();
  return {archive, summary}
}

function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      displaySettingHandlers: {
        onArchiveDisplaySetImages: () => dispatch(ArchiveState.display.setImages()),
        onArchiveDisplaySetText: () => dispatch(ArchiveState.display.setText()),
        onArchiveDisplaySetChronological: () => dispatch(ArchiveState.display.setChronological()),
        onArchiveDisplaySetGrouped: () => dispatch(ArchiveState.display.setGrouped()),
        onArchiveFilterToggle: (f) => dispatch(ArchiveState.filters.toggleFilter(f)),
        onArchiveFilterClearAll: (f) => dispatch(ArchiveState.filters.clearAll())
      }
    }
  }
}

class ArchiveWrapper extends Component {
  render() {
    return <ArchivePresent
      archive={this.props.archive} handlers={this.props.handlers}
      summary={this.props.summary} productUrl="/product" />
  }
}

const Archive = connect(mapStateToProps, mapDispatchToProps)(ArchiveWrapper)

export default Archive;
