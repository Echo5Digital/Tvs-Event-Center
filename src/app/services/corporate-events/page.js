'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Building2, Calendar, Users, MapPin, CheckCircle, Star, ArrowLeft, Phone, Mail, Wifi, Monitor } from 'lucide-react'
import { services } from '@/data/services'

export default function CorporateEventsPage() {
  const corporateService = services.find(service => service.slug === 'corporate-events')

  if (!corporateService) {
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
              src={corporateService.image}
              alt="Corporate Events"
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
                {corporateService.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                {corporateService.description}
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
                  title="Professional Excellence"
                  subtitle="in Every Detail"
                  centered={false}
                />
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {corporateService.detailedDescription}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{corporateService.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{corporateService.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Wifi className="w-5 h-5 text-amber-600 mr-3" />
                    <span>High-Speed Internet</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Monitor className="w-5 h-5 text-amber-600 mr-3" />
                    <span>AV Equipment Included</span>
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Plan Your Event
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
                  src={corporateService.gallery[1]}
                  alt="Corporate Meeting"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features & Highlights */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Corporate Event Features"
              description="Everything you need for successful business events"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateService.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Packages */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Corporate Packages"
              description="Professional solutions tailored to your business needs"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corporateService.packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative bg-white rounded-lg shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    index === 1 ? 'border-blue-400 transform scale-105' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
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
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
              title="Corporate Event Gallery"
              description="Professional venues for successful business events"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {corporateService.gallery.map((image, index) => (
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
                    alt={`Corporate event ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto container-padding text-center">
            <SectionHeading
              title="Ready to Host Your Corporate Event?"
              description="Let's create a professional and memorable business gathering"
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get a Quote
              </Link>
              <a
                href="tel:+91-XXXXXXXXXX"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
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