import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { companyInfo, contactInfo } from '@/data/companyInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-display font-bold text-gradient mb-4">
              TVS Event Center
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating unforgettable moments and priceless memories. Where life's most beautiful celebrations come to life in luxury and elegance.
            </p>
            <div className="flex space-x-4">
              <a
                // href={contactInfo.socialMedia.facebook}
                href='...'
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold-600 hover:bg-gold-700 rounded-lg transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                // href={contactInfo.socialMedia.instagram}
                href='...'

                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold-600 hover:bg-gold-700 rounded-lg transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                // href={contactInfo.socialMedia.youtube}
                href='...'

                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold-600 hover:bg-gold-700 rounded-lg transition-colors duration-300"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                // href={contactInfo.socialMedia.twitter}
                href='...'

                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold-600 hover:bg-gold-700 rounded-lg transition-colors duration-300"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-gold-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Our Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-gold-400">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                'Wedding Functions',
                'Corporate Events',
                'Birthday Parties',
                'Engagement Ceremonies',
                'Reunions Celebrations',
                'Conferences & Seminars'
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-gold-400 transition-colors duration-300 flex items-center group cursor-pointer">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-gold-400">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Daytime Events :
                    9AM - 4PM <br></br>
                    Evening Events :
                    6PM - 12AM
                    {/* Mon-Fri: {contactInfo.businessHours.weekdays}<br />
                    Saturday: {contactInfo.businessHours.saturday}<br />
                    Sunday: {contactInfo.businessHours.sunday} */}

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {currentYear} TVS Event Center. All rights reserved.</p>
              <p className="mt-1">
                Developed by{' '}
                <a
                  href="https://www.echo5digital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium"
                >
                  Echo5 Digital
                </a>
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                Book Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer