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
      <CategoryButtons
        categories={categories}
        path={router.asPath}
        className="text-xs"
        size="8"
        curSize="8"
        category={category}
      />
      <div className="text-center">
        {/* <h2 className="p-4 pb-0 text-xl text-stone-600 dark:text-stone-400">
          {category.name}
        </h2> */}
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
