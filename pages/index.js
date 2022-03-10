import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import CategoryButtons from "../components/CategoryButtons"
import NextImage from "../components/Image"
import CMSContent from "../components/CMSContent"
// import FossilsList from "../components/FossilsList"
import {
  // getFossils,
  getCMSContent,
  getCategories,
  getHistory,
  getPress,
} from "../utils/api"

const HomePage = ({ categories, intro, about, contact, theme }) => {
  const router = useRouter()
  const background =
    theme === "dark" ? intro.backgroundDark[0] : intro.background[0]
  // const { email } = contact
  // const now = new Date()
  // const _fossils = fossils.filter((_fossil) => {
  //   const _date = (_fossil.new && new Date(_fossil.new)) || new Date()
  //   return _date > now
  // })
  const classNames =
    "m-2 rounded border px-4 py-2 font-semibold shadow hover:shadow-lg whitespace-no-wrap " +
    "border-stone-800 text-stone-800 dark:text-stone-200 dark:border-stone-200"

  return (
    <>
      {background && (
        <div className="background absolute top-0 left-0 right-0 -z-10 h-full w-full">
          <NextImage
            media={background}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      <Head>
        <title>Evolution2Art</title>
      </Head>
      <div className="content">
        <CMSContent
          title={intro.title}
          text={intro.text}
          className="half-screen"
        />
        {/* <nav className="m-10 mt-36 mb-12 flex items-center justify-center">
        <Link href="/#about">
          <a className={classNames}>Our Story</a>
        </Link>
        <Link href="/history">
          <a className={classNames}>Our Work</a>
        </Link>
        <Link href="/fossils">
          <a className={classNames}>New Acquisitions</a>
        </Link>
      </nav> */}
        <CategoryButtons
          categories={categories}
          path={router.asPath}
          size={12}
          curSize={12}
          theme={theme}
          className="mb-10 mt-16"
        />
        <CMSContent title={about.title} text={about.text} id="about" />
        <nav className="flex items-center justify-center">
          <Link href="/history">
            <a className={classNames}>Learn more about our work</a>
          </Link>
          <Link href="/history#press">
            <a className={classNames}>See what others have to say</a>
          </Link>
        </nav>

        <CMSContent title={contact.title} text={contact.text} id="contact" />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  // const fossils = await getFossils()
  // const history = await getHistory()
  // const press = await getPress()
  const [intro, about, contact] = await getCMSContent([
    "introduction",
    "about",
    "contact",
  ])
  return {
    props: { categories, intro, about, contact },
    revalidate: 300,
  }
}

export default HomePage
