import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Car } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/vehicles?type=buy' },
    { name: 'Rent', path: '/vehicles?type=rent' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <Car size={30} className="text-red-500" />
            <span className="text-xl font-bold text-white">Eliacars</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path || 
                  (link.path.includes('?type=') && location.pathname + location.search === link.path)
                    ? 'text-red-500'
                    : 'text-white hover:text-red-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Login/Sign Up - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-white hover:text-red-400 transition-colors duration-200">
              Log In
            </Link>
            <Link to="/register" className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-slate-900 shadow-xl transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium px-2 py-2 rounded-md ${
                  location.pathname === link.path || 
                  (link.path.includes('?type=') && location.pathname + location.search === link.path)
                    ? 'text-red-500 bg-slate-800'
                    : 'text-white hover:bg-slate-800 hover:text-red-400'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 space-y-3">
              <Link 
                to="/login"
                className="block text-white hover:text-red-400 transition-colors duration-200" 
                onClick={closeMenu}
              >
                Log In
              </Link>
              <Link 
                to="/register"
                className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 px-4 rounded-md transition-colors duration-200" 
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;