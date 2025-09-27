// app/sports/page.js
'use client';

import { useState, useEffect } from 'react';
import ActivityCard from '../../components/ActivityCard';
import { Search, Filter } from 'lucide-react';

export default function SportsPage() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSports, setFilteredSports] = useState([]);

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    const filtered = sports.filter(sport =>
      sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sport.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [sports, searchTerm]);

  const fetchSports = async () => {
    try {
      const response = await fetch('/api/sports');
      const data = await response.json();
      setSports(data);
      setFilteredSports(data);
    } catch (error) {
      console.error('Error fetching sports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sports activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Sports Activities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our diverse range of sports activities and stay fit while having fun!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search sports activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredSports.length} of {sports.length} sports activities
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSports.map((sport) => (
            <ActivityCard 
              key={sport.id} 
              activity={sport} 
              category="sports" 
            />
          ))}
        </div>

        {filteredSports.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sports activities found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}