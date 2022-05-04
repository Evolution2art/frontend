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
  const link = media.link ? parseUrl(media.link, { stripWWW: false }) : {}
  return (
    <article className={classNames}>
      <div className="w-full max-w-screen-lg pt-2 pb-2 md:w-1/3">
        {media.content?.length > 0 ? (
          media.content[0].mime?.indexOf("image") >= 0 ? (
            <NextImage
              media={media.content[0]}
              width={media.content[0].width}
            />
          ) : null
        ) : null}
      </div>
      <div className="w-full md:mt-0 md:w-2/3">
        <CMSContent
          title={media?.title}
          text={media?.description}
          className="fadeIn prose-stone dark:prose-invert"
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
