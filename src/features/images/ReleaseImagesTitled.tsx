import { Link } from "react-router";

import { type DataRow } from "../archive";
import { urlStringForProductName } from "../utils";

function ReleaseImageTitled({
  release,
  productUrl,
}: {
  release: DataRow;
  productUrl: string;
}) {
  const r = release;
  const src = r["Image"];
  // Return img and text
  return (
    <div
      className="p-2"
      style={{
        width: "calc(15%)",
        height: "calc(15%)",
        minWidth: "100px",
        minHeight: "100px",
      }}
    >
      <Link to={`${productUrl}/${urlStringForProductName(r.Product)}`}>
        <p key={`${r.Product}-${r.Release}-title`}>{r.Product}</p>
        <img
          key={`${r.Product}-${r.Release}-image`}
          src={src}
          alt={r.Product}
          style={{ width: "100%", height: "100%" }}
        />
      </Link>
    </div>
  );
}

export function ReleaseImagesTitled({
  data,
  productUrl,
}: {
  data: DataRow[];
  productUrl: string;
}) {
  const releases = data;
  const images = releases.map((r, i) => (
    <ReleaseImageTitled key={i} release={r} productUrl={productUrl} />
  ));
  return <div className="d-flex flex-wrap">{images}</div>;
}
