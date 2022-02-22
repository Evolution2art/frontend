import NextImage from "./Image"
import Link from "next/link"

const CategoryButtons = ({ categories = [], path = "/" }) => {
  return (
    <div
      className="container mx-auto mt-8 flex flex-wrap justify-center gap-2"
      id="collection"
    >
      {categories.map((_category) => (
        <Link href={`/categories/${_category.slug}`} key={_category.id}>
          <a className="py-2 px-4 text-center font-semibold text-stone-800 opacity-75 hover:opacity-100">
            {_category.icon?.url && (
              <div className="mx-auto h-16 w-16 rounded-t-lg pt-2 pb-2">
                <NextImage media={_category.icon} />
              </div>
            )}
            <h4 className="mt-8 text-stone-700 dark:text-stone-300">
              {_category.name}
            </h4>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CategoryButtons
