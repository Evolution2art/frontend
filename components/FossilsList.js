import NextImage from "./Image"
import Link from "next/link"

const FossilsList = ({ fossils }) => {
  return (
    <div className="m-4 mt-8 flex flex-wrap justify-center">
      {fossils?.map((_fossil) => (
        <div key={_fossil.id} className="w-full p-2 sm:w-1/2 md:w-1/3 xl:w-1/4">
          <div className="fossil-card border shadow-md hover:shadow-lg">
            <Link href={`/fossils/${_fossil.slug}`}>
              <a className="h-full">
                <div className="fossil-image relative z-0 h-full w-full">
                  <div className="mx-auto h-full">
                    <NextImage
                      media={_fossil.image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    {_fossil.sold && (
                      <div className="ribbon h-5 w-24 bg-gray-500 text-sm">
                        sold
                      </div>
                    )}
                    {_fossil.new && new Date(_fossil.new) > new Date() && (
                      <div className="ribbon h-5 w-24 bg-red-500 text-sm">
                        new
                      </div>
                    )}
                  </div>
                </div>
                <div className="fossil-info z-0">
                  <div className="z-1 relative">
                    <div className="flex flex-row justify-between gap-2">
                      <h4 className="fossil-title truncate py-3 pl-4 text-base font-semibold text-stone-700">
                        {_fossil.title}
                      </h4>
                      {_fossil.price && !_fossil.priceOnRequest && (
                        <div className="fossil-price py-3 pr-4">
                          {_fossil.price + " €"}
                        </div>
                      )}
                    </div>
                    <div className="fossil-description p-4 text-sm text-stone-700">
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
