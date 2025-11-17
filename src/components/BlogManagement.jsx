'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RichTextEditor from './RichTextEditor'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Upload,
  Tag,
  Globe,
  Calendar,
  Star,
  Filter,
  Search
} from 'lucide-react'

const BlogManagement = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: ''
  })

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorRole: '',
    category: '',
    tags: [],
    featuredImage: '',
    images: [],
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    jsonLd: '',
    status: 'draft',
    featured: false
  })

  const [activeTab, setActiveTab] = useState('content') // content, seo, settings
  const [uploading, setUploading] = useState(false)

  // Categories for dropdown
  const categories = [
    'Wedding Planning',
    'Corporate Events', 
    'Party Planning',
    'Catering',
    'Photography',
    'Event Design',
    'Entertainment'
  ]

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/blog')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingPost ? '/api/admin/blog' : '/api/admin/blog'
      const method = editingPost ? 'PUT' : 'POST'
      const payload = editingPost ? { ...formData, id: editingPost.id } : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        await fetchPosts()
        resetForm()
        setShowForm(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save blog post')
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      authorRole: '',
      category: '',
      tags: [],
      featuredImage: '',
      images: [],
      metaTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      jsonLd: '',
      status: 'draft',
      featured: false
    })
    setEditingPost(null)
    setActiveTab('content')
  }

  // Edit post
  const handleEdit = async (post) => {
    try {
      console.log('Editing post:', post.id)
      const response = await fetch(`/api/admin/blog/${post.id}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched post data:', data)
        
        setFormData({
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          author: data.author || '',
          authorRole: data.authorRole || data.author_role || '',
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(tag => tag.trim()) : []),
          featuredImage: data.featuredImage || data.featured_image || '',
          images: Array.isArray(data.images) ? data.images : [],
          metaTitle: data.metaTitle || data.meta_title || '',
          metaDescription: data.metaDescription || data.meta_description || '',
          canonicalUrl: data.canonicalUrl || data.canonical_url || '',
          ogTitle: data.ogTitle || data.og_title || '',
          ogDescription: data.ogDescription || data.og_description || '',
          ogImage: data.ogImage || data.og_image || '',
          twitterTitle: data.twitterTitle || data.twitter_title || '',
          twitterDescription: data.twitterDescription || data.twitter_description || '',
          twitterImage: data.twitterImage || data.twitter_image || '',
          jsonLd: data.jsonLd || data.json_ld || '',
          status: data.status || 'draft',
          featured: data.featured || false
        })
        setEditingPost(data)
        setShowForm(true)
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch post:', errorData)
        alert(`Failed to load post for editing: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error fetching post for edit:', error)
      alert(`Error loading post for editing: ${error.message}`)
    }
  }

  // Delete post
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchPosts()
      } else {
        alert('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete blog post')
    }
  }

  // Update post status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        await fetchPosts()
      } else {
        alert('Failed to update post status')
      }
    } catch (error) {
      console.error('Error updating post status:', error)
      alert('Failed to update post status')
    }
  }

  // Handle image upload
  const handleImageUpload = async (file, field) => {
    console.log('Starting image upload for field:', field, 'File:', file.name)
    setUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      console.log('Upload response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Upload success, data:', data)
        setFormData(prev => ({
          ...prev,
          [field]: data.url
        }))
        alert('Image uploaded successfully!')
      } else {
        const errorData = await response.json()
        console.error('Upload failed:', errorData)
        alert(`Upload failed: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(`Upload error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  // Handle tag input
  const handleTagsInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const tag = e.target.value.trim()
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }))
        e.target.value = ''
      }
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesStatus = filters.status === 'all' || post.status === filters.status
    const matchesCategory = filters.category === 'all' || post.category === filters.category
    const matchesSearch = !filters.search || 
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.author.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchesStatus && matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Manage your blog posts, SEO, and content</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {!showForm ? (
        <>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No blog posts found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {post.featuredImage && (
                              <img 
                                src={post.featuredImage} 
                                alt="" 
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                            )}
                            <div>
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {post.title}
                                </div>
                                {post.featured && (
                                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800'
                              : post.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {/* Status Dropdown */}
                            <select
                              value={post.status}
                              onChange={(e) => handleStatusChange(post.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                              <option value="archived">Archived</option>
                            </select>
                            
                            {/* Action Buttons */}
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-amber-600 hover:text-amber-900 p-1"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Blog Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'content', label: 'Content', icon: Edit3 },
                  { id: 'seo', label: 'SEO & Meta', icon: Globe },
                  { id: 'settings', label: 'Settings', icon: Tag }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter blog post title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Brief description of the blog post"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image *
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Image URL or upload below"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'featuredImage')}
                        className="hidden"
                      />
                      <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </div>
                    </label>
                  </div>
                  {formData.featuredImage && (
                    <img 
                      src={formData.featuredImage} 
                      alt="Featured" 
                      className="mt-2 w-32 h-20 object-cover rounded"
                    />
                  )}
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Role
                    </label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorRole: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="e.g., Event Coordinator"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    onKeyDown={handleTagsInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Type tags and press Enter or comma"
                  />
                  {formData.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-amber-600 hover:text-amber-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">SEO Settings</h4>
                  <p className="text-sm text-blue-700">
                    Optimize your blog post for search engines and social media sharing.
                  </p>
                </div>

                {/* Meta Title & Description */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="SEO title (leave empty to use post title)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Brief description for search results"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                  </div>
                </div>

                {/* Open Graph */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Open Graph (Facebook)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Title
                      </label>
                      <input
                        type="text"
                        value={formData.ogTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Title for social media sharing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                      </label>
                      <textarea
                        value={formData.ogDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, ogDescription: e.target.value }))}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Description for social media sharing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Image
                      </label>
                      <input
                        type="text"
                        value={formData.ogImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Image URL for social media sharing"
                      />
                    </div>
                  </div>
                </div>

                {/* Twitter */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Twitter Card</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Title
                      </label>
                      <input
                        type="text"
                        value={formData.twitterTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitterTitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Title for Twitter sharing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Description
                      </label>
                      <textarea
                        value={formData.twitterDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitterDescription: e.target.value }))}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Description for Twitter sharing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Image
                      </label>
                      <input
                        type="text"
                        value={formData.twitterImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, twitterImage: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Image URL for Twitter sharing"
                      />
                    </div>
                  </div>
                </div>

                {/* JSON-LD */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Structured Data (JSON-LD)</h4>
                  <textarea
                    value={formData.jsonLd}
                    onChange={(e) => setFormData(prev => ({ ...prev, jsonLd: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
                    placeholder='{"@context": "https://schema.org", "@type": "Article", ...}'
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add structured data in JSON-LD format for rich snippets
                  </p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Publishing Settings</h4>
                  <p className="text-sm text-gray-700">
                    Control the visibility and status of your blog post.
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured Post
                  </label>
                  <p className="ml-2 text-xs text-gray-500">
                    Show this post in featured sections
                  </p>
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="https://tvseventcenter.com/blog/post-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use the default URL
                  </p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="submit"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}

export default BlogManagement