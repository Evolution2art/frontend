import NextImage from "./Image"
import Link from "next/link"
import { useCartContext } from "../context/cart"
import { MdVisibility } from "react-icons/md"

const FossilsList = ({ locale, theme, fossils }) => {
  const { cart, convertCurrency } = useCartContext()
  const numberFormat = Intl.NumberFormat(locale, {
    style: "currency",
    currency: cart.currency,
    minimumFractionDigits: 0,
  })
  return (
    <div className="mx-4 flex flex-wrap justify-center">
      {fossils
        ?.filter((_fossil) => !!_fossil.image)
        .map((_fossil, _idx) => {
          const price = _fossil?.price
            ? numberFormat.format(convertCurrency(_fossil.price, cart.currency))
            : ""
          const promotionPrice = _fossil?.promotionPrice
            ? numberFormat.format(
                convertCurrency(_fossil.promotionPrice, cart.currency)
              )
            : ""
          return (
            <div key={_fossil.id} className="w-full p-2 sm:w-1/2">
              <div className="fossil-card relative shadow-md hover-hover:shadow-lg">
                <Link href={`/fossils/${_fossil.slug}`}>
                  <a className="h-full" title={_fossil.title}>
                    {_fossil.gallery?.length > 1 ? (
                      <MdVisibility className="absolute top-2 left-2 z-10 h-6 w-6 opacity-10" />
                    ) : null}

                    <div className="fossil-image relative z-0 h-full w-full">
                      <div className="mx-auto h-full">
                        <NextImage
                          media={_fossil.image}
                          priority={_idx < 4}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                        {_fossil.sold ? (
                          <div className="ribbon h-5 w-24 bg-gray-500 text-sm">
                            sold
                          </div>
                        ) : (
                          ""
                        )}
                        {_fossil.new &&
                        !_fossil.sold &&
                        new Date(_fossil.new) > new Date() ? (
                          <div className="ribbon h-5 w-24 bg-red-500 text-sm">
                            new
                          </div>
                        ) : (
                          ""
                        )}
                        {(!_fossil.new || new Date(_fossil.new) < new Date()) &&
                        !_fossil.sold &&
                        promotionPrice ? (
                          <div className="ribbon h-5 w-24 bg-green-500 text-sm">
                            sale
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="fossil-info z-0 text-stone-700">
                      <div className="z-1 relative">
                        <div className="flex flex-row justify-between gap-2">
                          <h4 className="fossil-title truncate py-3 pl-4 text-base font-semibold">
                            {_fossil.title}
                          </h4>
                          {_fossil.price &&
                          !_fossil.priceOnRequest &&
                          !_fossil.sold ? (
                            <div className="fossil-price flex flex-row gap-2 py-3 pr-4">
                              {promotionPrice ? (
                                <del className="whitespace-nowrap">{price}</del>
                              ) : (
                                <span className="whitespace-nowrap">
                                  {price}
                                </span>
                              )}
                              <span className="promotionPrice">
                                {promotionPrice}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="fossil-description clip-lines p-4 text-sm line-clamp-3">
                          {_fossil.description}
                        </div>
                        <span className="h-2 w-full"> </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default FossilsList
