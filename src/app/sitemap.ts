import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.luoleagueofnations.com'

// Public, indexable routes. Authenticated areas (/my-tree, /login, /register)
// are intentionally excluded — see robots.ts.
const routes = [
  '/',
  '/about',
  '/family-tree',
  '/people',
  '/events',
  '/culture',
  '/places',
  '/Gallery',
  '/BlogList',
  '/shop',
  '/games',
  '/library',
  '/mentorship',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
