import NextImage from "./Image"
import Link from "next/link"

const FossilsList = ({ fossils }) => {
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
      {fossils?.map((_fossil) => (
        <div
          key={_fossil.id}
          className="border hover:shadow-lg shadow-md fossil-card"
        >
          <Link href={`/fossils/${_fossil.slug}`}>
            <a className="h-full">
              <div className="fossil-image w-full h-full relative z-0">
                <div className="mx-auto h-full">
                  <NextImage
                    media={_fossil.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </div>
              <div className="z-0 fossil-info">
                <div className="relative z-1">
                  <h4 className="p-4 mt-1 font-semibold text-base leading-tight truncate text-gray-700 fossil-title">
                    {_fossil.title}
                  </h4>
                  <div className="p-4 text-sm text-gray-700 fossil-description">
                    {_fossil.description}
                  </div>
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
