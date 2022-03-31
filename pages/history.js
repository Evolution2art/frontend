import Achievement from "../components/Achievement"
import CMSContent from "../components/CMSContent"
import Slideshow from "../components/Slideshow"
import { getCMSContent, getAchievements } from "../utils/api"

const HistoryPage = ({ achievements, history }) => {
  if (!history) {
    return null
  }

  function renderAchievements(item, idx, current) {
    const classNames =
      "slide w-full max-h-screen absolute" + (idx === current ? " active" : "")
    return (
      <Achievement
        key={`achievement_${idx}`}
        achievement={item}
        className={classNames}
        odd={true}
      />
    )
  }

  const filler = achievements.reduce((largest, cur) => {
    return cur.gallery?.[0].height / cur.gallery?.[0].width >
      (largest?.height || 0) / (largest?.width || 1)
      ? cur.gallery[0]
      : largest
  }, null)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent title={history.title} text={history.description} />
      <Slideshow
        items={achievements}
        renderer={renderAchievements}
        className="w-full"
        navClassName="fixed flex w-full max-w-screen-lg max-h-screen"
        filler={filler}
      />
      {achievements.length < 1 && <em>Add some achievements in the backend</em>}
      {/* <CMSContent title={press.title} text={press.description} id="press" />
      {medias.map((media, idx) => (
        <Media key={`media_${idx}`} media={media} odd={idx % 2} />
      ))}
      {medias.length < 1 && <em>Add some media items in the backend</em>} */}
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
