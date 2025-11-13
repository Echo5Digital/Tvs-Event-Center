import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

// Use globalThis to prevent multiple Prisma instances in development
const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// GET - Fetch all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit')) || 50

    let where = {}
    
    if (status !== 'all') {
      where.status = status
    }
    
    if (category) {
      where.category = category
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return NextResponse.json(posts)
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
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    })
    
    if (existingPost) {
      return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        authorRole: body.authorRole,
        category: body.category,
        tags: JSON.stringify(body.tags || []),
        featuredImage: body.featuredImage,
        images: JSON.stringify(body.images || []),
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        canonicalUrl: body.canonicalUrl,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
        ogImage: body.ogImage,
        twitterTitle: body.twitterTitle,
        twitterDescription: body.twitterDescription,
        twitterImage: body.twitterImage,
        jsonLd: body.jsonLd,
        status: body.status || 'draft',
        featured: body.featured || false,
        publishedAt: body.status === 'published' ? new Date() : null
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating blog post:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    
    // More specific error messages
    if (error.code === 'P1001') {
      return NextResponse.json({ 
        error: 'Database connection failed. Please check your DATABASE_URL environment variable.' 
      }, { status: 500 })
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'A post with this title already exists.' 
      }, { status: 400 })
    }
    
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      return NextResponse.json({ 
        error: 'Database tables not initialized. Please run database migration.' 
      }, { status: 500 })
    }
    
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
      const existingPost = await prisma.blogPost.findFirst({
        where: { 
          slug,
          NOT: { id }
        }
      })
      
      if (existingPost) {
        return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 })
      }
      
      updateData.slug = slug
    }

    // Convert arrays to JSON strings
    if (updateData.tags) {
      updateData.tags = JSON.stringify(updateData.tags)
    }
    if (updateData.images) {
      updateData.images = JSON.stringify(updateData.images)
    }

    // Update publishedAt if status changes to published
    if (updateData.status === 'published') {
      const currentPost = await prisma.blogPost.findUnique({
        where: { id },
        select: { publishedAt: true }
      })
      
      if (!currentPost.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(post)
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

    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}