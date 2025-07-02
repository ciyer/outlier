import { Col, Row } from "reactstrap";

import {
  augmentWithReleaseDate,
  useGetArchiveDataQuery,
  type DataRow,
} from "../features/archive";
import ArchiveWithText from "../features/archive/ArchiveWithText";
import LoadingSpinner from "../features/LoadingSpinner";

type ArchiveProps = {
  data: DataRow[];
};

function ArchiveBody({ data }: ArchiveProps) {
  //    return <ArchiveWithImages data={data} settings={settings} />;
  //else return <ArchiveWithText data={data} settings={settings} />;
  return <ArchiveWithText data={data} />;
}

export default function Archive() {
  const { data: rawData, isLoading } = useGetArchiveDataQuery();
  const data = rawData ? rawData.map(augmentWithReleaseDate) : null;

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
