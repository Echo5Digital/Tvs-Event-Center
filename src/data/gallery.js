export const galleryImages = [
  {
    id: 1,
    src: '/images/tvevent34.jpg',
    alt: 'Elegant wedding reception setup with round tables and floral centerpieces',
    category: 'weddings',
    title: 'Wedding Reception',
    venue: 'Nile Hall'
  },
  {
    id: 2,
    src: '/images/tvevent35.jpg',
    alt: 'Corporate event setup with modern stage and professional lighting',
    category: 'corporate',
    title: 'Corporate Conference',
    venue: 'Rhine Hall'
  },
  {
    id: 3,
    src: '/images/tvevent36.jpg',
    alt: 'Birthday party celebration with colorful decorations and balloons',
    category: 'birthday',
    title: 'Birthday Celebration',
    venue: 'Congo Hall'
  },
  {
    id: 4,
    src: '/images/tvevent34.jpg',
    alt: 'Beautiful outdoor garden party with string lights and natural setting',
    category: 'outdoor',
    title: 'Garden Party',
    venue: 'Courtyard'
  },
  {
    id: 5,
    src: '/images/tvevent35.jpg',
    alt: 'Grand ballroom setup for large wedding with crystal chandeliers',
    category: 'weddings',
    title: 'Grand Wedding',
    venue: 'Full Hall'
  },
  {
    id: 6,
    src: '/images/tvevent36.jpg',
    alt: 'Product launch event with modern display and branding elements',
    category: 'corporate',
    title: 'Product Launch',
    venue: 'Rhine Hall'
  },
  {
    id: 7,
    src: '/images/tvevent34.jpg',
    alt: 'Traditional Reunions ceremony with colorful decorations and seating',
    category: 'Reunions',
    title: 'Reunions ',
    venue: 'Congo Hall'
  },
  {
    id: 8,
    src: '/images/tvevent35.jpg',
    alt: 'Elegant engagement ceremony with romantic lighting and floral arrangements',
    category: 'engagement',
    title: 'Engagement Ceremony',
    venue: 'Rhine Hall'
  },
  {
    id: 9,
    src: '/images/tvevent36.jpg',
    alt: 'Religious ceremony setup with traditional elements and seating arrangement',
    category: 'religious',
    title: 'Religious Ceremony',
    venue: 'Nile Hall'
  },
  {
    id: 10,
    src: '/images/tvevent34.jpg',
    alt: 'Conference seminar with professional stage and audience seating',
    category: 'corporate',
    title: 'Business Seminar',
    venue: 'Full Hall'
  },
  {
    id: 11,
    src: '/images/tvevent35.jpg',
    alt: 'Outdoor wedding ceremony with natural backdrop and elegant setup',
    category: 'weddings',
    title: 'Outdoor Wedding',
    venue: 'Courtyard'
  },
  {
    id: 12,
    src: '/images/tvevent36.jpg',
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