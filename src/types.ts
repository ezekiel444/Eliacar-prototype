export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  rentalRate: number;
  mileage: number;
  image: string;
  type: 'buy' | 'rent';
  transmission: string;
  fuelType: string;
  bodyType: string;
  location: string;
  featured: boolean;
}