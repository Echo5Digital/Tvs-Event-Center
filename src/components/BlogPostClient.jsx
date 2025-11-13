'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Tag } from 'lucide-react'

export default function BlogPostClient({ post, relatedPosts }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Link 
                href="/blog"
                className="inline-flex items-center text-amber-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4"
            >
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-shadow-lg leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-gray-200 mb-8"
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
                {post.authorRole && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300">{post.authorRole}</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </motion.div>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto"
            >
              {post.excerpt}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              {/* Content */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-amber-700 prose-headings:font-display
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-amber-600 prose-a:no-underline hover:prose-a:text-amber-700
                  prose-strong:text-gray-900
                  prose-ul:text-gray-700 prose-ol:text-gray-700
                  prose-li:text-gray-700
                  prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50 
                  prose-blockquote:text-amber-800 prose-blockquote:font-medium prose-blockquote:italic
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 font-medium mr-3">Tags:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Share this article</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-80"
            >
              {/* Author Info */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                    {post.authorRole && (
                      <p className="text-amber-600 text-sm">{post.authorRole}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Expert event coordinator with over 10 years of experience creating unforgettable celebrations at TVS Event Center.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link href="/services" className="block text-amber-600 hover:text-amber-700 text-sm transition-colors">
                    → View Our Services
                  </Link>
                  <Link href="/gallery" className="block text-amber-600 hover:text-amber-700 text-sm transition-colors">
                    → Event Gallery
                  </Link>
                  <Link href="/contact" className="block text-amber-600 hover:text-amber-700 text-sm transition-colors">
                    → Contact Us
                  </Link>
                  <Link href="/about" className="block text-amber-600 hover:text-amber-700 text-sm transition-colors">
                    → About TVS Event Center
                  </Link>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-primary text-white rounded-xl p-6">
                <h3 className="font-bold mb-3">Ready to Plan Your Event?</h3>
                <p className="text-amber-100 text-sm mb-4">
                  Let our expert team help you create an unforgettable celebration.
                </p>
                <Link href="/contact" className="block w-full text-center bg-white text-amber-600 font-medium py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Get Started Today
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  )
}