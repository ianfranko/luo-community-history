import Link from 'next/link'

export default function DramaPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luo Drama & Performing Arts
            </h1>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/Drama" className="btn btn-primary">
                COMING SOON
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
