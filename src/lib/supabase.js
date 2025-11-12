import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  })
  // Don't throw error during build, handle gracefully
  if (typeof window === 'undefined') {
    console.warn('Supabase client initialization skipped during build')
  }
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper function to submit contact form
export async function submitContactForm(formData) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guest_count: parseInt(formData.guestCount) || null,
          budget_range: formData.budgetRange,
          message: formData.message,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error: error.message }
  }
}

// Helper function to get all submissions (for admin)
export async function getContactSubmissions(filters = {}) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters if provided
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }
    
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }
    
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return { success: false, error: error.message }
  }
}

// Helper function to update submission status
export async function updateSubmissionStatus(id, status) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error updating status:', error)
    return { success: false, error: error.message }
  }
}

// Helper function to get submission statistics
export async function getSubmissionStats() {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('status, created_at')

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Calculate statistics
    const total = data.length
    const newSubmissions = data.filter(item => item.status === 'new').length
    const contacted = data.filter(item => item.status === 'contacted').length
    const converted = data.filter(item => item.status === 'converted').length

    // Get submissions from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentSubmissions = data.filter(
      item => new Date(item.created_at) >= thirtyDaysAgo
    ).length

    return {
      success: true,
      stats: {
        total,
        new: newSubmissions,
        contacted,
        converted,
        recent: recentSubmissions
      }
    }
  } catch (error) {
    console.error('Error getting stats:', error)
    return { success: false, error: error.message }
  }
}