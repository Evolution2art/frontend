import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import CategoryButtons from "../components/CategoryButtons"
import Contact from "../components/Contact"
import NextImage from "../components/Image"
import CMSContent from "../components/CMSContent"
import logoLight from "../public/Evolution2Art-logo-light.svg"
import logoDark from "../public/Evolution2Art-logo-dark.svg"
import { getCMSContent, getCategories, getCountries } from "../utils/api"
import { useEffect, useState } from "react"

const HomePage = ({
  categories,
  intro,
  about,
  contact,
  theme = "light",
  notifications,
}) => {
  const router = useRouter()
  const background =
    theme === "dark" ? intro.backgroundDark[0] : intro.background[0]
  const buttonClassNames = "uppercase px-4 py-2"

  const logo = theme !== "light" ? logoDark : logoLight
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    setTimeout(() => setScroll(true), router.asPath.startsWith("/#") ? 0 : 1000)
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
            src={logo}
            alt="home"
            className="logo opacity-70 drop-shadow"
            height={220}
            width={200}
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
            className="fill-screen-v p-8 dark:prose-invert"
          />
          <CategoryButtons
            categories={categories}
            path={router.asPath}
            size={12}
            curSize={12}
            theme={theme}
            className="mt-12 mb-10"
          />
          <div className="min-h-screen max-w-screen-md">
            <div className="flex pt-16">
              <CMSContent
                title={about.title}
                text={about.text}
                id="about"
                className="prose-stone w-full p-8 px-0 text-justify dark:prose-invert"
                titleClassName="mt-0"
                image={
                  <div className="float-left mr-4 mb-1 w-1/2 md:w-1/3">
                    <NextImage media={about.gallery[0]} />
                  </div>
                }
              />
            </div>
            <nav className="text mb-12 flex items-center justify-center">
              <Link href="/history">
                <a className={buttonClassNames}>Learn more about our work</a>
              </Link>
              <Link href="/press">
                <a className={buttonClassNames}>See what others have to say</a>
              </Link>
            </nav>
          </div>
        </main>
      </div>
      <Contact cms={contact} className="p-12 pt-24" />
    </>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  const countries = await getCountries()
  const [intro, about, contact] = await getCMSContent([
    "introduction",
    "about",
    "contact",
  ])
  return {
    props: { categories, countries, intro, about, contact },
    revalidate: 300,
  }
}

export default HomePage
