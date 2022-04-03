import NextImage from "./Image"
import CMSContent from "./CMSContent"

const Achievement = ({
  achievement = {},
  odd = true,
  mediaProps = {},
  className = "",
  fullscreen = false,
}) => {
  // const { isDark } = achievement
  const classNames =
    // "flex " +
    // (odd ? "justify-start" : "justify-end") +
    className ? ` ${className}` : ""

  // handle theme switch
  // useEffect(() => {
  //   if (
  //     typeof toggleTheme === "function" &&
  //     ((theme === "light" && achievement.isDark) ||
  //       (theme === "dark" && !achievement.isDark))
  //   ) {
  //     toggleTheme()
  //   }
  // }, [active])
  return (
    <section className={classNames}>
      {achievement.gallery?.length > 0 ? (
        <div>
          <NextImage
            media={achievement.gallery[0]}
            {...mediaProps}
            // width={achievement.gallery[0].width}
          />
        </div>
      ) : null}
      <CMSContent
        title={achievement?.title}
        text={achievement?.description}
        className={
          (achievement?.isDark ? "prose-invert" : "prose") +
          " absolute " +
          (fullscreen ? "bottom-4 right-4" : "bottom-0 right-0") +
          (!odd ? " text-right" : "")
        }
      />
    </section>
  )
}

export default Achievement
