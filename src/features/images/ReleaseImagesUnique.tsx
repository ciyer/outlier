import { type DataRow } from "../archive/";
// Not currently used, but keeping around in case...
// function isSingleProduct(releases) {
//   const productName = releases[0]['Product']
//   return releases.every(r => r['Product'] === productName);
// }

function ReleaseImageUnique({
  release,
  seenMap,
}: {
  release: DataRow;
  seenMap: Record<string, boolean>;
}) {
  const r = release;
  const src = r["Image"];
  const notSeen = seenMap[src] == null;
  if (notSeen) seenMap[src] = true;
  // Return just the image once
  if (notSeen)
    return (
      <img
        src={src}
        alt={r["Product"]}
        style={{ width: "calc(20%)", height: "calc(20%)" }}
      />
    );
  return <span></span>;
}

export default function ReleaseImagesUnique({
  releases,
}: {
  releases: DataRow[];
}) {
  const seenMap: Record<string, boolean> = {};
  const images = releases.map((r, i) => (
    <ReleaseImageUnique key={i} release={r} seenMap={seenMap} />
  ));
  return <div className="d-flex flex-wrap p-2">{images}</div>;
}
