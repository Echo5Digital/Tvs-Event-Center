import { getContactSubmissions, getSubmissionStats } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'stats') {
      const result = await getSubmissionStats()
      
      if (!result.success) {
        return Response.json(
          { error: result.error },
          { status: 500 }
        )
      }

      return Response.json(result.stats, { status: 200 })
    }

    // Get submissions with filters
    const filters = {
      status: searchParams.get('status'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate')
    }

    const result = await getContactSubmissions(filters)
    
    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return Response.json(result.data, { status: 200 })

  } catch (error) {
    console.error('Admin API Error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}