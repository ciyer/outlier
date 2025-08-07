import { Link, generatePath } from "react-router";
import { Col, Row } from "reactstrap";

import { type DataRow } from "./Data";
import { PATHS } from "../../routes/route-paths";
import { urlStringForProductName } from "../utils";

type ArchiveTextGroupRowProps = {
  entry: DataRow;
};
function ReleaseImageTitled({ entry }: ArchiveTextGroupRowProps) {
  const src = entry["Image"];
  return (
    <div
      className="p-2"
      style={{
        width: "calc(15%)",
        height: "calc(15%)",
        minWidth: "100px",
        minHeight: "100px",
      }}
    >
      <Link
        to={`${generatePath(PATHS.product, {
          productId: urlStringForProductName(entry.Product),
        })}`}
      >
        <p key={`${entry.Product}-${entry.Release}-title`}>{entry.Product}</p>
        <img
          key={`${entry.Product}-${entry.Release}-image`}
          src={src}
          alt={entry.Product}
          style={{ width: "100%", height: "100%" }}
        />
      </Link>
    </div>
  );
}

type ReleaseImagesTitledProps = {
  entries: DataRow[];
};

function ReleaseImagesTitled({ entries }: ReleaseImagesTitledProps) {
  const images = entries.map((r, i) => (
    <ReleaseImageTitled key={i} entry={r} />
  ));
  return <div className="d-flex flex-wrap">{images}</div>;
}

type ArchiveTextGroupRowsProps = {
  group: { name: string; entries: DataRow[] };
  showTitle: boolean;
};

function ArchiveImageGroup({ group, showTitle }: ArchiveTextGroupRowsProps) {
  const title = showTitle ? <h3>{group.name}</h3> : <span></span>;
  return (
    <Row>
      <Col>
        {title}
        <ReleaseImagesTitled entries={group.entries} />
      </Col>
    </Row>
  );
}

interface ArchiveWithTextProps {
  groups: {
    name: string;
    entries: DataRow[];
  }[];
}

export default function ArchiveWithImages({ groups }: ArchiveWithTextProps) {
  const children = groups.map((g) => (
    <ArchiveImageGroup key={g.name} group={g} showTitle={groups.length > 1} />
  ));
  return children;
}
