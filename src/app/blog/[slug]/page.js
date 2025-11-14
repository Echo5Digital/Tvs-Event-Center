import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedPosts from '@/components/RelatedPosts'
import BlogPostClient from '@/components/BlogPostClient'

async function getPost(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: 'no-store'
    })
    
    console.log('Fetching from:', `${baseUrl}/api/blog/${slug}`)
    console.log('Response status:', response.status)
    
    if (!response.ok) {
      console.error('Response not ok:', response.status, response.statusText)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(category, currentPostId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/blog?category=${encodeURIComponent(category)}&limit=3`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      return []
    }
    const posts = await response.json()
    return posts.filter(post => post.id !== currentPostId).slice(0, 3)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

async function getAllPostSlugs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/blog?limit=1000`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      return []
    }
    const posts = await response.json()
    return posts.map(post => ({ slug: post.slug }))
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.category, post.id)

  return (
    <>
      <Navbar />
      <main>
        <BlogPostClient post={post} relatedPosts={relatedPosts} />
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
        )}
      </main>
      <Footer />
    </>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | TVS Event Center Blog',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.metaTitle || `${post.title} | TVS Event Center Blog`,
    description: post.metaDescription || post.excerpt,
    canonical: post.canonicalUrl,
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      images: [post.ogImage || post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitterTitle || post.title,
      description: post.twitterDescription || post.excerpt,
      images: [post.twitterImage || post.featuredImage],
    },
  }
}