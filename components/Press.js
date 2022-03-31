import NextImage from "./Image"
import CMSContent from "./CMSContent"

const Press = ({ media = {}, odd = true, className = "", theme = "light" }) => {
  const classNames =
    "flex " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  return (
    <article className={classNames}>
      {media.media?.length > 0 ? (
        <div className="absolute -z-10 w-full max-w-screen-lg pt-2 pb-2">
          <NextImage media={media.media[0]} width={media.media[0].width} />
        </div>
      ) : null}
      <CMSContent
        title={media?.title}
        text={media?.description}
        className={
          "fadeIn prose-stone mt-8 w-1/4" +
          (!odd ? " text-right" : "") +
          (media?.isDark ? " prose-invert" : " prose")
        }
      />
    </article>
  )
}

export default Press
