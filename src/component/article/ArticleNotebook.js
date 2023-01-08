import React, { Component } from "react";
import { LoadingSpinner } from "../../utils";
import { Col, Row } from "reactstrap";
import ReactMarkdown from "react-markdown";
import vegaEmbed from "vega-embed";
import "./Article.css";

class CodeOutputCell extends Component {
  render() {
    const output = this.props.output;
    if (output.data["application/vnd.vegalite.v3+json"] != null)
      return (
        <VegaOutputCell
          spec={output.data["application/vnd.vegalite.v3+json"]}
        />
      );
    if (output.data["application/vnd.vegalite.v4+json"] != null)
      return (
        <VegaOutputCell
          spec={output.data["application/vnd.vegalite.v4+json"]}
        />
      );
    if (output.data["text/html"] != null)
      return <HtmlOutputCell data={output.data["text/html"]} />;
    return null;
  }
}

class VegaOutputCell extends Component {
  constructor(props) {
    super(props);
    this._container = null;
    this.state = { rendered: null };
  }

  opts() {
    return {
      defaultStyle: false,
      actions: {
        export: false,
        source: false,
        compiled: false,
        editor: false,
      },
    };
  }

  componentDidMount() {
    const spec = this.props.spec;
    const rendered = vegaEmbed(this._container, spec, this.opts());
    this.setState({ rendered });
  }

  render() {
    return <div ref={(e) => (this._container = e)} />;
  }
}

function HtmlOutputCell(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.data.join("") }} />;
}

class MarkdownCell extends Component {
  render() {
    const cell = this.props.cell;
    return (
      <Row>
        <Col md={10} lg={8}>
          <ReactMarkdown children={cell.source.join("")} />
        </Col>
      </Row>
    );
  }
}

class NotebookCell extends Component {
  render() {
    const cell = this.props.cell;
    if (cell.cell_type === "markdown") return <MarkdownCell cell={cell} />;
    if (cell.cell_type === "code" && cell.outputs.length > 0)
      return cell.outputs.map((o, i) => <CodeOutputCell output={o} key={i} />);
    return null;
  }
}

class ArticleNotebook extends Component {
  render() {
    let notebook = this.props.notebook;
    if (null == notebook) return <LoadingSpinner />;
    return notebook.cells.map((c, i) => <NotebookCell cell={c} key={i} />);
  }
}

export default ArticleNotebook;
