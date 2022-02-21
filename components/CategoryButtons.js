import NextImage from "./Image"
import Link from "next/link"

const CategoryButtons = ({ categories = [], path = "/" }) => {
  return (
    <div
      className="container flex flex-wrap justify-center mx-auto gap-2 mt-8"
      id="collection"
    >
      {categories.map((_category) => (
        <Link href={`/categories/${_category.slug}`} key={_category.id}>
          <a className="opacity-75 hover:opacity-100 text-stone-800 text-center font-semibold py-2 px-4">
            {_category.icon?.url && (
              <div className="rounded-t-lg pt-2 pb-2 mx-auto w-16 h-16">
                <NextImage media={_category.icon} />
              </div>
            )}
            <h4 className="mt-8">{_category.name}</h4>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CategoryButtons
