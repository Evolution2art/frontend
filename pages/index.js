import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import CategoryButtons from "../components/CategoryButtons"
import Contact from "../components/Contact"
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
import { useLayoutEffect, useState } from "react"

const HomePage = ({ categories, intro, about, contact, theme }) => {
  const router = useRouter()
  const logo = theme === "dark" ? "logo-white" : "logo-dark"
  const background =
    theme === "dark" ? intro.backgroundDark[0] : intro.background[0]
  // const { email } = contact
  // const now = new Date()
  // const _fossils = fossils.filter((_fossil) => {
  //   const _date = (_fossil.new && new Date(_fossil.new)) || new Date()
  //   return _date > now
  // })
  const buttonClassNames = "px-4 py-2"
  // "m-2 rounded border px-4 py-2 font-semibold shadow hover:shadow-lg whitespace-no-wrap " +
  // "border-stone-800 text-stone-800 dark:text-stone-200 dark:border-stone-200"

  const [scroll, setScroll] = useState(false)
  const onScroll = () => {
    // if (scroll && window.scrollY == 0) {
    //   setScroll(false)
    // }
    if (window.scrollY > 0) {
      setScroll(true)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Evolution2Art</title>
      </Head>
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
      <Link href="/">
        <a
          className={`frame block w-full max-w-screen-md py-8 text-center${
            scroll ? " fadeBgIn" : ""
          }`}
        >
          <NextImage
            src={`/${logo}.png`}
            alt="home"
            className="logo"
            height={148}
            width={148}
          />
        </a>
      </Link>
      <div
        className={`frame mx-auto min-h-screen w-full max-w-screen-md ${
          scroll ? "fadeIn" : "opacity-0"
        }`}
      >
        <main className={`content`}>
          <CMSContent
            title={intro.title}
            text={intro.text}
            className="fill-screen-v dark:prose-invert"
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
            className="mt-16 mb-10"
          />
          <div className="flex max-w-screen-md">
            <div className="w-1/3 pt-24">
              <NextImage media={about.gallery[0]} />
            </div>
            <CMSContent
              title={about.title}
              text={about.text}
              id="about"
              className="prose-stone w-2/3 dark:prose-invert"
            />
          </div>
          <nav className="mb-12 flex items-center justify-center">
            <Link href="/history">
              <a className={buttonClassNames}>Learn more about our work</a>
            </Link>
            <Link href="/history#press">
              <a className={buttonClassNames}>See what others have to say</a>
            </Link>
          </nav>
        </main>
      </div>
      <Contact cms={contact} />
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
