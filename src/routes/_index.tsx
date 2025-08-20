import { Col, Row } from "reactstrap";
import { ScrollRestoration } from "react-router";

import {
  augmentWithReleaseDate,
  useGetArchiveDataQuery,
  type DataRow,
} from "../features/archive";
import ArchiveSummary from "../features/archive/ArchiveSummary";
import ArchiveControls from "../features/controls/ArchiveControls";
import { useControlsStateSelector } from "../features/controls/controls.slice";
import { filterArchive } from "../features/controls/filter";
import ArchiveWithImages from "../features/archive/ArchiveWithImages";
import ArchiveWithText from "../features/archive/ArchiveWithText";
import LoadingSpinner from "../features/LoadingSpinner";
import { groupedByYearQuarter } from "../features/utils";

type ArchiveProps = {
  data: DataRow[];
};

function ArchiveBody({ data }: ArchiveProps) {
  const { showImages } = useControlsStateSelector((state) => state.controls);
  const groups = groupedByYearQuarter(data);
  return showImages ? (
    <ArchiveWithImages groups={groups} />
  ) : (
    <ArchiveWithText groups={groups} />
  );
}

export default function Archive() {
  const { data: rawData, isLoading } = useGetArchiveDataQuery();
  const { filters, period } = useControlsStateSelector(
    (state) => state.controls
  );
  const data = rawData ? rawData.map(augmentWithReleaseDate) : null;
  const summaryData =
    data == null ? null : filterArchive(data, filters, period);
  return (
    <>
      <ScrollRestoration />
      <Row>
        <Col md={{ size: 8, order: 1 }}>
          <ArchiveSummary data={summaryData} />
        </Col>
        <Col md={{ size: 4, order: 0 }}>
          <ArchiveControls data={summaryData} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {isLoading || summaryData == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveBody data={summaryData.filtered} />
          )}
        </Col>
      </Row>
    </>
  );
}
