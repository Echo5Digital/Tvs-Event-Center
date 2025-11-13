import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET - Fetch published blog posts for public consumption
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit')) || 50

    let where = {
      status: 'published'
    }
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } }
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: limit
    })

    // Parse JSON fields and calculate read time
    const postsWithParsedFields = posts.map(post => {
      const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200) // Average reading speed

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        authorRole: post.authorRole,
        category: post.category,
        tags: post.tags ? JSON.parse(post.tags) : [],
        featuredImage: post.featuredImage,
        images: post.images ? JSON.parse(post.images) : [],
        featured: post.featured,
        publishedAt: post.publishedAt?.toISOString(),
        createdAt: post.createdAt.toISOString(),
        readTime
      }
    })

    return NextResponse.json(postsWithParsedFields)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}