import { useRouter } from "next/router"
import CategoryButtons from "../../components/CategoryButtons"
import FossilsList from "../../components/FossilsList"
import { getNewFossils, getCMSContent, getCategories } from "../../utils/api"

const FossilsPage = ({ categories, fossils, contact, theme, selected }) => {
  const router = useRouter()
  const { email } = contact
  // const [showCategories, setShowCategories] = useState(!fossils?.length)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CategoryButtons
        categories={categories}
        path={router.asPath}
        size={12}
        curSize={12}
        theme={theme}
        numNew={fossils.length}
      />

      {fossils.length ? (
        <div className="text-center">
          {!selected && (
            <h2 className="pt-8 text-2xl font-light italic">
              New Acquisitions
            </h2>
          )}
          {<FossilsList fossils={fossils} email={email} />}
        </div>
      ) : (
        <div>
          <div className="text-center text-sm">
            browse our collection via the categories above
          </div>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  // console.log("categories", categories)
  const fossils = await getNewFossils()
  // console.log("fossils", fossils)
  const contact = await getCMSContent("contact")
  // console.log("contact", contact)
  return {
    props: { categories, fossils, contact },
    revalidate: 300,
  }
}

export default FossilsPage
