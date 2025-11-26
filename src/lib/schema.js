import { contactInfo, companyInfo } from '@/data/testimonials'

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tvseventcenter.com',
    name: 'TV Event Center',
    description: companyInfo.description,
    url: 'https://tvseventcenter.com',
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zipCode,
      addressCountry: contactInfo.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060'
    },
    openingHours: [
      'Mo-Fr 09:00-20:00',
      'Sa 09:00-22:00', 
      'Su 10:00-18:00'
    ],
    priceRange: '$$$$',
    category: 'Event Venue',
    serviceType: [
      'Wedding Venue',
      'Corporate Event Venue', 
      'Birthday Party Venue',
      'Conference Center',
      'Banquet Hall'
    ],
    sameAs: [
      contactInfo.socialMedia.facebook,
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.youtube,
      contactInfo.socialMedia.twitter
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1'
    },
    amenityFeature: companyInfo.features.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
      value: true
    }))
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TV Event Center',
    description: companyInfo.description,
    url: 'https://tvseventcenter.com',
    logo: 'https://tvseventcenter.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.phone,
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zipCode,
      addressCountry: contactInfo.address.country
    },
    sameAs: [
      contactInfo.socialMedia.facebook,
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.youtube,
      contactInfo.socialMedia.twitter
    ]
  }
}

export function generateEventSchema(event) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: 'TV Event Center',
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactInfo.address.street,
        addressLocality: contactInfo.address.city,
        addressRegion: contactInfo.address.state,
        postalCode: contactInfo.address.zipCode,
        addressCountry: contactInfo.address.country
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'TV Event Center',
      url: 'https://tvseventcenter.com'
    }
  }
}