import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, Gauge, Briefcase, Star } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium m-2 rounded">
          {vehicle.type === 'rent' ? 'For Rent' : 'For Sale'}
        </div>
        {vehicle.featured && (
          <div className="absolute top-0 left-0 bg-yellow-500 text-white px-3 py-1 text-sm font-medium m-2 rounded flex items-center">
            <Star size={14} className="mr-1" />
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-slate-700 text-sm">
            <Calendar size={14} className="mr-1 text-slate-500" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center text-slate-700 text-sm">
            <Gauge size={14} className="mr-1 text-slate-500" />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-slate-700 text-sm">
            <Briefcase size={14} className="mr-1 text-slate-500" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-slate-700 text-sm">
            <span className="inline-block w-3 h-3 bg-slate-200 rounded-full mr-1"></span>
            <span>{vehicle.fuelType}</span>
          </div>
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
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">
            {vehicle.location}
          </span>
          <span className="text-red-500 text-sm font-medium">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;