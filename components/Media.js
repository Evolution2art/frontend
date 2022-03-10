import Link from "next/link"
import NextImage from "./Image"
import CMSContent from "./CMSContent"
import { MdDateRange } from "react-icons/md"

const Media = ({ media = {}, odd = true, className = "", theme = "light" }) => {
  const classNames =
    "flex justify-start " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  return (
    <div className={classNames}>
      {odd && media.media?.length > 0 ? (
        <div className="h-1/2 w-1/2 pt-2 pb-2">
          <NextImage media={media.media[0]} width={media.media[0].width} />
        </div>
      ) : null}
      <div className="w-1/2">
        <CMSContent
          title={media?.title}
          text={media?.description}
          className={!odd ? "text-right" : ""}
        />
        <div className={"p-8" + (!odd ? " text-right" : "")}>
          {media.link && (
            <Link href={media.link}>
              <a>{media.link}</a>
            </Link>
          )}
          {media.when && (
            <div
              className={
                "flex items-center gap-2" + (!odd ? " justify-end" : "")
              }
            >
              <MdDateRange />
              <date>{media.when}</date>
            </div>
          )}
        </div>
      </div>
      {!odd && media.media?.length > 0 ? (
        <div className="h-1/2 w-1/2 pt-2 pb-2">
          <NextImage media={media.media[0]} width={media.media[0].width} />
        </div>
      ) : null}
    </div>
  )
}

export default Media
