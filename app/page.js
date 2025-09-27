// app/page.js
import Link from 'next/link'
import { Trophy, Users, Scale, ArrowRight, Star, Clock, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Discover Your University Experience
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join sports teams, societies, and political structures that match your interests and passions. 
            Make lasting connections and create unforgettable memories during your university journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sports"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Explore Activities
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
            Choose Your Path
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sports Card */}
            <Link href="/sports" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
                <div className="bg-blue-600 p-4 rounded-xl w-fit mb-6 group-hover:bg-blue-700 transition-colors">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sports</h3>
                <p className="text-gray-600 mb-6">
                  Join competitive sports teams, improve your fitness, and represent your university in tournaments.
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  <span>Explore Sports</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Societies Card */}
            <Link href="/societies" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200">
                <div className="bg-green-600 p-4 rounded-xl w-fit mb-6 group-hover:bg-green-700 transition-colors">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Societies</h3>
                <p className="text-gray-600 mb-6">
                  Connect with like-minded individuals, pursue hobbies, and develop new skills in various clubs.
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Join Societies</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Political Structures Card */}
            <Link href="/political-structures" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-200">
                <div className="bg-purple-600 p-4 rounded-xl w-fit mb-6 group-hover:bg-purple-700 transition-colors">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Political Structures</h3>
                <p className="text-gray-600 mb-6">
                  Make a difference in campus life by joining student government and advocacy organizations.
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  <span>Get Involved</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
            Why Join University Activities?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Skills</h3>
              <p className="text-gray-600">Develop leadership, teamwork, and specialized skills that enhance your resume.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Make Friends</h3>
              <p className="text-gray-600">Connect with students who share your interests and build lasting friendships.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Find activities that fit your academic schedule and time commitments.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Campus Integration</h3>
              <p className="text-gray-600">Become an integral part of campus life and university community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Active Sports Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Student Societies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Leadership Positions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Active Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Get Involved?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't miss out on the full university experience. Browse our activities and find your perfect match today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sports"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Browse All Activities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}