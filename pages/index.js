import Head from "next/head"
import { useRouter } from "next/router"
import CategoryButtons from "../components/CategoryButtons"
import CMSContent from "../components/CMSContent"
import FossilsList from "../components/FossilsList"
import { getFossils, getCMSContent, getCategories } from "../utils/api"

const HomePage = ({ categories, fossils, intro, about, contact }) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Evolution2Art</title>
      </Head>
      <CMSContent title={intro.title} text={intro.text} />
      <CMSContent title={about.title} text={about.text} anchor="about" />
      <a name="collection" />
      <CategoryButtons categories={categories} path={router.asPath} />
      <FossilsList fossils={fossils} />
      <CMSContent title={contact.title} text={contact.text} anchor="contact" />
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
