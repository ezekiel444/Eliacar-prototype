import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('buy');
  const [searchParams, setSearchParams] = useState({
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.append('type', type);
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    
    navigate(`/vehicles?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="inline-flex rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => setType('buy')}
                className={`px-6 py-3 text-sm font-medium ${
                  type === 'buy'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setType('rent')}
                className={`px-6 py-3 text-sm font-medium ${
                  type === 'rent'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                Rent
              </button>
            </div>
          </div>

          <div className="flex-1">
            <select
              name="make"
              value={searchParams.make}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Any Make</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Tesla">Tesla</option>
              <option value="Porsche">Porsche</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Bentley">Bentley</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={searchParams.model}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex-none">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-slate-600 hover:text-red-500 inline-flex items-center"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced search
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform duration-200 ${
                showAdvanced ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Year</label>
              <input
                type="number"
                name="minYear"
                placeholder="Min Year"
                value={searchParams.minYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Year</label>
              <input
                type="number"
                name="maxYear"
                placeholder="Max Year"
                value={searchParams.maxYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={searchParams.minPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={searchParams.maxPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;