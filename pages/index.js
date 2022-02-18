import Head from "next/head"
import FossilsList from "../components/FossilsList"
import { getFossils } from "../utils/api"

const HomePage = ({ fossils }) => {
  return (
    <div>
      <Head>
        <title>Strapi Next.js E-commerce</title>
      </Head>
      <FossilsList fossils={fossils} />
    </div>
  )
}

export async function getStaticProps() {
  const fossils = await getFossils()
  return { props: { fossils } }
}

export default HomePage
