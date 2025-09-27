// app/political-structures/page.js
'use client';

import { useState, useEffect } from 'react';
import ActivityCard from '../../components/ActivityCard';
import { Search } from 'lucide-react';

export default function PoliticalStructuresPage() {
  const [politicalStructures, setPoliticalStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStructures, setFilteredStructures] = useState([]);

  useEffect(() => {
    fetchPoliticalStructures();
  }, []);

  useEffect(() => {
    const filtered = politicalStructures.filter(structure =>
      structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      structure.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStructures(filtered);
  }, [politicalStructures, searchTerm]);

  const fetchPoliticalStructures = async () => {
    try {
      const response = await fetch('/api/political-structures');
      const data = await response.json();
      setPoliticalStructures(data);
      setFilteredStructures(data);
    } catch (error) {
      console.error('Error fetching political structures:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading political structures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Political Structures</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get involved in student governance and make a difference in your campus community!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search political structures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredStructures.length} of {politicalStructures.length} political structures
          </p>
        </div>

        {/* Political Structures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStructures.map((structure) => (
            <ActivityCard 
              key={structure.id} 
              activity={structure} 
              category="political-structures" 
            />
          ))}
        </div>

        {filteredStructures.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No political structures found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}