import React, { useState } from 'react';
import { Phone, Mail, X } from 'lucide-react';

const ContactBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would submit the form data to a server
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    // Close contact form
    setIsOpen(false);
    // Show success message
    alert('Your message has been sent. We will contact you shortly.');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Contact Form */}
      <div
        className={`bg-white shadow-lg border-t border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900">Contact Us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close contact form"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex space-x-4 md:space-x-8">
              <a
                href="tel:+18001234567"
                className="inline-flex items-center text-sm hover:text-red-400 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                <span className="hidden md:inline">1-800-123-4567</span>
              </a>
              <a
                href="mailto:info@premiumauto.com"
                className="inline-flex items-center text-sm hover:text-red-400 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                <span className="hidden md:inline">info@premiumauto.com</span>
              </a>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;