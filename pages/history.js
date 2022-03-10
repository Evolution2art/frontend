import Achievement from "../components/Achievement"
import CMSContent from "../components/CMSContent"
import Media from "../components/Media"
import { getCMSContent, getAchievements, getMedia } from "../utils/api"

const HistoryPage = ({ achievements, medias, history, press }) => {
  // console.log("cms", cms)
  // const history = cms[0]
  if (!history) {
    return null
  }
  return (
    <div>
      <CMSContent title={history.title} text={history.description} />
      {achievements.map((achievement, idx) => (
        <Achievement
          key={`achievement_${idx}`}
          achievement={achievement}
          odd={idx % 2}
        />
      ))}
      {achievements.length < 1 && <em>Add some achievements in the backend</em>}
      <CMSContent title={press.title} text={press.description} id="press" />
      {medias.map((media, idx) => (
        <Media key={`media_${idx}`} media={media} odd={idx % 2} />
      ))}
      {medias.length < 1 && <em>Add some media items in the backend</em>}
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
