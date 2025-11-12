import { submitContactForm } from '@/lib/supabase'

export async function POST(request) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return Response.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Submit to Supabase
    const result = await submitContactForm(formData)
    
    if (!result.success) {
      return Response.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return Response.json(
      { 
        message: 'Form submitted successfully',
        submissionId: result.data[0]?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}