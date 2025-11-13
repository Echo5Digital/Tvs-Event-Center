import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedPosts from '@/components/RelatedPosts'
import BlogPostClient from '@/components/BlogPostClient'
import { getPostBySlug, getRelatedPosts, blogPosts } from '@/data/blogPosts'

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)

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
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | TVS Event Center Blog',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | TVS Event Center Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}