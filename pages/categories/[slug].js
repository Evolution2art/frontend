import Head from "next/head"
import { useRouter } from "next/router"
import CategoryButtons from "../../components/CategoryButtons"
import FossilsList from "../../components/FossilsList"
import { getCategories, getCategory } from "../../utils/api"

const CategoryPage = ({ category, categories, theme }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading category...</div>
  }

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <Head>
        <title>{category.title || category.name}</title>
      </Head>
      <CategoryButtons
        categories={categories}
        path={router.asPath}
        className="text-xs"
        size="12"
        curSize="12"
        category={category}
        theme={theme}
      />
      <div className="text-center">
        <h2 className="pt-8 text-2xl font-light italic">
          {category.title || category.name}
        </h2>
        <FossilsList fossils={category.fossils} />
      </div>
    </div>
  )
}

export default CategoryPage

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug)
  return { props: { category }, revalidate: 300 }
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
