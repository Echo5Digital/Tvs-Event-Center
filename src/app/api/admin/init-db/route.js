import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

// Use globalThis to prevent multiple Prisma instances in development
const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// POST - Initialize database tables
export async function POST(request) {
  try {
    // This will create the tables if they don't exist
    // First, try to create a test blog post to trigger table creation
    console.log('Attempting to initialize database...')
    
    // Test database connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Try to query the blog posts table (this will create it if it doesn't exist)
    const existingPosts = await prisma.blogPost.findMany({
      take: 1
    })
    
    console.log('Blog posts table exists and is accessible')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      existingPosts: existingPosts.length
    })
    
  } catch (error) {
    console.error('Database initialization error:', error)
    
    // If tables don't exist, Prisma will throw an error
    // In production, we might need to run migrations manually
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      return NextResponse.json({ 
        error: 'Database tables need to be created. Please run: npx prisma db push',
        code: 'TABLES_NOT_FOUND'
      }, { status: 500 })
    }
    
    if (error.code === 'P1001') {
      return NextResponse.json({ 
        error: 'Cannot connect to database. Please check your DATABASE_URL environment variable.',
        code: 'CONNECTION_FAILED'
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Database initialization failed', 
      details: error.message,
      code: error.code
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// GET - Check database status
export async function GET() {
  try {
    await prisma.$connect()
    
    // Try to count blog posts
    const postCount = await prisma.blogPost.count()
    
    // Try to count contact submissions
    let submissionCount = 0
    try {
      submissionCount = await prisma.contactSubmission.count()
    } catch (e) {
      // Contact submissions table might not exist
      console.log('Contact submissions table not found')
    }
    
    return NextResponse.json({
      status: 'connected',
      blogPosts: postCount,
      contactSubmissions: submissionCount,
      database: 'operational'
    })
    
  } catch (error) {
    console.error('Database status check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error.message,
      code: error.code
    }, { status: 500 })
    
  } finally {
    await prisma.$disconnect()
  }
}