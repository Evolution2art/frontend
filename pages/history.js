import Achievement from "../components/Achievement"
import CMSContent from "../components/CMSContent"
import Slideshow from "../components/Slideshow"
import Media from "../components/Media"
import { getCMSContent, getAchievements, getMedia } from "../utils/api"

const HistoryPage = ({ achievements, medias, history, press }) => {
  // console.log("cms", cms)
  // const history = cms[0]
  if (!history) {
    return null
  }

  function renderAchievements(item, idx, current) {
    const classNames =
      "slide w-full absolute" + (idx === current ? " active" : "")
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
        navClassName="fixed flex w-full max-w-screen-lg"
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
  const [history, press] = await getCMSContent(["history", "press"])
  const achievements = await getAchievements()
  const medias = await getMedia()
  return {
    props: { history, press, medias, achievements, medias },
    revalidate: 300,
  }
}

export default HistoryPage
