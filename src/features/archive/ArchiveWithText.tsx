import { Link, generatePath } from "react-router";
import { Col, Row, Table } from "reactstrap";

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
  groupLinkUrl: string | undefined;
  index: number;
  name: string;
  showTitle: boolean;
  showDetails: boolean;
};
function ArchiveTextGroupRow({
  entry,
  groupLinkUrl,
  index,
  name,
  showTitle,
  showDetails,
}: ArchiveTextGroupRowProps) {
  const price = entry.Price != null ? `$${entry.Price}` : "";
  let groupTitle = null;
  const detailsSummary = releaseDetailsSummary([entry]);
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
        </Link>{" "}
        {showDetails ? (
          <span>
            | {detailsSummary.numberOfColors}{" "}
            {detailsSummary.numberOfColors > 1 ? "colors" : "color"}
          </span>
        ) : null}
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
  showDetails,
}: ArchiveGroupRowsProps) {
  const entries = group.entries;
  return entries.map((d, i) => (
    <ArchiveTextGroupRow
      key={i}
      entry={d}
      groupLinkUrl={groupLinkUrl}
      name={group.name}
      showTitle={showTitle}
      showDetails={showDetails}
      index={i}
    />
  ));
}

export default function ArchiveWithText({
  groups,
  groupLinkUrl,
  showDetails,
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
      showDetails={!!showDetails}
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
