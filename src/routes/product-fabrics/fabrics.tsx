import { Col, Row } from "reactstrap";
import { ScrollRestoration, useSearchParams } from "react-router";

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
import { groupedByFabric, sortedByCount } from "../../features/utils/utils";
import { PATH_STRUCTURE } from "../../routes/route-paths";

interface ArchiveByFabricProps extends Pick<FabricsBodyProps, "data"> {
  year: number | null;
}

function ArchiveByFabric({ data, year }: ArchiveByFabricProps) {
  const { showImages, sorting } = useControlsStateSelector(
    (state) => state.controls
  );
  let groups = groupedByFabric(data);
  if (sorting == SortKind.COUNT || year != null) {
    groups = sortedByCount(groups);
  }
  return showImages ? (
    <ArchiveWithImagesByProduct
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.fabrics.path}
    />
  ) : (
    <ArchiveWithTextByProduct
      groups={groups}
      groupLinkUrl={PATH_STRUCTURE.fabrics.path}
    />
  );
}

type FabricsBodyProps = {
  data: DataRow[];
};

function FabricsBody({ data }: FabricsBodyProps) {
  const { filters, period } = useControlsStateSelector(
    (state) => state.controls
  );
  const [searchParams] = useSearchParams();
  const yearParam = searchParams.get("year");
  const year = yearParam != null ? parseInt(yearParam, 10) : null;
  const summaryData = filterArchive(data, filters, period, year);

  const releases = summaryData.filtered;
  if (releases.length < 1) return <div>No releases found.</div>;
  return (
    <>
      <ScrollRestoration />
      {year && <h1 className="mb-3">{year} Fabrics</h1>}
      <Row>
        <Col md={{ size: 8, order: 1 }}>
          <ArchiveSummary data={summaryData} />
        </Col>
        <Col md={{ size: 4, order: 0 }}>
          <ArchiveControls
            data={summaryData}
            hidePeriod={year != null}
            showExplanations={false}
            showSort={year == null}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {summaryData == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveByFabric data={summaryData.filtered} year={year} />
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
