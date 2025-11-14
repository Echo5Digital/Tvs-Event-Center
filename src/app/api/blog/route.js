import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client (using anon key for public access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET - Fetch published blog posts for public consumption
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit')) || 50

    let query = supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,author.ilike.%${search}%`)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate read time and format data
    const postsWithParsedFields = (posts || []).map(post => {
      const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200) // Average reading speed

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
        featured: post.featured,
        publishedAt: post.published_at,
        createdAt: post.created_at,
        readTime
      }
    })

    return NextResponse.json(postsWithParsedFields)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}