'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Heart, Calendar, Users, MapPin, CheckCircle, Star, ArrowLeft, Phone, Mail } from 'lucide-react'
import { services } from '@/data/services'

export default function WeddingPage() {
  const [selectedPackage, setSelectedPackage] = useState(0)
  const weddingService = services.find(service => service.slug === 'wedding')

  if (!weddingService) {
    return <div>Service not found</div>
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={weddingService.image}
              alt="Wedding Celebration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/services" 
                className="inline-flex items-center text-amber-300 hover:text-amber-200 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                {weddingService.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                {weddingService.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Service Details */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeading
                  title="Your Dream Wedding"
                  subtitle="Awaits"
                  centered={false}
                />
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {weddingService.detailedDescription}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{weddingService.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{weddingService.duration}</span>
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Plan Your Wedding
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Image
                  src={weddingService.gallery[1]}
                  alt="Wedding Reception"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features & Highlights */}
        <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="What Makes Us Special"
              description="Every detail carefully planned to make your wedding day perfect"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {weddingService.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <CheckCircle className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Packages */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Wedding Packages"
              description="Choose the perfect package for your special day"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingService.packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative bg-white rounded-lg shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    index === 1 ? 'border-amber-400 transform scale-105' : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-gray-600">{pkg.guests}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      index === 1
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    Choose Package
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Wedding Gallery"
              description="See the magic we create for couples"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weddingService.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={image}
                    alt={`Wedding gallery ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto container-padding text-center">
            <SectionHeading
              title="Ready to Plan Your Dream Wedding?"
              description="Let's create the perfect celebration for your special day"
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get a Quote
              </Link>
              <a
                href="tel:+91-XXXXXXXXXX"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}