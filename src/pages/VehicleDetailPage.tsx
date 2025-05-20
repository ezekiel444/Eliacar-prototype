import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Gauge, 
  Briefcase, 
  MapPin, 
  Shield, 
  Check, 
  DollarSign,
  Share2,
  Heart,
  Car,
  Users,
  Fuel
} from 'lucide-react';
import { useVehicleContext } from '../context/VehicleContext';

const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getVehicleById } = useVehicleContext();
  const vehicle = getVehicleById(id || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
        <p className="mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/vehicles"
          className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
        >
          <ChevronLeft size={18} className="mr-2" />
          Back to Vehicles
        </Link>
      </div>
    );
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    console.log('Contact form submitted:', contactForm);
    // Show success message and reset form
    alert('Your inquiry has been sent. We will contact you shortly.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setShowContactForm(false);
  };

  // Generate multiple mock images based on the main image
  const vehicleImages = [
    vehicle.image,
    'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  const specifications = [
    { label: 'Year', value: vehicle.year, icon: <Calendar size={18} /> },
    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} mi`, icon: <Gauge size={18} /> },
    { label: 'Transmission', value: vehicle.transmission, icon: <Briefcase size={18} /> },
    { label: 'Body Type', value: vehicle.bodyType, icon: <Car size={18} /> },
    { label: 'Fuel Type', value: vehicle.fuelType, icon: <Fuel size={18} /> },
    { label: 'Seating', value: '5 People', icon: <Users size={18} /> },
  ];

  const features = [
    'Leather Seats',
    'Navigation System',
    'Bluetooth',
    'Backup Camera',
    'Sunroof',
    'Heated Seats',
    'Keyless Entry',
    'Power Windows',
    'Premium Sound System',
    'Cruise Control',
    'Alloy Wheels',
    'Climate Control'
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-red-500 transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/vehicles" className="text-gray-500 hover:text-red-500 transition-colors">Vehicles</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex items-center mt-2">
            <MapPin size={16} className="text-red-500 mr-1" />
            <span className="text-slate-600">{vehicle.location}</span>
            <span className="mx-2 text-slate-300">•</span>
            <span className="text-slate-600">ID: {vehicle.id.substring(0, 8).toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-4">
              <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                <img
                  src={vehicleImages[activeImageIndex]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium m-4 rounded">
                  {vehicle.type === 'rent' ? 'For Rent' : 'For Sale'}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {vehicleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative overflow-hidden rounded border ${
                    activeImageIndex === index
                      ? 'border-red-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="inline-flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors duration-200">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
              <button className="inline-flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors duration-200">
                <Heart size={18} className="mr-2" />
                Save
              </button>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Vehicle Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 text-slate-500">
                        {spec.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-500">{spec.label}</p>
                        <p className="font-medium text-slate-900">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>
                <p className="text-slate-700">
                  This {vehicle.year} {vehicle.make} {vehicle.model} is a premium vehicle that combines style, performance, and comfort. With its powerful engine, smooth transmission, and advanced features, this {vehicle.bodyType.toLowerCase()} offers an exceptional driving experience. The vehicle has been well-maintained and is in excellent condition, with only {vehicle.mileage.toLocaleString()} miles on the odometer.
                </p>
                <p className="text-slate-700 mt-4">
                  Whether you're looking for a reliable daily driver or a luxury vehicle for special occasions, this {vehicle.make} {vehicle.model} is an excellent choice. It offers a perfect balance of power, efficiency, and comfort, making it ideal for both city driving and long road trips.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing and Contact */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-1">
                    {vehicle.type === 'buy' ? 'Price' : 'Rental Rate'}
                  </p>
                  <div className="flex items-center">
                    <DollarSign size={24} className="text-slate-700" />
                    <span className="text-3xl font-bold text-slate-900">
                      {vehicle.type === 'buy' 
                        ? vehicle.price.toLocaleString() 
                        : vehicle.rentalRate.toLocaleString()}
                    </span>
                    {vehicle.type === 'rent' && (
                      <span className="text-lg text-slate-500 ml-1">/day</span>
                    )}
                  </div>
                  {vehicle.type === 'buy' && (
                    <p className="text-sm text-slate-500 mt-1">
                      Estimated payment: ${Math.round(vehicle.price / 60).toLocaleString()}/mo
                    </p>
                  )}
                </div>

                {/* Contact Form Toggle */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
                  >
                    {showContactForm ? 'Hide Contact Form' : (
                      vehicle.type === 'buy' ? 'Inquire About This Vehicle' : 'Reserve This Vehicle'
                    )}
                  </button>
                  <a
                    href="tel:+18001234567"
                    className="w-full inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-md transition-colors duration-200"
                  >
                    Call Dealer
                  </a>
                </div>

                {/* Contact Form */}
                {showContactForm && (
                  <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={handleContactInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={vehicle.type === 'buy' 
                          ? "I'm interested in this vehicle. Please contact me with more information." 
                          : "I'd like to rent this vehicle. Please let me know about availability."
                        }
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition-colors duration-200"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}

                {/* Additional Info */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <div className="flex items-start mb-4">
                    <Shield size={18} className="text-slate-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900">Vehicle Protection</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        All vehicles come with a 7-day money-back guarantee and a 30-day warranty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check size={18} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900">Verified Vehicle</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        This vehicle has undergone our rigorous 150-point inspection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;