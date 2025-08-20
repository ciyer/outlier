import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { ScrollRestoration, useMatch, useNavigate } from "react-router";

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
import { filterArchiveForStyle } from "../../features/controls/filter";
import LoadingSpinner from "../../features/LoadingSpinner";
import { groupedByYearQuarter } from "../../features/utils";

import { PATHS } from "../route-paths";

function ArchiveBody({ data }: Pick<StyleBodyProps, "data">) {
  const { showImages } = useControlsStateSelector((state) => state.controls);
  const groups = groupedByYearQuarter(data);
  return showImages ? (
    <ArchiveWithImages groups={groups} />
  ) : (
    <ArchiveWithText groups={groups} />
  );
}

type StyleBodyProps = {
  data: DataRow[];
  styleId: string;
};

function StyleBody({ data, styleId }: StyleBodyProps) {
  const { filters } = useControlsStateSelector((state) => state.controls);
  const summaryData = filterArchiveForStyle(data, styleId, filters);

  const releases = summaryData.filtered;
  if (releases.length < 1) return <div>No releases found for {styleId}</div>;
  return (
    <>
      <ScrollRestoration />
      <Row>
        <Col md={{ size: 8, order: 1 }}>
          <ArchiveSummary data={summaryData} hidePeriod />
        </Col>
        <Col md={{ size: 4, order: 0 }}>
          <ArchiveControls
            data={summaryData}
            showCategoryFilters={false}
            showExplanations={false}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {summaryData == null ? (
            <LoadingSpinner />
          ) : (
            <ArchiveBody data={summaryData.filtered} />
          )}
        </Col>
      </Row>
    </>
  );
}

export default function ProductStyle() {
  const { data: rawData, isLoading } = useGetArchiveDataQuery();
  const navigate = useNavigate();
  const match = useMatch(PATHS.style);
  useEffect(() => {
    if (match == null || match.params.styleId == null) {
      navigate("/");
    }
  }, [match, navigate]);

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
  // This is handled in the effect, but we still need to check here
  if (match == null) return null;
  const { params } = match;
  const styleId = params.styleId;
  if (styleId == null) return null;
  const data = rawData.map(augmentWithReleaseDate);
  return <StyleBody data={data} styleId={styleId} />;
}
