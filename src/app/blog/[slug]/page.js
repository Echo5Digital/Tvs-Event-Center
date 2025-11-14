import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedPosts from '@/components/RelatedPosts'
import BlogPostClient from '@/components/BlogPostClient'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client (using anon key for public access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function getPost(slug) {
  try {
    console.log('Fetching blog post with slug:', slug)
    
    const { data: post, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !post) {
      console.error('Supabase error:', error)
      return null
    }

    // Calculate read time
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    // Format the post data to match the expected structure
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorRole: post.author_role,
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.featured_image,
      images: post.images || [],
      metaTitle: post.meta_title,
      metaDescription: post.meta_description,
      canonicalUrl: post.canonical_url,
      ogTitle: post.og_title,
      ogDescription: post.og_description,
      ogImage: post.og_image,
      twitterTitle: post.twitter_title,
      twitterDescription: post.twitter_description,
      twitterImage: post.twitter_image,
      jsonLd: post.json_ld,
      featured: post.featured,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      readTime
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(category, currentPostId) {
  try {
    const { data: posts, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, author, author_role, category, featured_image, published_at, created_at')
      .eq('status', 'published')
      .eq('category', category)
      .neq('id', currentPostId)
      .limit(3)

    if (error) {
      console.error('Error fetching related posts:', error)
      return []
    }

    return (posts || []).map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author,
      authorRole: post.author_role,
      category: post.category,
      featuredImage: post.featured_image,
      publishedAt: post.published_at,
      createdAt: post.created_at
    }))
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

async function getAllPostSlugs() {
  try {
    const { data: posts, error } = await supabase
      .from('blogs')
      .select('slug')
      .eq('status', 'published')

    if (error) {
      console.error('Error fetching post slugs:', error)
      return []
    }

    return (posts || []).map(post => ({ slug: post.slug }))
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