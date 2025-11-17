import { updateSubmissionStatus, deleteContactSubmission } from '@/lib/supabase'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
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

// DELETE - Delete individual submission
export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    console.log('DELETE request for ID:', id)

    if (!id) {
      return Response.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const result = await deleteContactSubmission(id)
    
    console.log('Delete result:', result)
    
    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: result.error === 'Submission not found' ? 404 : 500 }
      )
    }

    return Response.json(
      { message: 'Submission deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('DELETE Error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}