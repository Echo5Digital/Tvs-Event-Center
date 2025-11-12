export const services = [
  {
    id: 1,
    title: 'Wedding',
    slug: 'wedding',
    description: 'Create magical moments with our comprehensive wedding services. From intimate ceremonies to grand receptions, we make your special day unforgettable.',
    detailedDescription: 'Your wedding day should be everything you\'ve dreamed of and more. At TV Event Center, we specialize in creating magical moments that will be cherished for a lifetime. Our experienced team works closely with you to bring your vision to life, ensuring every detail is perfect from the ceremony to the reception.',
    highlights: [
      'Elegant bridal suites for preparation',
      'Customizable ceremony and reception spaces',
      'Professional wedding coordination',
      'Exquisite floral arrangements and decor',
      'Multi-cuisine catering options',
      'Photography and videography services',
      'Dance floor and entertainment areas',
      'Valet parking and guest services'
    ],
    features: [
      'Bridal Suite with Premium Amenities',
      'Professional Decoration Services', 
      'Customized Catering Menus',
      'Photography & Videography Areas',
      'Dance Floor & Entertainment Setup',
      'Wedding Coordination Services',
      'Valet Parking',
      'Climate-Controlled Venues'
    ],
    packages: [
      {
        name: 'Intimate Wedding',
        price: '₹75,000',
        guests: 'Up to 100 guests',
        includes: ['Basic decoration', '4-hour venue', 'Standard catering', 'Basic sound system']
      },
      {
        name: 'Grand Wedding',
        price: '₹1,50,000', 
        guests: 'Up to 300 guests',
        includes: ['Premium decoration', '6-hour venue', 'Multi-cuisine catering', 'Professional AV system', 'Bridal suite']
      },
      {
        name: 'Royal Wedding',
        price: '₹3,00,000',
        guests: 'Up to 500 guests', 
        includes: ['Luxury decoration', '8-hour venue', 'Premium catering', 'Complete AV setup', 'Bridal suite', 'Wedding coordination']
      }
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'weddings',
    duration: '4-8 hours',
    capacity: '50-500 guests'
  },
  {
    id: 2,
    title: 'Corporate Events',
    slug: 'corporate-events',
    description: 'Professional venues for conferences, meetings, and corporate celebrations with state-of-the-art amenities and services.',
    detailedDescription: 'Elevate your corporate gatherings with our professional event spaces designed for success. Whether hosting a board meeting, product launch, conference, or company celebration, we provide the perfect environment for productive and memorable corporate events that reflect your company\'s professionalism.',
    highlights: [
      'State-of-the-art presentation technology',
      'High-speed internet and WiFi throughout',
      'Professional catering and refreshment services',
      'Flexible room configurations',
      'Dedicated event coordination team',
      'Business center facilities',
      'Ample parking for attendees',
      'Climate-controlled comfortable environment'
    ],
    features: [
      'State-of-the-art AV Equipment',
      'High-Speed WiFi Throughout',
      'Business Center Facilities',
      'Professional Catering Options',
      'Flexible Seating Arrangements',
      'Presentation Technology',
      'Breakout Room Options',
      'Dedicated Event Coordination'
    ],
    packages: [
      {
        name: 'Meeting Package',
        price: '₹15,000',
        guests: 'Up to 50 attendees',
        includes: ['Half-day venue', 'Basic AV setup', 'Coffee breaks', 'High-speed internet']
      },
      {
        name: 'Conference Package', 
        price: '₹35,000',
        guests: 'Up to 150 attendees',
        includes: ['Full-day venue', 'Complete AV system', 'Lunch & breaks', 'Registration desk', 'Parking']
      },
      {
        name: 'Corporate Gala',
        price: '₹75,000',
        guests: 'Up to 300 attendees',
        includes: ['Evening venue', 'Premium setup', 'Multi-course dinner', 'Entertainment options', 'Full coordination']
      }
    ],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'corporate',
    duration: '2-12 hours', 
    capacity: '20-300 guests'
  },
  {
    id: 3,
    title: 'Special Events',
    slug: 'special-events',
    description: 'Celebrate life\'s milestone moments with our special event services, from birthdays to anniversaries and everything in between.',
    detailedDescription: 'Life is full of special moments worth celebrating. Our special events services cover all your milestone celebrations including birthdays, anniversaries, graduations, baby showers, and other personal celebrations. We create personalized experiences that reflect your unique style and make every occasion memorable.',
    highlights: [
      'Customizable themes and decorations',
      'Personalized celebration planning',
      'Entertainment and activity coordination',
      'Special occasion catering menus',
      'Photography and memory capture',
      'Gift and surprise coordination',
      'Family-friendly environments',
      'Flexible venue configurations'
    ],
    features: [
      'Theme-based Decorations',
      'Entertainment Coordination',
      'Special Occasion Catering',
      'Photography Services',
      'Activity Planning',
      'Gift Coordination',
      'Family-friendly Setup',
      'Flexible Timing Options'
    ],
    packages: [
      {
        name: 'Birthday Celebration',
        price: '₹25,000',
        guests: 'Up to 75 guests',
        includes: ['Theme decoration', '4-hour venue', 'Birthday catering', 'Entertainment setup']
      },
      {
        name: 'Anniversary Party',
        price: '₹45,000',
        guests: 'Up to 150 guests',
        includes: ['Elegant decoration', '5-hour venue', 'Multi-course dinner', 'Photography', 'Music system']
      },
      {
        name: 'Milestone Celebration',
        price: '₹65,000',
        guests: 'Up to 200 guests',
        includes: ['Premium decoration', '6-hour venue', 'Gourmet catering', 'Entertainment', 'Full coordination']
      }
    ],
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'social',
    duration: '3-6 hours',
    capacity: '25-200 guests'
  },
  {
    id: 4,
    title: 'Reunions',
    slug: 'reunions',
    description: 'Reconnect with loved ones and create new memories at our reunion events, designed for families, friends, and organizations.',
    detailedDescription: 'Reunions are about reconnecting, reminiscing, and creating new memories together. Whether it\'s a family reunion, school reunion, or organizational gathering, we provide the perfect setting for meaningful connections. Our reunion services focus on creating comfortable, welcoming environments where everyone feels at home.',
    highlights: [
      'Comfortable gathering spaces for all ages',
      'Memory lane displays and photo areas',
      'Flexible catering for diverse groups',
      'Entertainment suitable for all generations',
      'Registration and name tag services',
      'Audio-visual for presentations and memories',
      'Outdoor and indoor space options',
      'Group accommodation assistance'
    ],
    features: [
      'Multi-generational Friendly Spaces',
      'Memory Display Areas',
      'Flexible Catering Options',
      'Registration Services',
      'Audio-Visual Equipment',
      'Photo & Video Documentation',
      'Outdoor Activity Areas',
      'Group Coordination Services'
    ],
    packages: [
      {
        name: 'Family Reunion',
        price: '₹20,000',
        guests: 'Up to 100 family members',
        includes: ['All-day venue', 'Casual catering', 'Activity areas', 'Photo displays']
      },
      {
        name: 'School Reunion',
        price: '₹40,000',
        guests: 'Up to 200 alumni',
        includes: ['Evening venue', 'Dinner & cocktails', 'DJ & dancing', 'Memory presentations', 'Registration desk']
      },
      {
        name: 'Organization Reunion',
        price: '₹60,000',
        guests: 'Up to 300 attendees',
        includes: ['Full-day venue', 'Multiple meal services', 'Presentation facilities', 'Entertainment', 'Group coordination']
      }
    ],
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'reunion',
    duration: '4-10 hours',
    capacity: '50-300 guests'
  }
];

export const serviceCategories = [
  { id: 'weddings', name: 'Weddings', icon: '💒' },
  { id: 'corporate', name: 'Corporate', icon: '🏢' },
  { id: 'social', name: 'Special Events', icon: '🎉' },
  { id: 'reunion', name: 'Reunions', icon: '👥' }
];