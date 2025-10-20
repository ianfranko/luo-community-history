export const MOCK_ENABLED = process.env.MOCK_DATA === 'true'

export const mockUsers = [
  { id: 'u_1', name: 'Maria Achieng', email: 'maria@example.com', createdAt: new Date().toISOString(), _count: { contributions: 2 } },
  { id: 'u_2', name: 'John Ochieng', email: 'john@example.com', createdAt: new Date().toISOString(), _count: { contributions: 1 } },
]

export const mockArticles = [
  { id: 'a_1', slug: 'luo-naming-ceremonies', title: 'Luo Naming Ceremonies', content: '...', excerpt: 'About naming', categoryId: 'cat_1', featured: false, published: true, createdAt: new Date(), updatedAt: new Date(), tags: [], images: [], sources: [], category: { id: 'cat_1', name: 'Traditions', description: null, slug: 'traditions', createdAt: new Date(), updatedAt: new Date() } },
]

export const mockPeople = [
  { id: 'p_1', name: 'Odhiambo Onyango', title: 'Elder', biography: '', birthYear: 1940, deathYear: null, village: 'Kendu Bay', clan: 'Kawango', createdAt: new Date(), updatedAt: new Date() },
]

export const mockPlaces = [
  { id: 'pl_1', name: 'Kisumu City', description: 'City of the Lake', type: 'City', coordinates: '-0.0917,34.7681', county: 'Kisumu', createdAt: new Date(), updatedAt: new Date() },
]

export const mockEvents = [
  { id: 'e_1', title: 'Cultural Festival', description: 'Music and dance', date: new Date(), location: 'Kisumu', type: 'Festival', createdAt: new Date(), updatedAt: new Date() },
]

export const mockContributions = [
  { id: 'c_1', title: 'Traditional Marriage', content: 'Story...', type: 'story', status: 'approved', notes: null, createdAt: new Date(), updatedAt: new Date(), userId: 'u_1', user: { id: 'u_1', name: 'Maria Achieng', email: 'maria@example.com' } },
]

export const buildMockSearch = (q: string) => {
  const query = q.toLowerCase()
  const articles = mockArticles.filter(a => a.title.toLowerCase().includes(query))
  const people = mockPeople.filter(p => p.name.toLowerCase().includes(query))
  const places = mockPlaces.filter(p => p.name.toLowerCase().includes(query))
  const events = mockEvents.filter(e => e.title.toLowerCase().includes(query))
  const contributions = mockContributions.filter(c => c.title.toLowerCase().includes(query))
  const results = { articles, people, places, events, contributions }
  const totalResults = Object.values(results).reduce((sum, items) => sum + items.length, 0)
  return { query: q, results, totalResults }
}


