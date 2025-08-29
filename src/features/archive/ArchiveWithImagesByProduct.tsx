import { Link, generatePath } from "react-router";
import { Col, Row } from "reactstrap";

import { PATHS } from "../../routes/route-paths";
import { SortKind, useControlsStateSelector } from "../controls/controls.slice";
import {
  groupedByProduct,
  sortedByCount,
  urlStringForProductName,
} from "../utils";
import type {
  ArchiveGroupDisplayProps,
  ArchiveGroupRowsProps,
} from "./archive.types";
import { type DataRow } from "./Data";
import { releaseDetailsSummary } from "./Utils";

type ArchiveTextGroupRowProps = {
  entries: DataRow[];
};
function ReleaseImageTitled({ entries }: ArchiveTextGroupRowProps) {
  const detailsSummary = releaseDetailsSummary(entries);
  const entry = entries[0]; // Assuming all entries in the group have the same product name
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
        <p className="mb-0">{entry.Product}</p>
        <div className="my-0 text-secondary">
          <span>
            {detailsSummary.numberOfDrops}{" "}
            {detailsSummary.numberOfDrops > 1 ? "drops" : "drop"}
          </span>{" "}
          |{" "}
          <span>
            {detailsSummary.numberOfColors}{" "}
            {detailsSummary.numberOfColors > 1 ? "colors" : "color"}
          </span>{" "}
          | <span>{detailsSummary.priceString}</span>
        </div>
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

type ReleaseImagesByProductTitledProps = {
  entries: DataRow[];
};

function ReleaseImagesByProductTitled({
  entries,
}: ReleaseImagesByProductTitledProps) {
  const { sorting } = useControlsStateSelector((state) => state.controls);
  let productEntries = groupedByProduct(entries);
  if (sorting === SortKind.COUNT) {
    productEntries = sortedByCount(productEntries);
  }
  const images = Object.values(productEntries).map((group, i) => (
    <ReleaseImageTitled key={i} entries={group.entries} />
  ));
  return <div className="d-flex flex-wrap">{images}</div>;
}

function ArchiveImageGroupByProduct({
  group,
  groupLinkUrl,
}: Omit<ArchiveGroupRowsProps, "showDetails" | "showTitle">) {
  const groupNumberOfDropsDisplay = (
    <span className="text-secondary fs-5">
      | {group.entries.length} {group.entries.length > 1 ? "drops" : "drop"}
    </span>
  );
  const groupNameDisplay = groupLinkUrl ? (
    <Link to={`${groupLinkUrl}/${urlStringForProductName(group.name)}`}>
      {group.name}
    </Link>
  ) : (
    <span>{group.name}</span>
  );
  const title = (
    <h3>
      {groupNameDisplay} {groupNumberOfDropsDisplay}
    </h3>
  );
  return (
    <Row className="mb-5">
      <Col>
        {title}
        <ReleaseImagesByProductTitled entries={group.entries} />
      </Col>
    </Row>
  );
}

export default function ArchiveWithImagesByProduct({
  groups,
  groupLinkUrl,
}: Omit<ArchiveGroupDisplayProps, "showDetails">) {
  const children = groups.map((g) => (
    <ArchiveImageGroupByProduct
      key={g.name}
      group={g}
      groupLinkUrl={groupLinkUrl}
    />
  ));
  return children;
}
