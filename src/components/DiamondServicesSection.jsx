'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Building2, Gift, Baby, Briefcase, Star, Crown, Award, PartyPopper } from 'lucide-react';

const DiamondServicesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-amber-700 mb-4">
            DESIGN YOUR
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-amber-600 mb-8">
            PERFECT EVENT
          </h3>
          <div className="flex justify-center items-center space-x-6">
            <div className="w-12 h-0.5 bg-amber-400"></div>
            <div className="text-amber-400 text-3xl">◊</div>
            <div className="w-12 h-0.5 bg-amber-400"></div>
          </div>
        </motion.div>

        {/* Desktop Honeycomb Diamond Grid - Hidden on Mobile */}
        <div className="hidden lg:block relative w-full max-w-6xl mx-auto" style={{ height: '500px' }}>
          {/* Background diamond pattern */}
          <div className="absolute inset-0 opacity-12">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="absolute border border-amber-200"
                style={{
                  width: '120px',
                  height: '120px',
                  transform: 'rotate(45deg)',
                  left: `${3 + (i % 7) * 13}%`,
                  top: `${3 + Math.floor(i / 7) * 10}%`,
                }}
              />
            ))}
          </div>

          {/* Honeycomb Diamond Layout - Overlapping Pattern */}
          
          {/* TOP ROW - 3 diamonds */}
          <DiamondItem 
            service={{ title: 'WEDDING\nFUNCTIONS', icon: Heart }}
            position={{ top: '5%', left: '30%', transform: 'translateX(-50%)' }}
            delay={0.1}
          />

          <DiamondItem 
            service={{ title: 'REUNIONS', icon: Star }}
            position={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }}
            delay={0.2}
          />

          <DiamondItem 
            service={{ title: 'SOCIAL', icon: Users }}
            position={{ top: '5%', left: '70%', transform: 'translateX(-50%)' }}
            delay={0.3}
          />

          {/* MIDDLE ROW - 4 diamonds (overlapping 25% vertically, centered horizontally) */}
          <DiamondItem 
            service={{ title: 'ENGAGEMENTS', icon: Crown }}
            position={{ top: '25%', left: '20%', transform: 'translateX(-50%)' }}
            delay={0.4}
          />

          <DiamondItem 
            service={{ title: 'GET-\nTOGETHER', icon: PartyPopper }}
            position={{ top: '25%', left: '40%', transform: 'translateX(-50%)' }}
            delay={0.5}
          />

          <DiamondItem 
            service={{ title: 'BIRTHDAY\nPARTY', icon: Gift }}
            position={{ top: '25%', left: '60%', transform: 'translateX(-50%)' }}
            delay={0.6}
          />

          <DiamondItem 
            service={{ title: 'BAPTISM', icon: Baby }}
            position={{ top: '25%', left: '80%', transform: 'translateX(-50%)' }}
            delay={0.7}
          />

          {/* BOTTOM ROW - 3 diamonds (overlapping 25% vertically, aligned with top row) */}
          <DiamondItem 
            service={{ title: 'CORPORATE\nCOMPANY\nMEETINGS', icon: Building2 }}
            position={{ top: '45%', left: '30%', transform: 'translateX(-50%)' }}
            delay={0.8}
          />

          <DiamondItem 
            service={{ title: 'SALES\nPROMOTIONS', icon: Award }}
            position={{ top: '45%', left: '50%', transform: 'translateX(-50%)' }}
            delay={0.9}
          />

          <DiamondItem 
            service={{ title: 'CONFERENCE\n& SEMINARS\nETC...', icon: Briefcase }}
            position={{ top: '45%', left: '70%', transform: 'translateX(-50%)' }}
            delay={1.0}
          />
        </div>

        {/* Mobile/Tablet Grid Layout - Visible on smaller screens */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'WEDDING\nFUNCTIONS', icon: Heart },
            { title: 'REUNIONS', icon: Star },
            { title: 'SOCIAL', icon: Users },
            { title: 'ENGAGEMENTS', icon: Crown },
            { title: 'GET-\nTOGETHER', icon: PartyPopper },
            { title: 'BIRTHDAY\nPARTY', icon: Gift },
            { title: 'BAPTISM', icon: Baby },
            { title: 'CORPORATE\nCOMPANY\nMEETINGS', icon: Building2 },
            { title: 'SALES\nPROMOTIONS', icon: Award },
            { title: 'CONFERENCE\n& SEMINARS\nETC...', icon: Briefcase }
          ].map((service, index) => (
            <MobileDiamondCard 
              key={index}
              service={service}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            From intimate gatherings to grand celebrations, we specialize in creating unforgettable experiences 
            tailored to your unique vision and style.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-10 py-4"
          >
            Plan Your Event
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const DiamondItem = ({ service, position, delay }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}

      className="absolute w-28 h-28 md:w-36 md:h-36 bg-white/95 backdrop-blur-sm border-2 border-amber-400/60 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer"
      style={position}
    >
      {/* Inner content rotated back to normal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transform -rotate-45 p-3">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <h4 className="text-xs md:text-sm font-bold text-amber-800 text-center leading-tight whitespace-pre-line tracking-wide">
          {service.title}
        </h4>
      </div>

      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-400 transform rotate-45 opacity-60"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 transform rotate-45 opacity-60"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-400 transform rotate-45 opacity-60"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 transform rotate-45 opacity-60"></div>
    </motion.div>
  );
};

const MobileDiamondCard = ({ service, delay }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-white/95 backdrop-blur-sm border-2 border-amber-400/60 shadow-lg transform rotate-45"
    >
      {/* Inner content rotated back to normal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transform -rotate-45 p-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-1 shadow-lg">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-amber-800 text-center leading-tight whitespace-pre-line tracking-wide">
          {service.title}
        </h4>
      </div>
    </motion.div>
  );
};

export default DiamondServicesSection;