import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    
    const post = await prisma.blogPost.findUnique({
      where: { 
        slug,
        status: 'published'
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Parse JSON fields and calculate read time
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    const postWithParsedFields = {
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
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      canonicalUrl: post.canonicalUrl,
      ogTitle: post.ogTitle,
      ogDescription: post.ogDescription,
      ogImage: post.ogImage,
      twitterTitle: post.twitterTitle,
      twitterDescription: post.twitterDescription,
      twitterImage: post.twitterImage,
      jsonLd: post.jsonLd,
      featured: post.featured,
      publishedAt: post.publishedAt?.toISOString(),
      createdAt: post.createdAt.toISOString(),
      readTime
    }

    return NextResponse.json(postWithParsedFields)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}