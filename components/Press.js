import Link from "next/link"
import NextImage from "./Image"
import CMSContent from "./CMSContent"
import parseUrl from "parse-url"
import { MdLink } from "react-icons/md"

const Press = ({ media = {}, odd = true, className = "", theme = "light" }) => {
  const classNames =
    "flex flex-col md:flex-row " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  const link = media.link ? parseUrl(media.link, true) : {}
  return (
    <article className={classNames}>
      {media.media?.length > 0 ? (
        <div className="w-full max-w-screen-lg pt-2 pb-2 md:w-1/2">
          {media.media[0].mime?.indexOf("image") >= 0 ? (
            <NextImage media={media.media[0]} width={media.media[0].width} />
          ) : null}
        </div>
      ) : null}
      <div className="w-full md:mt-0 md:w-1/2">
        <CMSContent
          title={media?.title}
          text={media?.description}
          className={
            "fadeIn prose-stone" +
            (!odd ? " text-right" : "") +
            (media?.isDark ? " prose-invert" : " prose")
          }
        />
        {link?.href ? (
          <Link href={link.href} prefetch={false}>
            <a
              className="inline-block w-full p-8"
              rel="noreferrer"
              target="_blank"
            >
              <MdLink className="inline h-6 w-6" />
              {link.resource ? ` - ${link.resource}` : null}
            </a>
          </Link>
        ) : null}
      </div>
    </article>
  )
}

export default Press
