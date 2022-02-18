export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const categories = await fetchAPI("/categories");
  return categories;
}

export async function getCategory(slug) {
  const categories = await fetchAPI(`/categories?slug=${slug}`);
  return categories?.[0];
}

export async function getFossils() {
  const fossils = await fetchAPI("/fossils");
  return fossils;
}

export async function getFossil(slug) {
  const fossils = await fetchAPI(`/fossils?slug=${slug}`);
  return fossils?.[0];
}
