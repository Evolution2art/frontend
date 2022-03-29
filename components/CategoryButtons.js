import NextImage from "./Image"
import Link from "next/link"

const CategoryButtons = ({
  categories = [],
  category = {},
  path = "/",
  className = "",
  size = 8,
  curSize = 12,
  theme = "light",
  selected,
}) => {
  // manually add tailwindcss classnames so it generates the required defs
  // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
  const twClasses = [
    "w-2 w-3 w-4 w-5 w-6 w-8 w-12 w-16",
    "h-2 h-3 h-4 h-5 h-6 h-8 h-12 h-16",
  ]

  const hasSelection = selected || path.indexOf("/", 1) !== -1

  const classNames =
    "text-stone-700 dark:text-stone-300" +
    ((className && ` ${className}`) || "") +
    ((hasSelection && " selected") || "")
  const hidden = "" //!category.slug ? "block " : "hidden "
  return (
    <nav
      className={`flex flex-wrap justify-center gap-4 ${classNames}`}
      id="collection"
    >
      {categories.map((_category) => {
        const isCurrent = category?.slug === _category.slug
        const twSize = isCurrent ? curSize : size
        const current = isCurrent ? "current " : ""
        const hasNew = _category?.fossils?.filter(
          (_fossil) => _fossil.new
        ).length
        const sizes = `${
          (!isCurrent && "") || ""
        }${hidden}mx-auto h-${twSize} w-${twSize}`
        return (
          <Link href={`/categories/${_category.slug}`} key={_category.id}>
            <a
              className={
                current +
                "nav-item mx-4 py-2 text-center font-semibold text-stone-800 dark:text-stone-200"
              }
            >
              {theme === "light"
                ? _category.icon?.url && (
                    <div className={`relative ${sizes}`}>
                      <NextImage media={_category.icon} layout="fill" />
                    </div>
                  )
                : _category.iconDark?.url && (
                    <div className={`relative ${sizes}`}>
                      <NextImage media={_category.iconDark} layout="fill" />
                    </div>
                  )}

              <h5 className="mx-auto pt-2 text-sm leading-4 tracking-tight">
                {_category.name}
              </h5>
              {hasNew > 0 && <div className="ribbon h-1 w-10 bg-red-500"></div>}
            </a>
          </Link>
        )
      })}
    </nav>
  )
}

export default CategoryButtons
