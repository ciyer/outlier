import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MarkdownPageState } from '../../state';
import MarkdownPagePresent from './MarkdownPage';

function mapStateToProps(state, ownProps) {
  return {content: state.pages[ownProps.source]}
}

function mapDispatchToProps(dispatch) {
  return {doRetrieve: (source) => dispatch(MarkdownPageState.retrieve(source)) }
}

class MarkdownPageWrapper extends Component {

  componentDidMount() { this.props.doRetrieve(this.props.source) }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source === this.props.source) return;
    nextProps.doRetrieve(this.props.source);
  }

  render() {
    return <MarkdownPagePresent content={this.props.content} />
  }
}

const MarkdownPage = connect(mapStateToProps, mapDispatchToProps)(MarkdownPageWrapper)

export default MarkdownPage;
export { MarkdownPageWrapper, mapStateToProps, mapDispatchToProps };
