import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

// Create Supabase client with service role key (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// GET - Fetch all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit')) || 50

    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

// POST - Create new blog post
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }
    
    // Generate slug from title
    const slug = slugify(body.title, { lower: true, strict: true })
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existingPost) {
      return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        author_role: body.authorRole,
        category: body.category,
        tags: body.tags || [],
        featured_image: body.featuredImage,
        images: body.images || [],
        meta_title: body.metaTitle,
        meta_description: body.metaDescription,
        canonical_url: body.canonicalUrl,
        og_title: body.ogTitle,
        og_description: body.ogDescription,
        og_image: body.ogImage,
        twitter_title: body.twitterTitle,
        twitter_description: body.twitterDescription,
        twitter_image: body.twitterImage,
        json_ld: body.jsonLd,
        status: body.status || 'draft',
        featured: body.featured || false,
        published_at: body.status === 'published' ? new Date().toISOString() : null
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ 
      error: 'Failed to create blog post', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}

// PUT - Update blog post
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // If title is being updated, regenerate slug
    if (updateData.title) {
      const slug = slugify(updateData.title, { lower: true, strict: true })
      
      // Check if new slug conflicts with existing posts (excluding current post)
      const { data: existingPost } = await supabase
        .from('blogs')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single()
      
      if (existingPost) {
        return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 })
      }
      
      updateData.slug = slug
    }

    // Convert field names for Supabase
    const supabaseData = {
      ...updateData,
      author_role: updateData.authorRole,
      featured_image: updateData.featuredImage,
      meta_title: updateData.metaTitle,
      meta_description: updateData.metaDescription,
      canonical_url: updateData.canonicalUrl,
      og_title: updateData.ogTitle,
      og_description: updateData.ogDescription,
      og_image: updateData.ogImage,
      twitter_title: updateData.twitterTitle,
      twitter_description: updateData.twitterDescription,
      twitter_image: updateData.twitterImage,
      json_ld: updateData.jsonLd,
      published_at: updateData.status === 'published' ? new Date().toISOString() : updateData.published_at
    }

    // Remove old field names
    delete supabaseData.authorRole
    delete supabaseData.featuredImage
    delete supabaseData.metaTitle
    delete supabaseData.metaDescription
    delete supabaseData.canonicalUrl
    delete supabaseData.ogTitle
    delete supabaseData.ogDescription
    delete supabaseData.ogImage
    delete supabaseData.twitterTitle
    delete supabaseData.twitterDescription
    delete supabaseData.twitterImage
    delete supabaseData.jsonLd

    const { data, error } = await supabase
      .from('blogs')
      .update(supabaseData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

// DELETE - Delete blog post
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}