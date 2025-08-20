import { type DataRow } from "../archive/";
// Not currently used, but keeping around in case...
// function isSingleProduct(releases) {
//   const productName = releases[0]['Product']
//   return releases.every(r => r['Product'] === productName);
// }

function ReleaseImage({ release }: { release: DataRow }) {
  const r = release;
  const src = r["Image"];
  return (
    <img
      src={src}
      alt={r["Product"]}
      style={{ width: "calc(20%)", height: "calc(20%)" }}
    />
  );
}

export default function ReleaseImagesUnique({
  releases,
}: {
  releases: DataRow[];
}) {
  const seenMap: Record<string, boolean> = {};
  const images = releases
    .map((r, i) => {
      if (seenMap[r["Image"]]) return null;
      // If the image has not been seen, render it
      seenMap[r["Image"]] = true;
      return <ReleaseImage key={i} release={r} />;
    })
    .filter((img) => img !== null);
  return <div className="d-flex flex-wrap p-2">{images}</div>;
}
