import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, DollarSign, Clock } from 'lucide-react';
import { useVehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types';

const FeaturedVehicles = () => {
  const { featuredVehicles } = useVehicleContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const visibleSlides = 3;
  const totalSlides = featuredVehicles.length;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    
    autoScrollRef.current = setInterval(() => {
      if (currentIndex < maxIndex) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
    startAutoScroll();
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => Math.min(maxIndex, prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
    startAutoScroll();
  };

  const getVisibleVehicles = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + visibleSlides, totalSlides);
    return featuredVehicles.slice(startIndex, endIndex);
  };

  return (
    <div className="relative">
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          } transition-colors duration-200`}
          aria-label="Previous vehicles"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`p-2 rounded-full ${
            currentIndex >= maxIndex
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          } transition-colors duration-200`}
          aria-label="Next vehicles"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div 
        ref={slideContainerRef}
        className="relative overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
        >
          {featuredVehicles.map((vehicle) => (
            <div 
              key={vehicle.id}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
            >
              <Link 
                to={`/vehicles/${vehicle.id}`} 
                className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium m-2 rounded">
                    {vehicle.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center text-slate-700 mb-3">
                    <span>{vehicle.mileage.toLocaleString()} miles • {vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {vehicle.type === 'buy' ? (
                      <div className="flex items-center text-slate-900 font-bold">
                        <DollarSign size={16} className="text-slate-700" />
                        <span>{vehicle.price.toLocaleString()}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-slate-900 font-bold">
                        <DollarSign size={16} className="text-slate-700" />
                        <span>{vehicle.rentalRate.toLocaleString()}</span>
                        <span className="text-sm font-normal text-slate-500 ml-1">/day</span>
                      </div>
                    )}
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm">
                      {vehicle.fuelType}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-red-500' : 'bg-slate-300'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              startAutoScroll();
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedVehicles;