// app/societies/page.js
'use client';

import { useState, useEffect } from 'react';
import ActivityCard from '../../components/ActivityCard';
import { Search } from 'lucide-react';

export default function SocietiesPage() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSocieties, setFilteredSocieties] = useState([]);

  useEffect(() => {
    fetchSocieties();
  }, []);

  useEffect(() => {
    const filtered = societies.filter(society =>
      society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      society.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSocieties(filtered);
  }, [societies, searchTerm]);

  const fetchSocieties = async () => {
    try {
      const response = await fetch('/api/societies');
      const data = await response.json();
      setSocieties(data);
      setFilteredSocieties(data);
    } catch (error) {
      console.error('Error fetching societies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading societies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Student Societies</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover clubs and societies that match your interests and passions!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search societies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredSocieties.length} of {societies.length} societies
          </p>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSocieties.map((society) => (
            <ActivityCard 
              key={society.id} 
              activity={society} 
              category="societies" 
            />
          ))}
        </div>

        {filteredSocieties.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No societies found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}