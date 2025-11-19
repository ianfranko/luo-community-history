export default function GalleryPage() {
  const mediaItems = [
    {
      type: 'image',
      src: '/hero.jpeg',
      title: 'Lake Victoria Sunrise',
      location: 'Kisumu, Kenya',
      description: 'Fishermen preparing their nets along the shoreline.'
    },
    {
      type: 'video',
      src: 'https://storage.googleapis.com/luo-community-assets/videos/cultural-dance.mp4',
      poster: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
      title: 'Traditional Dance',
      location: 'Homa Bay',
      description: 'Evening performance featuring nyatiti and drum ensembles.'
    },
    {
      type: 'image',
      src: '/Guerrier_Luo.jpeg',
      title: 'Community Warriors',
      location: 'Siaya County',
      description: 'Historical portrait celebrating bravery and unity.'
    },
    {
      type: 'image',
      src: '/Kenia-Lake_Victoria-Fischer.webp',
      title: 'Daily Catch',
      location: 'Lake Victoria',
      description: 'Fishing boats returning with tilapia and nile perch.'
    },
    {
      type: 'video',
      src: 'https://storage.googleapis.com/luo-community-assets/videos/youth-tournament.mp4',
      poster: '/fishinf at the lake.avif',
      title: 'Youth Tournament Highlights',
      location: 'Migori',
      description: 'Clips from the annual U10 football finals.'
    },
    {
      type: 'image',
      src: '/images (1).jpeg',
      title: 'Storytelling Circle',
      location: 'Nairobi',
      description: 'Elders sharing folk tales with the diaspora community.'
    },
    {
      type: 'image',
      src: '/657152Ew0bLSIn.jpg',
      title: 'Craftswomen at Work',
      location: 'Bondo',
      description: 'Beadwork session focused on traditional regalia.'
    },
    {
      type: 'video',
      src: 'https://storage.googleapis.com/luo-community-assets/videos/scholars.mp4',
      poster: '/Guerrier_Luo.jpeg',
      title: 'Scholarship Awards Recap',
      location: 'Nairobi',
      description: 'Highlights from the 2024 mentorship graduation.'
    }
  ]

  return (
    <main className="section">
      <div className="container">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-wide text-[var(--primary-color)]">
            Photo & Video Archive
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Community Gallery</h1>
          <p className="text-lg text-[var(--text-light)] max-w-3xl mx-auto">
            Browse a curated mix of photographs and short clips capturing Luo heritage,
            community milestones, and everyday life across the globe.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <article key={index} className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-[var(--background-muted)]">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <video
                    controls
                    poster={item.poster}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <span className="badge badge-secondary" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {item.type === 'image' ? 'Photo' : 'Video'}
                </span>
              </div>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-[var(--text-light)] text-sm mb-3">{item.location}</p>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
