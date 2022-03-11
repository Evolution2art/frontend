import { useRouter } from "next/router"
import CategoryButtons from "../../components/CategoryButtons"
import FossilsList from "../../components/FossilsList"
import { getNewFossils, getCMSContent, getCategories } from "../../utils/api"
import { MdOutlineArrowBack, MdClose } from "react-icons/md"
import { useState } from "react"

const FossilsPage = ({ categories, fossils, contact, theme, selected }) => {
  const router = useRouter()
  const { email } = contact
  // const [showCategories, setShowCategories] = useState(!fossils?.length)

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <CategoryButtons
        categories={categories}
        path={router.asPath}
        size={12}
        curSize={12}
        theme={theme}
        numNew={fossils.length}
      />

      {fossils.length ? (
        <div className="mt-12 text-center">
          {/* <h2 className="p-4 pb-0 text-xl text-stone-600 dark:text-stone-400">
            {showCategories ? (
              <MdClose
                className="mx-4 inline"
                onClick={() => setShowCategories(false)}
              />
            ) : (
              <MdOutlineArrowBack
                className="mx-4 inline"
                onClick={() => setShowCategories(true)}
              />
            )}
            New acquisitions
          </h2> */}
          <FossilsList fossils={fossils} email={email} />
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
  const fossils = await getNewFossils()
  const [intro, about, contact] = await getCMSContent()
  return {
    props: { categories, fossils, contact },
    revalidate: 300,
  }
}

export default FossilsPage
