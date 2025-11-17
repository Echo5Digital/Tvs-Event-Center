'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { PartyPopper, Calendar, Users, MapPin, CheckCircle, Star, ArrowLeft, Phone, Mail, Gift, Cake, Crown } from 'lucide-react'
import { services } from '@/data/services'
import { companyInfo } from '@/data/companyInfo'

export default function SpecialEventsPage() {
  const specialEventsService = services.find(service => service.slug === 'special-events')

  if (!specialEventsService) {
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
              src={specialEventsService.image}
              alt="Special Events"
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
                {specialEventsService.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                {specialEventsService.description}
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
                  title="Celebrate Life's"
                  subtitle="Special Moments"
                  centered={false}
                />
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {specialEventsService.detailedDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{specialEventsService.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{specialEventsService.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Gift className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Custom Themes</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Cake className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Special Catering</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
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
                  src={specialEventsService.gallery[1]}
                  alt="Special Event Celebration"
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
              description="Personalized touches for your unique celebration"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialEventsService.highlights.map((highlight, index) => (
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

        {/* Event Packages */}
        {/* Pricing Section */}
        <section className="section-padding bg-gradient-to-br from-gold-50 to-accent/5">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Transparent Pricing"
              title="Our Venue Packages"
              description="Simple, straightforward pricing with everything you need for your perfect event."
              centered={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
              {/* Main Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-gold-600"></div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-heading mb-2">Venue Rental</h3>
                  <div className="text-5xl font-bold text-heading mb-2">
                    ${companyInfo.pricing.basePrice}
                    <span className="text-lg font-normal text-gray-600"> {companyInfo.pricing.taxNote}</span>
                  </div>
                  <p className="text-gray-600">Complete venue package</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Daytime Events</span>
                    <span className="font-semibold text-accent">{companyInfo.pricing.timeSlots.daytime.hours}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Evening Events</span>
                    <span className="font-semibold text-accent">{companyInfo.pricing.timeSlots.evening.hours}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border-2 border-accent/20">
                    <span className="text-gray-700">Cleaning Fee</span>
                    <span className="font-bold text-accent">${companyInfo.pricing.cleaning.fee}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-heading mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 text-accent mr-2" />
                      <span>Full venue access</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="w-4 h-4 text-accent mr-2" />
                      <span>Capacity up to {companyInfo.maxCapacity}</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-accent mr-2" />
                      <span>{companyInfo.totalArea} event space</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Services & Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Available Services */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-heading mb-4">Available Services</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {companyInfo.services.map((service, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Crown className="w-5 h-5 text-accent mr-3" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact for Booking */}
                <div className="bg-gradient-to-br from-accent to-gold-600 text-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
                  <p className="mb-4 opacity-90">
                    Contact {companyInfo.contact.contactPerson} to discuss your event and secure your date.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <span className="font-semibold">Phone:</span>
                      <a href={`tel:${companyInfo.contact.phone}`} className="ml-2 hover:underline">
                        {companyInfo.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">Address:</span>
                      <span className="ml-2 text-sm">{companyInfo.address.full}</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Quote & Book Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Gallery */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Special Events Gallery"
              description="Memorable celebrations we've brought to life"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialEventsService.gallery.map((image, index) => (
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
                    alt={`Special event ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PartyPopper className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}

        <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto container-padding text-center">
           
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Celebrate Your Special Event?
            </h2>
            <p className="text-xl mb-8 text-gold-100">
              Let's create unforgettable memories for your milestone moment
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get a Quote
              </Link>
              <a
                href="tel:832-228-1066"
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