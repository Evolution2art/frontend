export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"
  }${path}`
}

export function getSecureURL(path) {
  return `${
    process.env.NEXT_PUBLIC_SECURE_URL || "http://localhost:1339"
  }${path}`
}

export function flattenAPIData(result) {
  // console.log("flattenAPIData for result", result)
  if (
    result === null ||
    typeof result.data === "undefined" ||
    typeof result.data !== "object"
  ) {
    return result
  }
  if (result.data === null && !result?.id) {
    return null
  }
  // return null if result is empty data structure
  // if data is single relation, it is an object, else an array of objects
  if (Array.isArray(result.data)) {
    return result.data.map((_result) => {
      const { id, attributes } = _result
      if (!id) {
        return null
      }
      if (!attributes) {
        return { id }
      }
      return {
        id,
        ...Object.keys(attributes).reduce((carry, val) => {
          carry = { ...carry, [val]: flattenAPIData(attributes[val]) }
          return carry
        }, {}),
      }
    })
  }
  const { id, attributes } = result.data
  if (!id) {
    return null
  }
  if (!attributes) {
    return { id }
  }
  return {
    id,
    ...Object.keys(attributes).reduce((carry, val) => {
      carry = { ...carry, [val]: flattenAPIData(attributes[val]) }
      return carry
    }, {}),
  }
}

export function getFossilUrl(slug) {
  return `/fossils/${slug}`
}

export async function loginAPI() {
  // console.log()
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, options = {}, secure = false) {
  // Object.assign(options, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_PUBLIC_TOKEN}`,
  //     ...options.headers,
  //   },
  // })
  const requestUrl = secure
    ? getSecureURL(`/${path}`)
    : getStrapiURL(`/${path}`)
  const response = await fetch(requestUrl, options)
  const data = await response.json()
  // console.log(
  //   `Called fetchAPI with path "${path}" => url: "${requestUrl}"`,
  //   data
  // )
  return flattenAPIData(data)
}

export async function getCountries() {
  const countries = await fetchAPI("countries?_sort=name")
  // console.log(`Called fetchAPI for "countries" with data`, countries)
  return countries
}

export async function getRates() {
  const rates = await fetchAPI("rates?populate=destination,package")
  // console.log(`Called fetchAPI for "rates" with data`, rates)
  const destinations = await fetchAPI("destinations?populate=countries")
  // console.log(`Called fetchAPI for "destinations" with data`, destinations)

  return rates.map((rate) => {
    return {
      ...rate,
      countries: destinations
        .find((_dest) => rate.destination.id === _dest.id)
        ?.countries.map((_country) => _country.iso),
    }
  })
}

export async function getMails(fossil) {
  function fill(text) {
    if (typeof text !== "string") {
      return text
    }
    return text?.replace(/{\w+\.(\w+)}/g, (_, val) => fossil[val])
  }
  const mails = await fetchAPI("mail-template?populate=*")
  // replace placeholders with fossil values
  if (fossil) {
    let result = {}
    for (const i in mails) {
      if (typeof mails[i] === "object") {
        result[i] = {}
        for (const j in mails[i]) {
          result[i][j] = fill(mails[i][j])
        }
      }
    }
    return result
  }
  return mails
}

export async function getCategories() {
  const categories = await fetchAPI("categories?populate=*")
  return categories
}

export async function getCategory(slug) {
  const categories = await fetchAPI(
    `categories?populate=icon,iconDark&filters[slug]=${slug}`
  )
  if (!Array.isArray(categories) || !categories.length) {
    return null
  }
  const category = categories.shift()

  return { ...category, fossils: await getFossilsByCategory(category.id) }
}

export async function getFossils() {
  const fossils = await fetchAPI("fossils?populate=gallery,image")
  return fossils
}

export async function getFossilsByCategory(id) {
  const fossils = await fetchAPI(
    `fossils?populate=gallery,image&filters[category]=${id}`
  )
  return fossils
}

export async function getFossil(slug) {
  const fossil = await fetchAPI(`fossils?populate=*&filters[slug]=${slug}`)
  if (!Array.isArray(fossil) || !fossil.length) {
    return null
  }
  return { ...fossil.shift(), url: getFossilUrl(slug) }
}

export async function getAchievements() {
  const achievements = await fetchAPI("achievements?populate=*")
  // console.log("Got achievements", achievements)
  return achievements
}

export async function getMedia() {
  const medias = await fetchAPI("medias?populate=*")
  return medias
}

export async function getPress() {
  const press = await fetchAPI("press?populate=*")
  return press
}

export async function getNewFossils() {
  const now = new Date()
  const fossils = await fetchAPI(
    "fossils?populate=*&filters[new][$gte]=" +
      now.toISOString().substring(0, 10)
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
    const cms = await fetchAPI(`${types[i]}?populate=*`)

    // return plain object if single type
    if (types.length === 1) {
      return cms
    }

    content.push(cms)
  }
  return content
}
