import { Link, generatePath } from "react-router";
import { Col, Row, Table } from "reactstrap";

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

type ArchiveTextGroupByProductRowProps = {
  entries: DataRow[];
  groupLinkUrl: string | undefined;
  groupNumberOfDrops: number;
  index: number;
  name: string;
};
function ArchiveTextGroupByProductRow({
  entries,
  groupLinkUrl,
  groupNumberOfDrops,
  index,
  name,
}: ArchiveTextGroupByProductRowProps) {
  let groupTitle = null;
  const detailsSummary = releaseDetailsSummary(entries);
  const entry = entries[0]; // Assuming all entries in the group have the same product name
  const groupNameDisplay = groupLinkUrl ? (
    <th scope="row">
      <Link to={`${groupLinkUrl}/${urlStringForProductName(name)}`}>
        {name}{" "}
        <span className="text-secondary text-decoration-none">
          | {groupNumberOfDrops} {groupNumberOfDrops > 1 ? "drops" : "drop"}
        </span>
      </Link>
    </th>
  ) : (
    <th scope="row">{name}</th>
  );
  groupTitle = index < 1 ? groupNameDisplay : <td></td>;
  return (
    <tr>
      {groupTitle}
      <td>
        <Link
          to={`${generatePath(PATHS.product, {
            productId: urlStringForProductName(entry.Product),
          })}`}
        >
          {entry.Product}
        </Link>{" "}
      </td>
      <td>{detailsSummary.numberOfDrops}</td>
      <td>{detailsSummary.numberOfColors}</td>
      <td>{detailsSummary.priceString}</td>
    </tr>
  );
}

function ArchiveTextGroupByProductRows({
  group,
  groupLinkUrl,
}: Omit<ArchiveGroupRowsProps, "showDetails" | "showTitle">) {
  const { sorting } = useControlsStateSelector((state) => state.controls);
  let productEntries = groupedByProduct(group.entries);
  if (sorting === SortKind.COUNT) {
    productEntries = sortedByCount(productEntries);
  }
  return productEntries.map((d, i) => (
    <ArchiveTextGroupByProductRow
      key={i}
      entries={d.entries}
      groupLinkUrl={groupLinkUrl}
      groupNumberOfDrops={group.entries.length}
      name={group.name}
      index={i}
    />
  ));
}

export default function ArchiveWithTextByProduct({
  groups,
  groupLinkUrl,
}: Omit<ArchiveGroupDisplayProps, "showDetails">) {
  const tableHead = (
    <tr>
      <th>Group</th>
      <th>Product</th>
      <th>Drops</th>
      <th>Colors</th>
      <th>Price</th>
    </tr>
  );
  const rows = groups.map((g) => (
    <ArchiveTextGroupByProductRows
      key={g.name}
      group={g}
      groupLinkUrl={groupLinkUrl}
    />
  ));
  return (
    <Row>
      <Col>
        <Table size="sm">
          <thead>{tableHead}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Col>
    </Row>
  );
}
