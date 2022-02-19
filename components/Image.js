import { getStrapiMedia } from "../utils/medias"
import NextImage from "next/image"

const Image = (props) => {
  if (!props.media) {
    return <NextImage {...props} />
  }

  const { url, alternativeText } = props.media

  const loader = ({ src }) => {
    return getStrapiMedia(src)
  }

  const {
    layout = "responsive",
    objectFit = "contain",
    objectPosition = "center",
  } = props

  // console.log("calling Image with layout, objectFit", layout, objectFit)

  return (
    <NextImage
      loader={loader}
      layout={layout}
      objectFit={objectFit}
      objectPosition={objectPosition}
      width={layout !== "fill" && props.media.width}
      height={layout !== "fill" && props.media.height}
      src={url}
      alt={alternativeText || ""}
    />
  )
}

export default Image
