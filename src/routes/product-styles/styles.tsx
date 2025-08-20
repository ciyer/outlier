import { Col, Row } from "reactstrap";
import { ScrollRestoration } from "react-router";

import {
  augmentWithReleaseDate,
  useGetArchiveDataQuery,
  type DataRow,
} from "../../features/archive";
import ArchiveSummary from "../../features/archive/ArchiveSummary";
import ArchiveWithImagesByProduct from "../../features/archive/ArchiveWithImagesByProduct";
import ArchiveControls from "../../features/controls/ArchiveControls";
import ArchiveWithTextByProduct from "../../features/archive/ArchiveWithTextByProduct";
import {
  SortKind,
  useControlsStateSelector,
} from "../../features/controls/controls.slice";
import { filterArchive } from "../../features/controls/filter";
import LoadingSpinner from "../../features/LoadingSpinner";
import { groupedByStyle, sortedByCount } from "../../features/utils/utils";
import { PATH_STRUCTURE } from "../../routes/route-paths";

function ArchiveByStyle({ data }: Pick<StylesBodyProps, "data">) {
  const { showImages, sorting } = useControlsStateSelector(
    (state) => state.controls
  );
  let groups = groupedByStyle(data);
  if (sorting == SortKind.COUNT) {
    groups = sortedByCount(groups);
  }
  return showImages ? (
    <ArchiveWithImagesByProduct
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.styles.path}
    />
  ) : (
    <ArchiveWithTextByProduct
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.styles.path}
    />
  );
}

type StylesBodyProps = {
  data: DataRow[];
};

function StylesBody({ data }: StylesBodyProps) {
  const { filters, period } = useControlsStateSelector(
    (state) => state.controls
  );
  const summaryData = filterArchive(data, filters, period);

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
          <ArchiveControls
            data={summaryData}
            showExplanations={false}
            showSort={true}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {summaryData == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveByStyle data={summaryData.filtered} />
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
  return <StylesBody data={data} />;
}
