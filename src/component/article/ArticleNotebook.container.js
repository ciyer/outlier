import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NotebookState } from '../../state';
import ArticleNotebookPresent from './ArticleNotebook';

function mapStateToProps(state, ownProps) {
  return {notebook: state.notebooks[ownProps.source]}
}

function mapDispatchToProps(dispatch) {
  return {doRetrieve: (source) => dispatch(NotebookState.retrieve(source)) }
}

class ArticleNotebookWrapper extends Component {

  componentDidMount() { this.props.doRetrieve(this.props.source) }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source === this.props.source) return;
    nextProps.doRetrieve(this.props.source);
  }

  render() {
    return <ArticleNotebookPresent notebook={this.props.notebook} />
  }
}

const ArticleNotebook = connect(mapStateToProps, mapDispatchToProps)(ArticleNotebookWrapper)

export default ArticleNotebook;
export { ArticleNotebookWrapper, mapStateToProps, mapDispatchToProps };
