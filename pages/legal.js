import { getCMSContent } from "../utils/api"
import CMSContent from "../components/CMSContent"

const LegalPage = ({ legal, theme }) => {
  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent text={legal.privacy} />
      <CMSContent text={legal.termsConditions} />
      <CMSContent text={legal.returnRefund} />
    </div>
  )
}

export async function getStaticProps() {
  const legal = await getCMSContent("legal")
  return {
    props: { legal },
    revalidate: 300,
  }
}

export default LegalPage
