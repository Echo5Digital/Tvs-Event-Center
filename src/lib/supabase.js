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
      // Convert date to start of day in UTC
      const startDate = new Date(filters.startDate + 'T00:00:00')
      query = query.gte('created_at', startDate.toISOString())
    }
    
    if (filters.endDate) {
      // Convert date to end of day in UTC
      const endDate = new Date(filters.endDate + 'T23:59:59.999')
      query = query.lte('created_at', endDate.toISOString())
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

// Helper function to delete a contact submission
export async function deleteContactSubmission(id) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    console.log('Attempting to delete submission with ID:', id)

    // First check if the submission exists
    const { data: existingSubmission, error: checkError } = await supabase
      .from('contact_submissions')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError) {
      console.error('Error checking submission:', checkError)
      if (checkError.code === 'PGRST116') {
        return { success: false, error: 'Submission not found' }
      }
      throw checkError
    }

    if (!existingSubmission) {
      return { success: false, error: 'Submission not found' }
    }

    // Now delete the submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase delete error:', error)
      throw error
    }

    console.log('Delete successful:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error deleting submission:', error)
    return { success: false, error: error.message }
  }
}