import { useEffect, useRef } from "react";
import { Col, Row } from "reactstrap";
import ReactMarkdown from "react-markdown";
import vegaEmbed from "vega-embed";

import LoadingSpinner from "../LoadingSpinner";

import { useGetArticleNotebookQuery } from "./article.api";
import type { NotebookCell } from "./article.types";

import "./Article.css";

type ArticleNotebookCellProps = {
  cell: NotebookCell;
};
function ArticleNotebookCell({ cell }: ArticleNotebookCellProps) {
  if (cell.cell_type === "markdown") return <MarkdownCell cell={cell} />;
  if (cell.cell_type === "code" && cell.outputs.length > 0)
    return cell.outputs.map((o, i) => <CodeOutputCell output={o} key={i} />);
  return null;
}

type CodeOutputCellProps = {
  output: NotebookCell["outputs"][number];
};
function CodeOutputCell({ output }: CodeOutputCellProps) {
  if (output?.data == null) return null;
  if (output.data["application/vnd.vegalite.v3+json"] != null)
    return (
      <VegaOutputCell spec={output.data["application/vnd.vegalite.v3+json"]} />
    );
  if (output.data["application/vnd.vegalite.v4+json"] != null)
    return (
      <VegaOutputCell spec={output.data["application/vnd.vegalite.v4+json"]} />
    );
  if (output.data["text/html"] != null)
    return <HtmlOutputCell data={output.data["text/html"] as string[]} />;
  if (output.data["text/markdown"] != null)
    return <HtmlOutputCell data={output.data["text/markdown"] as string[]} />;
  return null;
}

function VegaOutputCell({ spec }: { spec: object }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current == null) return;
    // Ensure spec is extensible
    const mutableSpec = structuredClone(spec);
    const opts = {
      defaultStyle: false,
      actions: {
        export: false,
        source: false,
        compiled: false,
        editor: false,
      },
    };
    // Should be more careful about the async code in an effect, but for now...
    vegaEmbed(ref.current, mutableSpec, opts).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Error rendering Vega spec:", err);
    });
  }, [spec]);

  return <div ref={ref} />;
}

function HtmlOutputCell({ data }: { data: string[] }) {
  // Join the HTML strings into a single string
  const htmlContent = Array.isArray(data) ? data.join("") : data;
  // Use dangerouslySetInnerHTML to render the HTML content
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

type MarkdownCellProps = {
  cell: NotebookCell;
};
function MarkdownCell({ cell }: MarkdownCellProps) {
  return (
    <Row>
      <Col md={10} lg={8}>
        <ReactMarkdown children={cell.source.join("")} />
      </Col>
    </Row>
  );
}

type ArticleNotebookProps = {
  path: string;
};

export default function ArticleNotebook({ path }: ArticleNotebookProps) {
  const { data: notebook, isLoading } = useGetArticleNotebookQuery({ path });
  if (isLoading) return <LoadingSpinner />;
  if (notebook == null)
    return (
      <Row>
        <Col>Notebook not found</Col>
      </Row>
    );
  return notebook.cells.map((c, i) => <ArticleNotebookCell cell={c} key={i} />);
}
