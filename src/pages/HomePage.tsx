import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Zap } from 'lucide-react';
import FeaturedVehicles from '../components/FeaturedVehicles';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const benefits = [
    {
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      title: 'Premium Selection',
      description: 'Handpicked luxury and performance vehicles',
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: 'Quality Assured',
      description: '150-point inspection on all vehicles',
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: 'Flexible Options',
      description: 'Buy, finance, or rent on your terms',
    },
    {
      icon: <Zap className="w-10 h-10 text-orange-500" />,
      title: 'Fast Service',
      description: 'Quick approval and same-day delivery',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Drive Your Dreams
              <span className="block text-red-500">Today</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Premium vehicles for sale and rent. Experience luxury and performance with our curated selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/vehicles?type=buy"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 inline-flex items-center justify-center"
              >
                Browse to Buy
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/vehicles?type=rent"
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors duration-200 inline-flex items-center justify-center"
              >
                Rent a Vehicle
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-white shadow-md -mt-20 mx-4 md:mx-auto md:max-w-5xl rounded-lg relative z-30">
        <SearchBar />
      </section>

      {/* Featured Vehicles Carousel */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Featured Vehicles</h2>
            <p className="text-slate-600 mt-2">Explore our top picks for this month</p>
          </div>
          <FeaturedVehicles />
          <div className="text-center mt-12">
            <Link
              to="/vehicles"
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
            >
              View all vehicles
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose Us</h2>
            <p className="text-slate-600 mt-2">Experience the premium difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your perfect vehicle?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy or rent, our team of experts is ready to help you find the perfect match for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vehicles?type=buy"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 inline-flex items-center justify-center"
            >
              Start Browsing
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors duration-200 inline-flex items-center justify-center"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;