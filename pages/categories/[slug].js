import Head from "next/head"
import { useRouter } from "next/router"
import FossilsList from "../../components/FossilsList"
import { getCategories, getCategory } from "../../utils/api"

const CategoryPage = ({ category }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading category...</div>
  }

  return (
    <div>
      <Head>
        <title>{category.name} fossils</title>
      </Head>
      <FossilsList fossils={category.fossils} />
    </div>
  )
}

export default CategoryPage

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug)
  return { props: { category } }
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map((_category) => {
      return {
        params: { slug: _category.slug },
      }
    }),
    fallback: true,
  }
}
