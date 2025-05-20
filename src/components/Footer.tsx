import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Car } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car size={24} className="text-red-500" />
              <span className="text-xl font-bold">Eliacars</span>
            </div>
            <p className="text-slate-400 mb-4">
              Premium car dealership offering quality vehicles for sale and rent. Experience luxury and performance with our curated selection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles?type=buy" className="text-slate-400 hover:text-white transition-colors">
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link to="/vehicles?type=rent" className="text-slate-400 hover:text-white transition-colors">
                  Rent a Car
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/financing" className="text-slate-400 hover:text-white transition-colors">
                  Financing
                </Link>
              </li>
              <li>
                <Link to="/services/insurance" className="text-slate-400 hover:text-white transition-colors">
                  Insurance
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance" className="text-slate-400 hover:text-white transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services/warranty" className="text-slate-400 hover:text-white transition-colors">
                  Extended Warranty
                </Link>
              </li>
              <li>
                <Link to="/services/trade-in" className="text-slate-400 hover:text-white transition-colors">
                  Trade-In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-400">
                  123 Luxury Lane, Beverly Hills, CA 90210, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-red-500 mr-3 flex-shrink-0" />
                <a href="tel:+18001234567" className="text-slate-400 hover:text-white transition-colors">
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-red-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@eliacars.com" className="text-slate-400 hover:text-white transition-colors">
                  info@eliacars.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Eliacars. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-slate-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;