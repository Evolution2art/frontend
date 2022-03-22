import NextImage from "./Image"
import CMSContent from "./CMSContent"

const Achievement = ({
  achievement = {},
  odd = true,
  className = "",
  theme = "light",
}) => {
  const classNames =
    "relative flex " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  return (
    <article className={classNames}>
      {achievement.gallery?.length > 0 ? (
        <div className="absolute -z-10 w-full max-w-screen-lg pt-2 pb-2">
          <NextImage
            media={achievement.gallery[0]}
            width={achievement.gallery[0].width}
          />
        </div>
      ) : null}
      <CMSContent
        title={achievement?.title}
        text={achievement?.description}
        className={
          "frame fadeIn prose-stone w-1/4 dark:prose-invert" +
          (!odd ? " text-right" : "")
        }
      />
    </article>
  )
}

export default Achievement
