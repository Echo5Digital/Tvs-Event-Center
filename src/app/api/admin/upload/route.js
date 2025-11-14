import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    console.log('Upload request received')
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    const formData = await request.formData()
    const file = formData.get('file')

    console.log('File received:', file ? file.name : 'No file')

    if (!file) {
      console.error('No file in form data')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.error('File too large:', file.size)
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop().toLowerCase()
    const filename = `blog-${timestamp}.${extension}`

    console.log('Uploading to Supabase Storage:', filename)

    // First, ensure the bucket exists and is properly configured
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    const blogImagesBucket = buckets?.find(bucket => bucket.name === 'blog-images')

    if (!blogImagesBucket) {
      console.log('Creating blog-images bucket...')
      const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      })

      if (bucketError) {
        console.error('Failed to create bucket:', bucketError)
        return NextResponse.json({ 
          error: 'Storage bucket creation failed', 
          details: bucketError.message 
        }, { status: 500 })
      }
    }

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json({ 
        error: 'Upload to storage failed', 
        details: error.message 
      }, { status: 500 })
    }    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename)

    const publicUrl = publicUrlData.publicUrl

    console.log('Upload successful, returning URL:', publicUrl)

    return NextResponse.json({ 
      url: publicUrl,
      filename: originalName,
      size: file.size,
      storageKey: filename
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json({ 
      error: 'Failed to upload file', 
      details: error.message 
    }, { status: 500 })
  }
}