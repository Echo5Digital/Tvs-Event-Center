export const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Elegant wedding reception setup with round tables and floral centerpieces',
    category: 'weddings',
    title: 'Wedding Reception',
    venue: 'Nile Hall'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Corporate event setup with modern stage and professional lighting',
    category: 'corporate',
    title: 'Corporate Conference',
    venue: 'Rhine Hall'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Birthday party celebration with colorful decorations and balloons',
    category: 'birthday',
    title: 'Birthday Celebration',
    venue: 'Congo Hall'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Beautiful outdoor garden party with string lights and natural setting',
    category: 'outdoor',
    title: 'Garden Party',
    venue: 'Courtyard'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Grand ballroom setup for large wedding with crystal chandeliers',
    category: 'weddings',
    title: 'Grand Wedding',
    venue: 'Full Hall'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Product launch event with modern display and branding elements',
    category: 'corporate',
    title: 'Product Launch',
    venue: 'Rhine Hall'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Traditional mehendi ceremony with colorful decorations and seating',
    category: 'mehendi',
    title: 'Mehendi Ceremony',
    venue: 'Congo Hall'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Elegant engagement ceremony with romantic lighting and floral arrangements',
    category: 'engagement',
    title: 'Engagement Ceremony',
    venue: 'Rhine Hall'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Religious ceremony setup with traditional elements and seating arrangement',
    category: 'religious',
    title: 'Religious Ceremony',
    venue: 'Nile Hall'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Conference seminar with professional stage and audience seating',
    category: 'corporate',
    title: 'Business Seminar',
    venue: 'Full Hall'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Outdoor wedding ceremony with natural backdrop and elegant setup',
    category: 'weddings',
    title: 'Outdoor Wedding',
    venue: 'Courtyard'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Festive celebration with vibrant decorations and entertainment setup',
    category: 'festival',
    title: 'Festival Celebration',
    venue: 'Full Hall'
  }
]

export const galleryCategories = [
  { id: 'all', name: 'All Events', count: galleryImages.length },
  { id: 'weddings', name: 'Weddings', count: galleryImages.filter(img => img.category === 'weddings').length },
  { id: 'corporate', name: 'Corporate', count: galleryImages.filter(img => img.category === 'corporate').length },
  { id: 'birthday', name: 'Birthdays', count: galleryImages.filter(img => img.category === 'birthday').length },
  { id: 'outdoor', name: 'Outdoor Events', count: galleryImages.filter(img => img.category === 'outdoor').length },
  { id: 'religious', name: 'Religious', count: galleryImages.filter(img => img.category === 'religious').length }
]