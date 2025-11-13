export const blogPosts = [
  {
    id: 1,
    slug: 'planning-the-perfect-wedding-venue',
    title: 'Planning the Perfect Wedding Venue: A Complete Guide',
    excerpt: 'Discover essential tips for choosing the ideal wedding venue that will make your special day unforgettable. From layout considerations to catering options.',
    content: `
      <p>Your wedding day is one of the most important days of your life, and choosing the perfect venue sets the foundation for everything else. At TVS Event Center, we've helped countless couples create their dream weddings.</p>
      
      <h3>Key Factors to Consider</h3>
      <p>When selecting your wedding venue, consider these essential elements:</p>
      <ul>
        <li><strong>Guest Capacity:</strong> Ensure your venue can comfortably accommodate all your guests</li>
        <li><strong>Layout and Flow:</strong> The space should allow for natural movement between ceremony and reception areas</li>
        <li><strong>Catering Options:</strong> Whether you prefer in-house catering or external vendors</li>
        <li><strong>Photography Opportunities:</strong> Beautiful backdrops and good lighting for memorable photos</li>
        <li><strong>Parking and Accessibility:</strong> Convenient access for all your guests</li>
      </ul>
      
      <h3>Making Your Day Special</h3>
      <p>At TVS Event Center, our experienced team works with you to customize every detail. From elegant décor to seamless coordination, we ensure your wedding day exceeds your expectations.</p>
      
      <blockquote>"The perfect venue doesn't just host your wedding – it becomes part of your love story."</blockquote>
      
      <p>Ready to start planning your perfect day? Contact us to schedule a tour and see how TVS Event Center can bring your wedding vision to life.</p>
    `,
    author: 'Sarah Johnson',
    authorRole: 'Wedding Coordinator',
    publishedAt: '2024-11-01T10:00:00Z',
    category: 'Wedding Planning',
    tags: ['wedding', 'venue selection', 'planning tips'],
    featuredImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    readTime: 5,
    featured: true
  },
  {
    id: 2,
    slug: 'corporate-event-trends-2024',
    title: '2024 Corporate Event Trends: What\'s Hot This Year',
    excerpt: 'Stay ahead of the curve with the latest corporate event trends. From hybrid experiences to sustainable practices, discover what\'s shaping business events.',
    content: `
      <p>The corporate events landscape continues to evolve rapidly. As we move through 2024, several key trends are reshaping how businesses approach their events and gatherings.</p>
      
      <h3>Hybrid and Technology Integration</h3>
      <p>The future of corporate events is hybrid. Companies are successfully blending in-person and virtual experiences to:</p>
      <ul>
        <li>Expand their reach to global audiences</li>
        <li>Provide flexible attendance options</li>
        <li>Create more inclusive experiences</li>
        <li>Maximize ROI on event investments</li>
      </ul>
      
      <h3>Sustainability Focus</h3>
      <p>More companies are prioritizing eco-friendly practices in their events. This includes:</p>
      <ul>
        <li>Digital-first registration and materials</li>
        <li>Locally sourced catering options</li>
        <li>Reusable décor and materials</li>
        <li>Carbon offset programs</li>
      </ul>
      
      <h3>Experiential and Interactive Elements</h3>
      <p>Modern corporate events focus on engagement and experience rather than just information delivery. Popular elements include interactive workshops, networking games, and immersive technology demonstrations.</p>
      
      <p>At TVS Event Center, we help businesses implement these trends while maintaining professionalism and achieving their goals. Our flexible spaces and technology infrastructure support both traditional and innovative event formats.</p>
    `,
    author: 'Michael Rodriguez',
    authorRole: 'Corporate Events Manager',
    publishedAt: '2024-10-28T14:30:00Z',
    category: 'Corporate Events',
    tags: ['corporate', 'trends', 'business events'],
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    readTime: 4,
    featured: true
  },

]

// Blog categories for filtering
export const blogCategories = [
  { id: 'all', name: 'All Posts', slug: 'all' },
  { id: 'wedding', name: 'Wedding Planning', slug: 'wedding-planning' },
  { id: 'corporate', name: 'Corporate Events', slug: 'corporate-events' },
  { id: 'party', name: 'Party Planning', slug: 'party-planning' },
  { id: 'catering', name: 'Catering', slug: 'catering' },
  { id: 'photography', name: 'Photography', slug: 'photography' },
  { id: 'design', name: 'Event Design', slug: 'event-design' },
  { id: 'planning', name: 'Event Planning', slug: 'event-planning' },
  { id: 'entertainment', name: 'Entertainment', slug: 'entertainment' }
]

// Helper functions
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured)
export const getPostsByCategory = (category) => {
  if (category === 'all') return blogPosts
  return blogPosts.filter(post => post.category.toLowerCase().replace(/\s+/g, '-') === category)
}
export const getPostBySlug = (slug) => blogPosts.find(post => post.slug === slug)
export const getRelatedPosts = (currentPost, limit = 3) => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit)
}
export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}