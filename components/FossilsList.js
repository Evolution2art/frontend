import NextImage from "./Image"
import Link from "next/link"

const FossilsList = ({ fossils }) => {
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
      {fossils?.map((_fossil) => (
        <div
          key={_fossil.id}
          className="border rounded-lg hover:shadow-lg shadow-md fossil-card"
        >
          <Link href={`/fossils/${_fossil.slug}`}>
            <a className="flex flex-col justify-between h-full">
              <div className="w-full">
                <div className="rounded-t-lg pt-2 pb-2 mx-auto">
                  <NextImage media={_fossil.image} />
                </div>
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg fossil-info">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_fossil.title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_fossil.description}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default FossilsList
