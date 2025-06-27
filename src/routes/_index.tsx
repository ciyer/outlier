import { Link, generatePath } from "react-router";
import { Col, Row, Table } from "reactstrap";

import { useGetArchiveDataQuery, type DataRow } from "../features/archive";
import LoadingSpinner from "../features/LoadingSpinner";
import { PATHS } from "./route-paths";
import {
  groupedByYearQuarter,
  urlStringForProductName,
} from "../features/utils";

type ArchiveTextGroupRowProps = {
  entry: DataRow;
  index: number;
  name: string;
  showTitle: boolean;
};
function ArchiveTextGroupRow({
  entry,
  index,
  name,
  showTitle,
}: ArchiveTextGroupRowProps) {
  const price = entry.Price != null ? `$${entry.Price}` : "";
  let groupTitle = null;
  if (showTitle) {
    groupTitle = index < 1 ? <th scope="row">{name}</th> : <td></td>;
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

type ArchiveTextGroupRowsProps = {
  group: { name: string; entries: DataRow[] };
  showTitle: boolean;
};

function ArchiveTextGroupRows({ group, showTitle }: ArchiveTextGroupRowsProps) {
  const entries = group.entries;
  return entries.map((d, i) => (
    <ArchiveTextGroupRow
      key={i}
      entry={d}
      name={group.name}
      showTitle={showTitle}
      index={i}
    />
  ));
}

interface ArchiveWithTextProps {
  data: DataRow[];
}

function ArchiveWithText({ data }: ArchiveWithTextProps) {
  const groups = groupedByYearQuarter(data);
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

type ArchiveProps = {
  data: DataRow[];
};

function ArchiveBody({ data }: ArchiveProps) {
  //    return <ArchiveWithImages data={data} settings={settings} />;
  //else return <ArchiveWithText data={data} settings={settings} />;
  return <ArchiveWithText data={data} />;
}

export default function Archive() {
  const { data, isLoading } = useGetArchiveDataQuery();
  console.log({ data, isLoading });
  return (
    <>
      {/* <Row>
        <Col md={{ size: 8, order: 1 }}>
          {useMinimalSummary ? (
            <ArchiveSummaryMinimal data={data} summary={summary} />
          ) : (
            <ArchiveSummary data={data} summary={summary} />
          )}
        </Col>
        <Col md={{ size: 4, order: 0 }}>
          <ArchiveControls
            settings={settings}
            summary={fabricSummary}
            handlers={handlers.displaySettingHandlers}
          />
        </Col>
      </Row> */}
      <Row>
        <Col xs={12}>
          {isLoading || data == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveBody data={data} />
          )}
        </Col>
      </Row>
    </>
  );
}
