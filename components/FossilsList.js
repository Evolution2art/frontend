import NextImage from "./Image"
import Link from "next/link"

const FossilsList = ({ fossils }) => {
  return (
    <div className="m-4 flex flex-wrap justify-center mt-8">
      {fossils?.map((_fossil) => (
        <div key={_fossil.id} className="p-2 w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
          <div className="border hover:shadow-lg shadow-md fossil-card">
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
                    {_fossil.sold && (
                      <div className="text-sm ribbon w-24 h-5 bg-gray-500">
                        sold
                      </div>
                    )}
                    {_fossil.new && new Date(_fossil.new) > new Date() && (
                      <div className="text-sm ribbon w-24 h-5 bg-red-500">
                        new
                      </div>
                    )}
                  </div>
                </div>
                <div className="z-0 fossil-info">
                  <div className="relative z-1">
                    <div className="flex flex-row justify-between gap-2">
                      <h4 className="pl-4 py-3 font-semibold text-base truncate text-stone-700 fossil-title">
                        {_fossil.title}
                      </h4>
                      {_fossil.price && !_fossil.priceOnRequest && (
                        <div className="pr-4 py-3 fossil-price">
                          {_fossil.price + " €"}
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-sm text-stone-700 fossil-description">
                      {_fossil.description}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FossilsList
