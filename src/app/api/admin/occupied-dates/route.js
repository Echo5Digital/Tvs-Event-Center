import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// GET - Fetch all occupied dates
export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ 
        error: 'Supabase configuration missing',
        details: 'Please check your environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY'
      }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('occupied_dates')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      
      // Check if the error is due to table not existing
      if (error.code === 'PGRST116' || error.message?.includes('relation "occupied_dates" does not exist')) {
        return NextResponse.json({ 
          error: 'Database table not found. Please run the SQL setup script in Supabase.',
          details: 'Table "occupied_dates" does not exist. Check CALENDAR-README.md for setup instructions.',
          setupRequired: true
        }, { status: 404 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to fetch occupied dates',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({ dates: data || [] }, { status: 200 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message
    }, { status: 500 })
  }
}

// POST - Add occupied date
export async function POST(request) {
  try {
    const { date } = await request.json()

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    // Check if date already exists
    const { data: existing } = await supabase
      .from('occupied_dates')
      .select('id')
      .eq('date', date)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Date is already marked as occupied' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('occupied_dates')
      .insert([{ date }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to add occupied date' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Date marked as occupied successfully',
      data 
    }, { status: 201 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove occupied date
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('occupied_dates')
      .delete()
      .eq('date', date)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to remove occupied date' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Occupied date removed successfully' 
    }, { status: 200 })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}