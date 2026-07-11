import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.luoleagueofnations.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep private/authenticated areas out of search results.
      disallow: ['/my-tree', '/login', '/register', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
