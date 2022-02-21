import Head from "next/head"
import { useRouter } from "next/router"
import CategoryButtons from "../../components/CategoryButtons"
import FossilsList from "../../components/FossilsList"
import { getCategories, getCategory } from "../../utils/api"

const CategoryPage = ({ category, categories }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading category...</div>
  }

  return (
    <div>
      <Head>
        <title>{category.name} fossils</title>
      </Head>
      <CategoryButtons categories={categories} path={router.asPath} />
      <div className="text-center mt-12">
        <h2 className="text-xl p-4 pb-0">{category.name}</h2>
        <FossilsList fossils={category.fossils} />
      </div>
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
