'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import Gallery from '@/components/Gallery'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { galleryImages, galleryCategories } from '@/data/gallery'

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Beautiful event gallery"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold-400 font-medium text-lg mb-4 uppercase tracking-wide">
                Our Gallery
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Moments Worth Celebrating
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Explore our collection of beautifully captured events and see how we bring dreams to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Event Gallery"
              title="Captured Memories"
              description="Browse through our extensive collection of events we've had the honor to host. Each image tells a story of celebration, joy, and unforgettable moments."
            />
            
            <div className="mt-16">
              <Gallery 
                images={galleryImages} 
                categories={galleryCategories}
                showFilters={true}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}