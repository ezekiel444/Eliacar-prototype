import React, { createContext, useContext, ReactNode } from 'react';
import { Vehicle } from '../types';

interface VehicleContextType {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  getVehicleById: (id: string) => Vehicle | undefined;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
};

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  // Mock data for vehicles
  const vehicles: Vehicle[] = [
    {
      id: '1',
      make: 'BMW',
      model: 'M5 Competition',
      year: 2023,
      price: 110995,
      rentalRate: 299,
      mileage: 1250,
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Sedan',
      location: 'Los Angeles, CA',
      featured: true
    },
    {
      id: '2',
      make: 'Mercedes-Benz',
      model: 'S-Class',
      year: 2023,
      price: 115000,
      rentalRate: 325,
      mileage: 2500,
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      bodyType: 'Sedan',
      location: 'Miami, FL',
      featured: true
    },
    {
      id: '3',
      make: 'Audi',
      model: 'RS7',
      year: 2022,
      price: 125000,
      rentalRate: 289,
      mileage: 5600,
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Coupe',
      location: 'New York, NY',
      featured: true
    },
    {
      id: '4',
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: 215000,
      rentalRate: 450,
      mileage: 350,
      image: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Coupe',
      location: 'Las Vegas, NV',
      featured: true
    },
    {
      id: '5',
      make: 'Lamborghini',
      model: 'Urus',
      year: 2022,
      price: 229495,
      rentalRate: 599,
      mileage: 3200,
      image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'SUV',
      location: 'Miami, FL',
      featured: true
    },
    {
      id: '6',
      make: 'Tesla',
      model: 'Model S Plaid',
      year: 2023,
      price: 129990,
      rentalRate: 249,
      mileage: 1800,
      image: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'buy',
      transmission: 'Automatic',
      fuelType: 'Electric',
      bodyType: 'Sedan',
      location: 'San Francisco, CA',
      featured: false
    },
    {
      id: '7',
      make: 'Range Rover',
      model: 'Sport',
      year: 2023,
      price: 95000,
      rentalRate: 275,
      mileage: 4500,
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      bodyType: 'SUV',
      location: 'Chicago, IL',
      featured: true
    },
    {
      id: '8',
      make: 'Ferrari',
      model: 'F8 Tributo',
      year: 2022,
      price: 276550,
      rentalRate: 799,
      mileage: 1200,
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Coupe',
      location: 'Los Angeles, CA',
      featured: true
    },
    {
      id: '9',
      make: 'Bentley',
      model: 'Continental GT',
      year: 2023,
      price: 235000,
      rentalRate: 599,
      mileage: 2100,
      image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Coupe',
      location: 'New York, NY',
      featured: true
    },
    {
      id: '10',
      make: 'Lexus',
      model: 'LS 500h',
      year: 2022,
      price: 82000,
      rentalRate: 199,
      mileage: 8500,
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      bodyType: 'Sedan',
      location: 'Dallas, TX',
      featured: false
    },
    {
      id: '11',
      make: 'Porsche',
      model: 'Taycan',
      year: 2023,
      price: 105150,
      rentalRate: 299,
      mileage: 1500,
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Electric',
      bodyType: 'Sedan',
      location: 'San Francisco, CA',
      featured: false
    },
    {
      id: '12',
      make: 'Maserati',
      model: 'GranTurismo',
      year: 2022,
      price: 172000,
      rentalRate: 389,
      mileage: 3200,
      image: 'https://images.pexels.com/photos/7621733/pexels-photo-7621733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'rent',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      bodyType: 'Coupe',
      location: 'Miami, FL',
      featured: false
    }
  ];

  const featuredVehicles = vehicles.filter(vehicle => vehicle.featured);

  const getVehicleById = (id: string) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  return (
    <VehicleContext.Provider value={{ vehicles, featuredVehicles, getVehicleById }}>
      {children}
    </VehicleContext.Provider>
  );
};