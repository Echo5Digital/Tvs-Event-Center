'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Users, Calendar, MapPin, Heart, CheckCircle, Star, ArrowLeft, Phone, Mail, Camera, Clock, Crown } from 'lucide-react'
import { services } from '@/data/services'
import { companyInfo } from '@/data/companyInfo'

export default function ReunionsPage() {
  const reunionsService = services.find(service => service.slug === 'reunions')

  if (!reunionsService) {
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
              src={reunionsService.image}
              alt="Reunions"
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
                {reunionsService.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                {reunionsService.description}
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
                  title="Reconnect & Remember"
                  subtitle="Meaningful Moments"
                  centered={false}
                />
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {reunionsService.detailedDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{reunionsService.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                    <span>{reunionsService.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Camera className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Memory Walls</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Flexible Timing</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Plan Your Reunion
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
                  src={reunionsService.gallery[1]}
                  alt="Family Reunion"
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
              description="Everything you need for a perfect gathering"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reunionsService.highlights.map((highlight, index) => (
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

        {/* Reunion Types */}
        {/* <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Types of Reunions We Host"
              description="From family gatherings to class reunions"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center p-6"
              >
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Family Reunions</h3>
                <p className="text-gray-600">
                  Multi-generational gatherings with activities for all ages, 
                  memorial displays, and comfortable spaces for sharing stories.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6"
              >
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">School Reunions</h3>
                <p className="text-gray-600">
                  Class reunions with yearbook displays, school memorabilia walls, 
                  and nostalgic decorations from your graduation era.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-6"
              >
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Organization Reunions</h3>
                <p className="text-gray-600">
                  Corporate alumni, military unit, or organization reunions with 
                  professional networking areas and achievement displays.
                </p>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Reunion Packages */}
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
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Reunion Memories"
              description="Heartwarming moments from our reunion celebrations"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reunionsService.gallery.map((image, index) => (
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
                    alt={`Reunion ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Timeline */}
        {/* <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              title="Reunion Planning Timeline"
              description="We help you coordinate every detail"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "6-12 Months", title: "Initial Planning", desc: "Save the date, venue booking, guest list compilation" },
                { step: "3-6 Months", title: "Detailed Planning", desc: "Menu selection, decorations, entertainment, invitations" },
                { step: "1-3 Months", title: "Final Preparations", desc: "RSVP tracking, seating arrangements, final headcount" },
                { step: "Event Week", title: "Execution", desc: "Setup, coordination, and making memories together" }
              ].map((timeline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-blue-600 mb-2">{timeline.step}</h4>
                  <h5 className="font-medium mb-2">{timeline.title}</h5>
                  <p className="text-gray-600 text-sm">{timeline.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto container-padding text-center">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Plan Your Reunion?
            </h2>
            <p className="text-xl mb-8 text-gold-100">
              Let's bring your group back together for an unforgettable celebration            
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