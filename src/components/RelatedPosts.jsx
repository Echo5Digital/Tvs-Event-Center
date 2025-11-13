'use client'

import { motion } from 'framer-motion'
import BlogCard from './BlogCard'
import SectionHeading from './SectionHeading'

const RelatedPosts = ({ posts, currentPostId }) => {
  const relatedPosts = posts.filter(post => post.id !== currentPostId).slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionHeading
            subtitle="Continue Reading"
            title="Related Articles"
            description="Discover more insights and inspiration for your next event"
            centered={true}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedPosts