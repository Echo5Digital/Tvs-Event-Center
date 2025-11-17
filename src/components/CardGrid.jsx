'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Calendar, Star } from 'lucide-react'

const CardGrid = ({ items, type = 'default', className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const renderServiceCard = (service, index) => (
    <motion.div
      key={service.id}
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {service.duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-gold-600 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{service.category}</span>
          </div>
          <div className="text-gold-600 font-semibold">
            {service.priceRange}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features?.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium group"
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  )

  const renderVenueCard = (venue, index) => (
    <motion.div
      key={venue.id}
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-gold-600 font-semibold text-sm flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {venue.capacity}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold-600 transition-colors duration-300">
          {venue.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {venue.description}
        </p>
        

        
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.bestFor?.slice(0, 2).map((purpose, idx) => (
            <span
              key={idx}
              className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs"
            >
              {purpose}
            </span>
          ))}
        </div>
        

      </div>
    </motion.div>
  )

  const renderTestimonialCard = (testimonial, index) => (
    <motion.div
      key={testimonial.id}
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 card-hover"
    >
      <div className="flex items-center mb-4">
        <div className="flex text-gold-500">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">
          {testimonial.event}
        </span>
      </div>
      
      <p className="text-gray-700 mb-6 italic leading-relaxed">
        "{testimonial.comment}"
      </p>
      
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )

  const renderCard = (item, index) => {
    switch (type) {
      case 'services':
        return renderServiceCard(item, index)
      case 'venues':
        return renderVenueCard(item, index)
      case 'testimonials':
        return renderTestimonialCard(item, index)
      default:
        return renderServiceCard(item, index)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {items.map((item, index) => renderCard(item, index))}
    </motion.div>
  )
}

export default CardGrid