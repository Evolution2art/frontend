const HistoryPage = () => null

export async function getStaticProps() {
  const categories = await getCategories()
  const fossils = await getFossils()
  const [intro, about, contact] = await getCMSContent()
  return {
    props: { categories, fossils, intro, about, contact },
    revalidate: 300,
  }
}

export default HistoryPage
