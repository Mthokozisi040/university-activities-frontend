// app/sports/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ActivityForm from '../../../components/ActivityForm';
import { ArrowLeft, Users, Clock, MapPin } from 'lucide-react';

export default function SportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchSport();
    }
  }, [params.id]);

  const fetchSport = async () => {
    try {
      const response = await fetch(`/api/sports/${params.id}`);
      if (!response.ok) {
        throw new Error('Sport not found');
      }
      const data = await response.json();
      setSport(data);
    } catch (error) {
      console.error('Error fetching sport:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sport details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sport Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/sports')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Sports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/sports')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Sports
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sport Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{sport.name}</h1>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{sport.description}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {sport.schedule && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Schedule</p>
                    <p className="text-sm">{sport.schedule}</p>
                  </div>
                </div>
              )}

              {sport.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{sport.location}</p>
                  </div>
                </div>
              )}

              {sport.team_size && (
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Team Size</p>
                    <p className="text-sm">{sport.team_size}</p>
                  </div>
                </div>
              )}

              {sport.difficulty && (
                <div className="flex items-center text-gray-600">
                  <div className="h-5 w-5 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="font-medium">Difficulty</p>
                    <p className="text-sm">{sport.difficulty}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Features or Requirements */}
            {sport.features && sport.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {sport.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <ActivityForm activity={sport} category="sports" />
          </div>
        </div>
      </div>
    </div>
  );
}