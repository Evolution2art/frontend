import { getCMSContent } from "../utils/api"

const HistoryPage = () => null

export async function getStaticProps() {
  const [intro, about, contact] = await getCMSContent()
  return {
    props: { intro, about, contact },
    revalidate: 300,
  }
}

export default HistoryPage
