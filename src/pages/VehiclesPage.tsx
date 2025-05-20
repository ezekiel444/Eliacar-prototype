import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { useVehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types';
import VehicleCard from '../components/VehicleCard';
import SearchBar from '../components/SearchBar';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

const VehiclesPage = () => {
  const { vehicles } = useVehicleContext();
  const [searchParams] = useSearchParams();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    transmission: '',
    bodyType: '',
    fuelType: '',
  });

  const type = searchParams.get('type') || 'buy';
  const make = searchParams.get('make') || '';
  const model = searchParams.get('model') || '';
  const minYear = searchParams.get('minYear') || '';
  const maxYear = searchParams.get('maxYear') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    let result = vehicles.filter(vehicle => {
      if (type && vehicle.type !== type) return false;
      if (make && !vehicle.make.toLowerCase().includes(make.toLowerCase())) return false;
      if (model && !vehicle.model.toLowerCase().includes(model.toLowerCase())) return false;
      if (minYear && vehicle.year < parseInt(minYear)) return false;
      if (maxYear && vehicle.year > parseInt(maxYear)) return false;
      if (minPrice && (type === 'buy' ? vehicle.price < parseInt(minPrice) : vehicle.rentalRate < parseInt(minPrice))) return false;
      if (maxPrice && (type === 'buy' ? vehicle.price > parseInt(maxPrice) : vehicle.rentalRate > parseInt(maxPrice))) return false;
      if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
      if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false;
      if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
      return true;
    });

    // Sort the vehicles
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return type === 'buy' 
            ? a.price - b.price 
            : a.rentalRate - b.rentalRate;
        case 'price-desc':
          return type === 'buy' 
            ? b.price - a.price 
            : b.rentalRate - a.rentalRate;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        default:
          return 0;
      }
    });

    setFilteredVehicles(result);
  }, [vehicles, type, make, model, minYear, maxYear, minPrice, maxPrice, filters, sortOption]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      transmission: '',
      bodyType: '',
      fuelType: '',
    });
  };

  const sortOptions = [
    { value: 'price-asc', label: `${type === 'buy' ? 'Price' : 'Rate'}: Low to High` },
    { value: 'price-desc', label: `${type === 'buy' ? 'Price' : 'Rate'}: High to Low` },
    { value: 'year-desc', label: 'Year: Newest First' },
    { value: 'year-asc', label: 'Year: Oldest First' },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-lg p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {type === 'buy' ? 'Cars for Sale' : 'Cars for Rent'}
          </h1>
          <p className="text-slate-300 mb-6">
            Find the perfect vehicle that meets all your needs
          </p>
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-md p-3 shadow-sm"
            >
              <div className="flex items-center">
                <SlidersHorizontal size={18} className="mr-2 text-slate-600" />
                <span>Filters</span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {showFilters && (
              <div className="bg-white border border-gray-200 rounded-md p-4 mt-2 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={filters.transmission}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Any Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body Type
                    </label>
                    <select
                      name="bodyType"
                      value={filters.bodyType}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Any Body Type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Hatchback">Hatchback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </label>
                    <select
                      name="fuelType"
                      value={filters.fuelType}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Any Fuel Type</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-md transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Any Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Type
                  </label>
                  <select
                    name="bodyType"
                    value={filters.bodyType}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Any Body Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Any Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-md transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-slate-700 mb-3 sm:mb-0">
                <span className="font-medium">{filteredVehicles.length}</span> vehicles found
              </p>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full sm:w-auto appearance-none border border-gray-300 rounded-md py-2 pl-4 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Results */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No vehicles found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your filters or search criteria to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;