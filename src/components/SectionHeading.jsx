'use client'

import { motion } from 'framer-motion'

const SectionHeading = ({ 
  title, 
  subtitle, 
  description, 
  centered = true, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${centered ? 'text-center' : 'text-left'} ${className}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-amber-600 font-medium text-sm uppercase tracking-wide mb-3"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-amber-700 mb-4"
      >
        {title}
      </motion.h2>

      {/* Decorative separator - same design as "DESIGN YOUR PERFECT EVENT" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`flex items-center space-x-6 mb-8 ${centered ? 'justify-center' : 'justify-start'}`}
      >
        <div className="w-12 h-0.5 bg-amber-400"></div>
        <div className="text-amber-400 text-3xl">◊</div>
        <div className="w-12 h-0.5 bg-amber-400"></div>
      </motion.div>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-lg text-gray-600 leading-relaxed ${
            centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading