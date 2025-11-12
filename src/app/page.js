'use client'

import HeroSection from '@/components/HeroSection'
import SectionHeading from '@/components/SectionHeading'
import CardGrid from '@/components/CardGrid'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Users, Calendar, MapPin, Award, Heart, Crown } from 'lucide-react'
import { services } from '@/data/services'
import { venueHalls } from '@/data/venueHalls'
import { testimonials, companyInfo } from '@/data/testimonials'
import { galleryImages } from '@/data/gallery'

export default function HomePage() {
  const featuredServices = services.slice(0, 6)
  const featuredVenues = venueHalls.slice(0, 3)
  const featuredTestimonials = testimonials.slice(0, 3)
  const featuredGallery = galleryImages.slice(0, 8)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Preview Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeading
                  subtitle="About TV Event Center"
                  title="Where Dreams Come to Life"
                  description={companyInfo.description}
                  centered={false}
                />
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{companyInfo.maxCapacity}</div>
                    <div className="text-sm text-gray-600">Max Capacity</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{companyInfo.totalArea}</div>
                    <div className="text-sm text-gray-600">Total Space</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/about" className="btn-primary inline-flex items-center">
                    Learn More About Us
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Elegant wedding setup"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Corporate event setup"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative h-32 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Birthday celebration"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Outdoor garden event"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Our Services"
              title="Creating Unforgettable Experiences"
              description="From intimate gatherings to grand celebrations, we provide comprehensive event services tailored to your unique vision."
            />
            
            <div className="mt-16">
              <CardGrid items={featuredServices} type="services" />
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Venue Halls Preview */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Our Venues"
              title="Stunning Spaces for Every Occasion"
              description="Choose from our collection of beautifully designed halls and outdoor spaces, each offering unique features and ambiance."
            />
            
            <div className="mt-16">
              <CardGrid items={featuredVenues} type="venues" />
            </div>

            <div className="text-center mt-12">
              <Link href="/gallery" className="btn-secondary">
                Explore All Venues
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Why Choose TV Event Center"
              title="Excellence in Every Detail"
              description="We're committed to making your event extraordinary with our attention to detail, professional service, and luxurious amenities."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                {
                  icon: Award,
                  title: "Award-Winning Service",
                  description: "Recognized for excellence in event management and customer satisfaction."
                },
                {
                  icon: Heart,
                  title: "Passionate Team",
                  description: "Our dedicated team treats every event with personal care and attention."
                },
                {
                  icon: Crown,
                  title: "Luxury Amenities",
                  description: "State-of-the-art facilities and premium amenities for your comfort."
                },
                {
                  icon: Star,
                  title: "5-Star Reviews",
                  description: "Consistently rated as the top event venue by our satisfied clients."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Our Gallery"
              title="Moments Worth Celebrating"
              description="Take a glimpse into the magical moments we've helped create for our clients over the years."
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {featuredGallery.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/gallery" className="btn-primary">
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <SectionHeading
              subtitle="Client Testimonials"
              title="What Our Clients Say"
              description="Don't just take our word for it. Here's what our satisfied clients have to say about their experience with TV Event Center."
            />
            
            <div className="mt-16">
              <CardGrid items={featuredTestimonials} type="testimonials" />
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 text-gold-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5 Average Rating</span>
                <span className="text-gray-500">from 200+ reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-600 text-white">
          <div className="max-w-4xl mx-auto container-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Ready to Create Your Perfect Event?
              </h2>
              <p className="text-xl mb-8 text-gold-100">
                Let us help you turn your vision into reality. Contact our expert team today for a personalized consultation and venue tour.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/contact"
                  className="bg-white text-gold-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="border-2 border-white text-white hover:bg-white hover:text-gold-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  Call Now: +1 (555) 123-4567
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}