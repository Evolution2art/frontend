export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()
  return data
}

export async function getCountries() {
  const countries = await fetchAPI("/countries?_sort=name")
  return countries
}

export async function getRates() {
  const rates = await fetchAPI("/rates")
  const destinations = await fetchAPI("/destinations")
  return rates.map((rate) => {
    return {
      ...rate,
      countries: destinations
        .find((_dest) => rate.destination.id === _dest.id)
        ?.countries.map((_country) => _country.country),
    }
  })
}

export async function getCategories() {
  const categories = await fetchAPI("/categories")
  return categories
}

export async function getCategory(slug) {
  const categories = await fetchAPI(`/categories?slug=${slug}`)
  return categories?.[0]
}

export async function getFossils() {
  const fossils = await fetchAPI("/fossils")
  return fossils
}

export async function getFossil(slug) {
  const fossils = await fetchAPI(`/fossils?slug=${slug}`)
  return fossils?.[0]
}

export async function getAchievements() {
  const achievements = await fetchAPI("/achievements")
  return achievements
}

export async function getMedia() {
  const medias = await fetchAPI("/medias")
  return medias
}

export async function getPress() {
  const press = await fetchAPI("/press")
  return press
}

export async function getNewFossils() {
  const now = new Date()
  const fossils = await fetchAPI(
    "/fossils?_where[new_gte]=" + now.toISOString().substr(0, 10)
  )
  return fossils
}

export async function getCMSContent(types) {
  if (!types) {
    types = ["introduction", "about", "contact", "history"]
  }
  if (!Array.isArray(types)) {
    types = [types]
  }
  const content = []
  for (let i = 0; i < types.length; i++) {
    const cms = await fetchAPI(`/${types[i]}`)

    // return plain object if single type
    if (types.length === 1) {
      return cms
    }

    content.push(cms)
  }
  return content
}
