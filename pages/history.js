import Achievement from "../components/Achievement"
import CMSContent from "../components/CMSContent"
import Slideshow from "../components/Slideshow"
import { getCMSContent, getAchievements } from "../utils/api"

const HistoryPage = ({ achievements, history, theme, toggleTheme }) => {
  if (!history) {
    return null
  }

  function renderAchievements(item, idx, current, fullscreen) {
    const classNames = "slide" + (idx === current ? " active" : "")
    const mediaProps = fullscreen
      ? {
          layout: "fill",
          objectFit: "cover",
          objectPosition: "center",
        }
      : {}
    return (
      <Achievement
        key={`achievement_${idx}`}
        achievement={item}
        mediaProps={mediaProps}
        className={classNames}
        odd={true}
        fullscreen={fullscreen}
      />
    )
  }

  const filler = achievements.reduce((largest, cur) => {
    return cur.gallery?.[0].height / cur.gallery?.[0].width >
      (largest?.gallery?.[0].height || 0) / (largest?.gallery?.[0].width || 1)
      ? cur
      : largest
  }, null)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent title={history.title} text={history.description} />
      <div className="relative">
        <Slideshow
          items={achievements}
          renderer={renderAchievements}
          navClassName="w-full left-0 fixed bottom-4 px-4 z-20"
          filler={filler}
          theme={theme}
        />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const history = await getCMSContent("history")
  const achievements = await getAchievements()
  return {
    props: { history, achievements },
    revalidate: 300,
  }
}

export default HistoryPage
