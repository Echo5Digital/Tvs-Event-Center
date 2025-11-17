import { NextResponse } from 'next/server';
import { getContactSubmissions, deleteContactSubmission } from '@/lib/supabase';

// GET - Fetch all contact submissions for admin
export async function GET() {
  try {
    const result = await getContactSubmissions();
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// DELETE - Delete individual contact submission
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('DELETE request for contact ID:', id);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteContactSubmission(id);
    
    console.log('Delete result:', result);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === 'Submission not found' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}