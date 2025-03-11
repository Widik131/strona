import React, { useState } from 'react';
import { Search, MapPin, BedDouble, DollarSign, Filter, Grid, List, Bath, Wifi, Tv, Car, Dog } from 'lucide-react';

type Offer = {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  rooms: number;
  description: string;
  amenities: string[];
};

const SAMPLE_OFFERS: Offer[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600",
    title: "Modern Apartment in City Center",
    location: "Downtown Area",
    price: 800,
    rooms: 3,
    description: "Spacious apartment with great city views, perfect for young professionals",
    amenities: ["wifi", "parking", "tv"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
    title: "Cozy Studio near University",
    location: "University District",
    price: 600,
    rooms: 1,
    description: "Perfect for students, all utilities included",
    amenities: ["wifi", "tv"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600",
    title: "Shared House with Garden",
    location: "Suburban Area",
    price: 700,
    rooms: 4,
    description: "Large house with garden, pet-friendly environment",
    amenities: ["wifi", "parking", "tv", "pets"]
  }
];

function App() {
  const [isGridView, setIsGridView] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [rooms, setRooms] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-800">Find Your Perfect Roommate</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Panel */}
          <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Filter size={24} />
              Filters
            </h2>

            {/* Location Filter */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <MapPin size={18} />
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location..."
                />
                <Search className="absolute right-4 top-3.5 text-slate-400" size={20} />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <DollarSign size={18} />
                Price Range
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rooms Filter */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <BedDouble size={18} />
                Rooms
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setRooms(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold text-slate-700">{rooms}</span>
                <button
                  onClick={() => setRooms(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Amenities Filter */}
            <div>
              <label className="block text-base font-semibold text-slate-700 mb-3">
                Amenities
              </label>
              <div className="space-y-3">
                {[
                  { icon: <Wifi size={18} />, label: 'WiFi', value: 'wifi' },
                  { icon: <Car size={18} />, label: 'Parking', value: 'parking' },
                  { icon: <Tv size={18} />, label: 'TV', value: 'tv' },
                  { icon: <Bath size={18} />, label: 'Private Bathroom', value: 'bathroom' },
                  { icon: <Dog size={18} />, label: 'Pet Friendly', value: 'pets' },
                ].map((amenity) => (
                  <label
                    key={amenity.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.value)}
                      onChange={() => toggleAmenity(amenity.value)}
                      className="w-5 h-5 rounded border-2 border-slate-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="flex items-center gap-2 text-base text-slate-700 group-hover:text-slate-900">
                      {amenity.icon} {amenity.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Offers Listing */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* View Toggle and Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg font-semibold text-slate-700">{SAMPLE_OFFERS.length} results found</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2.5 rounded-lg transition-colors ${isGridView ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <Grid size={22} />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2.5 rounded-lg transition-colors ${!isGridView ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <List size={22} />
                  </button>
                </div>
              </div>

              {/* Offers Grid/List */}
              <div className={`${isGridView ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}`}>
                {SAMPLE_OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className={`bg-white rounded-xl border-2 border-slate-100 transition-all hover:shadow-lg hover:border-blue-100
                      ${isGridView ? '' : 'flex gap-6'}`}
                  >
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className={`rounded-t-xl object-cover
                        ${isGridView ? 'w-full h-56' : 'w-56 h-full rounded-l-xl rounded-t-none'}`}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{offer.title}</h3>
                      <p className="text-slate-600 flex items-center gap-2 mb-3">
                        <MapPin size={18} /> {offer.location}
                      </p>
                      <p className="text-slate-600 mb-4 line-clamp-2">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-blue-600">${offer.price}<span className="text-base font-normal text-slate-600">/month</span></p>
                        <div className="flex gap-2">
                          {offer.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;