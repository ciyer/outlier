import LightboxYa from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./collections.css";

interface Image {
  original: string;
  src: string;
  width: number;
  height: number;
}

type LightboxProps = {
  images: Image[];
  open: boolean;
  index: number;
  close: () => void;
};
function Lightbox(props: LightboxProps) {
  const slides = props.images.map(({ original, width, height }) => ({
    src: original,
    width,
    height,
  }));
  return (
    <LightboxYa
      plugins={[Thumbnails]}
      slides={slides}
      open={props.open}
      index={props.index}
      close={props.close}
    />
  );
}

export default Lightbox;
