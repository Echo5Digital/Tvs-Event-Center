import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client (using anon key for public access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const { data: post, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !post) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Calculate read time
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    const postWithParsedFields = {
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

    return NextResponse.json(postWithParsedFields)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}