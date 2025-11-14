import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client (using anon key for public access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET - Test endpoint to debug Supabase connection
export async function GET() {
  try {
    console.log('Testing Supabase connection...')
    console.log('SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Test basic connection
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, status')
      .limit(5)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        status: 'error',
        error: error.message,
        code: error.code,
        hasEnvVars: {
          url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      }, { status: 500 })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection working',
      posts: data,
      count: data?.length || 0,
      hasEnvVars: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    })

  } catch (error) {
    console.error('Test failed:', error)
    return NextResponse.json({
      status: 'error',
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}