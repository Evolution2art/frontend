import Press from "../components/Press"
import CMSContent from "../components/CMSContent"
import Slideshow from "../components/Slideshow"
import { getCMSContent, getMedia } from "../utils/api"

const PressPage = ({ medias, press }) => {
  if (!press) {
    return null
  }

  function renderPress(item, idx, current) {
    const classNames =
      "slide w-full absolute" + (idx === current ? " active" : "")
    return (
      <Press
        key={`media_${idx}`}
        media={item}
        className={classNames}
        odd={true}
      />
    )
  }

  const filler = medias.reduce((largest, cur) => {
    return cur.gallery?.[0].height / cur.gallery?.[0].width >
      (largest?.height || 0) / (largest?.width || 1)
      ? cur.gallery[0]
      : largest
  }, null)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent title={press.title} text={press.description} />
      <Slideshow
        items={medias}
        renderer={renderPress}
        className="w-full"
        navClassName="fixed flex w-full max-w-screen-lg"
        filler={filler}
      />
      {medias.length < 1 && <em>Add some medias in the backend</em>}
      {/* <CMSContent title={press.title} text={press.description} id="press" />
      {medias.map((media, idx) => (
        <Media key={`media_${idx}`} media={media} odd={idx % 2} />
      ))}
      {medias.length < 1 && <em>Add some media items in the backend</em>} */}
    </div>
  )
}

export async function getStaticProps() {
  const press = await getCMSContent("press")
  const medias = await getMedia()
  return {
    props: { press, medias },
    revalidate: 300,
  }
}

export default PressPage
