import { Link, generatePath } from "react-router";
import { Col, Row } from "reactstrap";

import { PATHS } from "../../routes/route-paths";
import { urlStringForProductName } from "../utils";
import type {
  ArchiveGroupDisplayProps,
  ArchiveGroupRowsProps,
} from "./archive.types";
import { type DataRow } from "./Data";
import { releaseDetailsSummary } from "./Utils";

type ArchiveTextGroupRowProps = {
  entry: DataRow;
  showDetails: boolean;
};
function ReleaseImageTitled({ entry, showDetails }: ArchiveTextGroupRowProps) {
  const detailsSummary = releaseDetailsSummary([entry]);
  const details = showDetails ? (
    <div>{detailsSummary.numberOfColors} colors</div>
  ) : null;
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
      <div>{details}</div>
    </div>
  );
}

type ReleaseImagesTitledProps = {
  entries: DataRow[];
  showDetails: boolean;
};

function ReleaseImagesTitled({
  entries,
  showDetails,
}: ReleaseImagesTitledProps) {
  const images = entries.map((r, i) => (
    <ReleaseImageTitled key={i} entry={r} showDetails={showDetails} />
  ));
  return <div className="d-flex flex-wrap">{images}</div>;
}

function ArchiveImageGroup({
  group,
  showTitle,
  showDetails,
  groupLinkUrl,
}: ArchiveGroupRowsProps) {
  const groupNameDisplay = groupLinkUrl ? (
    <Link to={`${groupLinkUrl}/${urlStringForProductName(group.name)}`}>
      {group.name}
    </Link>
  ) : (
    <span>{group.name}</span>
  );
  const title = showTitle ? <h3>{groupNameDisplay}</h3> : <span></span>;
  return (
    <Row>
      <Col>
        {title}
        <ReleaseImagesTitled
          entries={group.entries}
          showDetails={showDetails}
        />
      </Col>
    </Row>
  );
}

export default function ArchiveWithImages({
  groups,
  groupLinkUrl,
  showDetails,
}: ArchiveGroupDisplayProps) {
  const children = groups.map((g) => (
    <ArchiveImageGroup
      key={g.name}
      group={g}
      groupLinkUrl={groupLinkUrl}
      showDetails={!!showDetails}
      showTitle={groups.length > 1}
    />
  ));
  return children;
}
