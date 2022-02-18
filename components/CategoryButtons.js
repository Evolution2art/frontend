import NextImage from "./Image"
import Link from "next/link"

const CategoryButtons = ({ categories = [] }) => {
  return (
    <div className="container flex flex-wrap justify-center mx-auto gap-2 mt-8">
      {categories.map((_category) => (
        <Link href={`/categories/${_category.slug}`} key={_category.id}>
          <a className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded">
            {_category.icon?.url && <div className="rounded-t-lg pt-2 pb-2 mx-auto w-16 h-16">
              <NextImage media={_category.icon} />
            </div>}
            <h4 className="mt-8">
              {_category.name}
            </h4>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CategoryButtons
