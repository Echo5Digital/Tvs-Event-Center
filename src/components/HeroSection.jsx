'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Calendar, MapPin } from 'lucide-react'

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const backgroundImages = [
    '/images/tvevent34.jpg',
    '/images/tvevent35.jpg',
    '/images/tvevent36.jpg',
    '/images/wedding1.jpg'
  ]

  // Auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt={`TVS Event Center - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover object-center"
              priority={currentImageIndex === 0}
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        
        {/* Image Indicators */}
        <div className="absolute bottom-20 right-8 z-20 flex flex-col space-y-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={{
                backgroundColor: index === currentImageIndex ? '#d97b15' : undefined
              }}
              aria-label={`Switch to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-20 h-20 rounded-full blur-xl opacity-20"
        style={{ backgroundColor: '#d97b15' }}
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 left-10 w-32 h-32 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: '#b45309' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding text-center px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-medium text-sm md:text-lg tracking-wide uppercase"
            style={{ color: '#d97b15' }}
          >
            TVS Event Center
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight px-2"
          >
            Celebrate Life's{' '}
            <span className="text-gradient">
              Best Moments
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Where luxury meets celebration. Create unforgettable memories in our state-of-the-art event venues designed for life's most precious moments.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 text-white/80 text-sm md:text-base"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#d97b15' }} />
              <span>Premium Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#d97b15' }} />
              <span>1000+ Events Hosted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#d97b15' }} />
              <span>Full-Service Planning</span>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-6 md:pt-8 px-4"
          >
            <Link
              href="/contact"
              className="btn-primary text-sm md:text-lg px-6 md:px-10 py-3 md:py-4 shadow-2xl hover:shadow-gold-500/25 w-full sm:w-auto text-center"
            >
              Book Your Event
            </Link>
            <Link
              href="/gallery"
              className="btn-secondary text-sm md:text-lg px-6 md:px-10 py-3 md:py-4 border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto text-center"
            >
              View Gallery
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-16 border-t border-white/20 mx-4"
          >
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#d97b15' }}>
                7,500
              </div>
              <div className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Sq Ft Space
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#d97b15' }}>
                1,000
              </div>
              <div className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Max Capacity
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#d97b15' }}>
                10+
              </div>
              <div className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#d97b15' }}>
                24/7
              </div>
              <div className="text-white/80 text-xs md:text-sm uppercase tracking-wide">
                Event Support
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection