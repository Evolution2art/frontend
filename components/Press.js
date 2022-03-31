import NextImage from "./Image"
import CMSContent from "./CMSContent"
import { getStrapiURL } from "../utils/api"

const Press = ({ media = {}, odd = true, className = "", theme = "light" }) => {
  const classNames =
    "flex flex-col " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  return (
    <article className={classNames}>
      <CMSContent
        title={media?.title}
        text={media?.description}
        className={
          "fadeIn prose-stone mt-8 w-1/4" +
          (!odd ? " text-right" : "") +
          (media?.isDark ? " prose-invert" : " prose")
        }
      />
      {media.media?.length > 0 ? (
        <div className="w-full max-w-screen-lg pt-2 pb-2">
          {media.media[0].mime?.indexOf("image") >= 0 ? (
            <NextImage media={media.media[0]} width={media.media[0].width} />
          ) : null}
          {media.media[0].mime === "application/pdf" ? (
            <embed
              style={{
                width: "100%",
                height: "100%",
              }}
              type="application/pdf"
              src={getStrapiURL(media.media[0].url)}
            />
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export default Press
