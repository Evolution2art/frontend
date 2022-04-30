import { getStrapiMedia } from "../utils/medias"
import NextImage from "next/image"

const Image = (props) => {
  if (!props.media) {
    return <NextImage {...props} />
  }

  const { url, alternativeText } = props.media

  const loader = ({ src, width }) => {
    return `${getStrapiMedia(src)}${
      src.indexOf("?") > 0 ? "&" : "?"
    }width=${width}`
  }

  const {
    layout = "responsive",
    objectFit = "contain",
    objectPosition = "center",
    priority = false,
  } = props

  // console.log("calling Image with layout, objectFit", layout, objectFit)

  return (
    <NextImage
      loader={loader}
      layout={layout}
      priority={priority}
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
