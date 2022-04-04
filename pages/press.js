import Press from "../components/Press"
import CMSContent from "../components/CMSContent"
import Slideshow from "../components/Slideshow"
import { getCMSContent, getMedia } from "../utils/api"

const PressPage = ({ medias, press }) => {
  if (!press) {
    return null
  }

  function renderPress(item, idx, current) {
    // const classNames = "slide" + (idx === current ? " active" : "")
    return (
      <Press
        key={`media_${idx}`}
        media={item}
        // className={classNames}
        odd={true}
      />
    )
  }

  const filler = medias.reduce((largest, cur) => {
    return cur.media?.[0].height / cur.media?.[0].width >
      (largest?.media?.[0].height || 0) / (largest?.media?.[0].width || 1)
      ? cur
      : largest
  }, null)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent title={press.title} text={press.description} />
      <div className="relative">
        <Slideshow
          items={medias}
          renderer={renderPress}
          navClassName="w-full left-0 fixed bottom-4 px-4 z-20"
          filler={filler}
        />
      </div>
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
