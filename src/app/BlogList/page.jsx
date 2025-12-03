'use client';
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react'

export default function BlogsList() {
    const featuredPost = {
        title: 'The Evolution of Luo Benga Music',
        excerpt: 'Trace the rhythmic journey of Benga from its roots in traditional nyatiti music to the electric guitar-driven sounds that conquered East Africa and the world.',
        author: 'Dr. James Ochieng',
        date: '2024-02-28',
        readTime: '8 min read',
        category: 'Music & Arts',
        image: '/hero.jpeg', // Using existing image from home page as placeholder
        slug: 'evolution-of-benga',
        externalLink: 'https://luoleagueofnations.com/Blogs/understanding-luo-benga-the-rhythm-that-shaped-a-people/'
    }

    const blogPosts = [
        {
            title: 'Preserving Oral Traditions in the Digital Age',
            excerpt: 'How modern technology is helping us record, archive, and share the wisdom of our elders for future generations.',
            author: 'Achieng Odhiambo',
            date: '2024-02-25',
            readTime: '5 min read',
            category: 'Technology',
            image: '/Fishermen-on-Lake-Victoria-in-Uganda.webp',
            slug: 'preserving-oral-traditions',
            externalLink: 'https://www.example.com/preserving-oral-traditions'
        },
        {
            title: 'Culinary Heritage: Beyond Fish and Ugali',
            excerpt: 'Exploring the diverse and nutritious traditional dishes that have sustained the Luo community for centuries.',
            author: 'Chef Akinyi',
            date: '2024-02-20',
            readTime: '6 min read',
            category: 'Food & Culture',
            image: '/Kenia-Lake_Victoria-Fischer.webp',
            slug: 'culinary-heritage',
            externalLink: 'https://www.example.com/culinary-heritage'
        },
        {
            title: 'The Significance of Naming Ceremonies',
            excerpt: 'Understanding the deep cultural meaning behind Luo naming customs and how they connect us to our ancestors.',
            author: 'Elder Omondi',
            date: '2024-02-15',
            readTime: '7 min read',
            category: 'Traditions',
            image: '/Guerrier_Luo.jpeg',
            slug: 'naming-ceremonies',
            externalLink: 'https://www.example.com/naming-ceremonies'
        },
        {
            title: 'Luo Architecture: From Traditional Homesteads to Modern Homes',
            excerpt: 'A look at how traditional building styles and spatial organizations influence modern Luo architectural designs.',
            author: 'Arch. Otieno',
            date: '2024-02-10',
            readTime: '5 min read',
            category: 'Architecture',
            image: '/Kodhek Argwins.png',
            slug: 'luo-architecture',
            externalLink: 'https://www.example.com/luo-architecture'
        },
        {
            title: 'Fishing on Lake Victoria: A Changing Livelihood',
            excerpt: 'The economic and cultural shifts in the fishing industry and what it means for lakeside communities today.',
            author: 'Peter Owino',
            date: '2024-02-05',
            readTime: '6 min read',
            category: 'Economy',
            image: '/657152Ew0bLSIn.jpg',
            slug: 'fishing-livelihoods',
            externalLink: 'https://www.example.com/fishing-livelihoods'
        },
        {
            title: 'Legends of Luanda Magere',
            excerpt: 'Revisiting the legendary tale of the invincible warrior and the lessons it holds for us today.',
            author: 'Storyteller Anyango',
            date: '2024-01-30',
            readTime: '4 min read',
            category: 'Folklore',
            image: '/hero.jpeg',
            slug: 'legends-luanda-magere',
            externalLink: 'https://www.example.com/legends-luanda-magere'
        }
    ]

    const categories = [
        'All', 'History', 'Culture', 'Music & Arts', 'Traditions', 'Folklore'
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Community Voices & Stories
                        </h1>
                        <p className="text-xl mb-8" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
                            Dive into a collection of articles, stories, and insights exploring the rich tapestry of Luo history, culture, and modern life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post Section */}
            <section className="section bg-white" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', minHeight: '300px' }}>
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                                <span style={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase'
                                }}>
                                    Featured
                                </span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                                    {featuredPost.category}
                                </span>
                            </div>
                            <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                {featuredPost.title}
                            </h2>
                            <p className="card-text" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                {featuredPost.excerpt}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: 'auto', fontSize: '0.875rem', color: 'var(--muted)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={16} />
                                    <span>{featuredPost.author}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                            </div>
                            {featuredPost.externalLink ? (
                                <a href={featuredPost.externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
                                    Read Article
                                    <ArrowRight size={16} />
                                </a>
                            ) : (
                                <Link href={`/blogs/${featuredPost.slug}`} className="btn btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
                                    Read Article
                                    <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Latest Articles</h2>

                        {/* Simple Category Filter */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.875rem',
                                        borderColor: index === 0 ? 'transparent' : 'var(--border-color)'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <article key={index} className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        left: '1rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        color: 'var(--text-dark)'
                                    }}>
                                        {post.category}
                                    </div>
                                </div>

                                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                                        <Calendar size={14} />
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <Clock size={14} />
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                                        {post.title}
                                    </h3>

                                    <p className="card-text" style={{ marginBottom: '1.5rem', flex: 1 }}>
                                        {post.excerpt}
                                    </p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                                            <User size={16} color="var(--primary-color)" />
                                            <span>{post.author}</span>
                                        </div>
                                        {post.externalLink ? (
                                            <a href={post.externalLink} target="_blank" rel="noopener noreferrer" style={{
                                                color: 'var(--primary-color)',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                Read
                                                <ArrowRight size={16} />
                                            </a>
                                        ) : (
                                            <Link href={`/blogs/${post.slug}`} style={{
                                                color: 'var(--primary-color)',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                Read
                                                <ArrowRight size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                        <button className="btn btn-outline">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="section bg-gradient" style={{ color: 'white' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 className="section-title" style={{ color: 'white', textAlign: 'left', marginBottom: '1rem' }}>
                                Share Your Story
                            </h2>
                            <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'left', margin: 0, maxWidth: '500px' }}>
                                Do you have a piece of history, a family legend, or a cultural insight to share? Contribute to our community blog and help preserve our heritage.
                            </p>
                            <div style={{ marginTop: '2rem' }}>
                                <Link href="/contact" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary-color)', borderColor: 'white' }}>
                                    Start Writing
                                    <BookOpen size={18} />
                                </Link>
                            </div>
                        </div>

                        <div className="cta-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Subscribe to Updates</h3>
                            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
                                Get the latest stories, event announcements, and cultural insights delivered straight to your inbox.
                            </p>
                            <form style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        outline: 'none',
                                        width: '100%'
                                    }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
