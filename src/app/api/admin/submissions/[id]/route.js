import { updateSubmissionStatus } from '@/lib/supabase'

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const { status } = await request.json()

    if (!status || !['new', 'contacted', 'converted', 'archived'].includes(status)) {
      return Response.json(
        { error: 'Invalid status. Must be: new, contacted, converted, or archived' },
        { status: 400 }
      )
    }

    const result = await updateSubmissionStatus(id, status)
    
    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return Response.json(
      { 
        message: 'Status updated successfully',
        data: result.data[0]
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Update API Error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}