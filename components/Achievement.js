import NextImage from "./Image"
import CMSContent from "./CMSContent"

const Achievement = ({
  achievement = {},
  odd = true,
  className = "",
  theme = "light",
}) => {
  const classNames =
    "flex " +
    (odd ? "justify-start" : "justify-end") +
    (className ? ` ${className}` : "")
  return (
    <div className={classNames}>
      {odd && achievement.gallery?.length > 0 ? (
        <div className="h-1/2 w-1/2 pt-2 pb-2">
          <NextImage
            media={achievement.gallery[0]}
            width={achievement.gallery[0].width}
          />
        </div>
      ) : null}
      <CMSContent
        title={achievement?.title}
        text={achievement?.description}
        className={"w-1/2" + (!odd ? " text-right" : "")}
      />
      {!odd && achievement.gallery?.length > 0 ? (
        <div className="h-1/2 w-1/2 pt-2 pb-2">
          <NextImage
            media={achievement.gallery[0]}
            width={achievement.gallery[0].width}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Achievement
