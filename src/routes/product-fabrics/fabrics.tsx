import { Col, Row } from "reactstrap";
import { ScrollRestoration } from "react-router";

import {
  augmentWithReleaseDate,
  useGetArchiveDataQuery,
  type DataRow,
} from "../../features/archive";
import ArchiveSummary from "../../features/archive/ArchiveSummary";
import ArchiveWithImages from "../../features/archive/ArchiveWithImages";
import ArchiveControls from "../../features/controls/ArchiveControls";
import ArchiveWithText from "../../features/archive/ArchiveWithText";
import { useControlsStateSelector } from "../../features/controls/controls.slice";
import { filterArchive } from "../../features/controls/filter";
import LoadingSpinner from "../../features/LoadingSpinner";
import { groupedByFabric } from "../../features/utils/utils";
import { PATH_STRUCTURE } from "../../routes/route-paths";

function ArchiveByFabric({ data }: Pick<FabricsBodyProps, "data">) {
  const { showImages } = useControlsStateSelector((state) => state.controls);
  const groups = groupedByFabric(data);
  return showImages ? (
    <ArchiveWithImages
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.fabrics.path}
    />
  ) : (
    <ArchiveWithText
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.fabrics.path}
    />
  );
}

type FabricsBodyProps = {
  data: DataRow[];
};

function FabricsBody({ data }: FabricsBodyProps) {
  const { filters } = useControlsStateSelector((state) => state.controls);
  const summaryData = filterArchive(data, filters);

  const releases = summaryData.filtered;
  if (releases.length < 1) return <div>No releases found.</div>;
  return (
    <>
      <ScrollRestoration />
      <Row>
        <Col md={{ size: 8, order: 1 }}>
          <ArchiveSummary data={summaryData} />
        </Col>
        <Col md={{ size: 4, order: 0 }}>
          <ArchiveControls data={summaryData} showExplanations={false} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {summaryData == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveByFabric data={summaryData.filtered} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default function ProductStyles() {
  const { data: rawData, isLoading } = useGetArchiveDataQuery();

  if (rawData == null || isLoading) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <LoadingSpinner />
          </Col>
        </Row>
      </>
    );
  }
  const data = rawData.map(augmentWithReleaseDate);
  return <FabricsBody data={data} />;
}
