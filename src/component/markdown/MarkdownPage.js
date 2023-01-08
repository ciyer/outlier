import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

class MarkdownPage extends Component {
  render() {
    let content = this.props.content;
    if (null == content) return <h1>Loading...</h1>;
    return <ReactMarkdown children={content} />;
  }
}

export default MarkdownPage;
