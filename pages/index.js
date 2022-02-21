import Head from "next/head"
import { useRouter } from "next/router"
import CategoryButtons from "../components/CategoryButtons"
import NextImage from "../components/Image"
import CMSContent from "../components/CMSContent"
import FossilsList from "../components/FossilsList"
import { getFossils, getCMSContent, getCategories } from "../utils/api"

const HomePage = ({ categories, fossils, intro, about, contact }) => {
  const router = useRouter()
  const background = intro.background[0]
  const now = new Date()
  const _fossils = fossils.filter((_fossil) => {
    const _date = (_fossil.new && new Date(_fossil.new)) || new Date()
    return _date > now
  })
  return (
    <div>
      <Head>
        <title>Evolution2Art</title>
      </Head>
      {background && (
        <div className="background">
          <NextImage
            media={background}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      <CMSContent title={intro.title} text={intro.text} />
      <CategoryButtons categories={categories} path={router.asPath} />
      {_fossils.length ? (
        <div className="text-center mt-12">
          <h2 className="text-xl text-gray-600 p-4 pb-0">New additions</h2>
          <FossilsList fossils={_fossils} />
        </div>
      ) : (
        <div className="text-sm text-center">
          browse our collection via the categories above
        </div>
      )}
      <CMSContent title={about.title} text={about.text} id="about" />
      <CMSContent title={contact.title} text={contact.text} id="contact" />
    </div>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  const fossils = await getFossils()
  const [intro, about, contact] = await getCMSContent()
  return { props: { categories, fossils, intro, about, contact } }
}

export default HomePage
