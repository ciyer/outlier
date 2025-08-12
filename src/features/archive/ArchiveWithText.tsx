import { Link, generatePath } from "react-router";
import { Col, Row, Table } from "reactstrap";

import type {
  ArchiveGroupDisplayProps,
  ArchiveGroupRowsProps,
} from "./archive.types";
import { type DataRow } from "./Data";
import { PATHS } from "../../routes/route-paths";
import { urlStringForProductName } from "../utils";

type ArchiveTextGroupRowProps = {
  entry: DataRow;
  groupLinkUrl: string | undefined;
  index: number;
  name: string;
  showTitle: boolean;
};
function ArchiveTextGroupRow({
  entry,
  groupLinkUrl,
  index,
  name,
  showTitle,
}: ArchiveTextGroupRowProps) {
  const price = entry.Price != null ? `$${entry.Price}` : "";
  let groupTitle = null;
  if (showTitle) {
    const groupNameDisplay = groupLinkUrl ? (
      <th scope="row">
        <Link to={`${groupLinkUrl}/${urlStringForProductName(name)}`}>
          {name}
        </Link>
      </th>
    ) : (
      <th scope="row">{name}</th>
    );
    groupTitle = index < 1 ? groupNameDisplay : <td></td>;
  }
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
        </Link>
      </td>
      <td>{price}</td>
      <td>{entry.Release}</td>
    </tr>
  );
}

function ArchiveTextGroupRows({
  group,
  showTitle,
  groupLinkUrl,
}: ArchiveGroupRowsProps) {
  const entries = group.entries;
  return entries.map((d, i) => (
    <ArchiveTextGroupRow
      key={i}
      entry={d}
      groupLinkUrl={groupLinkUrl}
      name={group.name}
      showTitle={showTitle}
      index={i}
    />
  ));
}

export default function ArchiveWithText({
  groups,
  groupLinkUrl,
}: ArchiveGroupDisplayProps) {
  const showTitle = groups.length > 1;
  const tableHead = showTitle ? (
    <tr>
      <th>Group</th>
      <th>Product</th>
      <th>Price</th>
      <th>Release</th>
    </tr>
  ) : (
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Release</th>
    </tr>
  );
  const rows = groups.map((g) => (
    <ArchiveTextGroupRows
      key={g.name}
      group={g}
      groupLinkUrl={groupLinkUrl}
      showTitle={groups.length > 1}
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
