// app/political-structures/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ActivityForm from '../../../components/ActivityForm';
import { ArrowLeft, Users, Clock, Award, Calendar } from 'lucide-react';

export default function PoliticalStructureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchPoliticalStructure();
    }
  }, [params.id]);

  const fetchPoliticalStructure = async () => {
    try {
      const response = await fetch(`/api/political-structures/${params.id}`);
      if (!response.ok) {
        throw new Error('Political structure not found');
      }
      const data = await response.json();
      setStructure(data);
    } catch (error) {
      console.error('Error fetching political structure:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading political structure details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Structure Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/political-structures')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Back to Political Structures
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/political-structures')}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Political Structures
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Structure Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{structure.name}</h1>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{structure.description}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {structure.term_length && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Term Length</p>
                    <p className="text-sm">{structure.term_length}</p>
                  </div>
                </div>
              )}

              {structure.positions_available && (
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Positions Available</p>
                    <p className="text-sm">{structure.positions_available} positions</p>
                  </div>
                </div>
              )}

              {structure.commitment_level && (
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Commitment Level</p>
                    <p className="text-sm">{structure.commitment_level}</p>
                  </div>
                </div>
              )}

              {structure.election_period && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-medium">Election Period</p>
                    <p className="text-sm">{structure.election_period}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Responsibilities */}
            {structure.responsibilities && structure.responsibilities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {structure.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <div className="h-2 w-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {structure.qualifications && structure.qualifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Qualifications</h3>
                <ul className="space-y-2">
                  {structure.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <div className="h-2 w-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <ActivityForm activity={structure} category="political-structures" />
          </div>
        </div>
      </div>
    </div>
  );
}