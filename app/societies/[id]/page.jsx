// app/societies/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ActivityForm from '../../../components/ActivityForm';
import { ArrowLeft, Users, Clock, MapPin, Calendar } from 'lucide-react';

export default function SocietyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchSociety();
    }
  }, [params.id]);

  const fetchSociety = async () => {
    try {
      const response = await fetch(`/api/societies/${params.id}`);
      if (!response.ok) {
        throw new Error('Society not found');
      }
      const data = await response.json();
      setSociety(data);
    } catch (error) {
      console.error('Error fetching society:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading society details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Society Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/societies')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Back to Societies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/societies')}
          className="flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Societies
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Society Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{society.name}</h1>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{society.description}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {society.meeting_schedule && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-medium">Meetings</p>
                    <p className="text-sm">{society.meeting_schedule}</p>
                  </div>
                </div>
              )}

              {society.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{society.location}</p>
                  </div>
                </div>
              )}

              {society.member_count && (
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-medium">Members</p>
                    <p className="text-sm">{society.member_count} active members</p>
                  </div>
                </div>
              )}

              {society.founded && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-medium">Founded</p>
                    <p className="text-sm">{society.founded}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Activities or Benefits */}
            {society.activities && society.activities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What We Do</h3>
                <ul className="space-y-2">
                  {society.activities.map((activity, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="h-2 w-2 bg-green-600 rounded-full mr-3"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {society.benefits && society.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Member Benefits</h3>
                <ul className="space-y-2">
                  {society.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <ActivityForm activity={society} category="societies" />
          </div>
        </div>
      </div>
    </div>
  );
}