import React, { useState } from 'react';
import { Home, Search as SearchIcon, MapPin, Sliders, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockRoommates = [
  {
    id: 1,
    name: "Karolina Wiśniewska",
    age: 24,
    location: "Warszawa, Mokotów",
    budget: "2000-2500 zł",
    occupation: "Grafik",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    interests: ["sport", "fotografia", "podróże"],
  },
  {
    id: 2,
    name: "Tomasz Kowalczyk",
    age: 26,
    location: "Warszawa, Wola",
    budget: "1800-2200 zł",
    occupation: "Programista",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    interests: ["muzyka", "gaming", "gotowanie"],
  },
  {
    id: 3,
    name: "Magdalena Nowak",
    age: 23,
    location: "Warszawa, Praga",
    budget: "1500-2000 zł",
    occupation: "Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    interests: ["książki", "yoga", "kino"],
  },
];

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Warszawa");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600">Powrót</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Cooliv</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj po nazwie, zainteresowaniach..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="Warszawa">Warszawa</option>
              <option value="Kraków">Kraków</option>
              <option value="Wrocław">Wrocław</option>
              <option value="Poznań">Poznań</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Sliders className="w-5 h-5 text-gray-600" />
            <span>Filtry</span>
          </button>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRoommates.map((roommate) => (
            <div key={roommate.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={roommate.image}
                alt={roommate.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{roommate.name}</h3>
                    <p className="text-gray-600">{roommate.age} lat</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {roommate.budget}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {roommate.location}
                  </div>
                  <p className="text-gray-600">{roommate.occupation}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roommate.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Kontakt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;