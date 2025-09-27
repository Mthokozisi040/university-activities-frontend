// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, Trophy, Users, Scale } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'University Activities Platform',
  description: 'Join sports, societies, and political structures at your university',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-800">UniActivities</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                  <Link 
                    href="/sports" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Trophy className="h-5 w-5" />
                    <span className="font-medium">Sports</span>
                  </Link>
                  <Link 
                    href="/societies" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Societies</span>
                  </Link>
                  <Link 
                    href="/political-structures" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  >
                    <Scale className="h-5 w-5" />
                    <span className="font-medium">Political Structures</span>
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden pb-4">
                <Link 
                  href="/sports" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-2 transition-colors duration-200"
                >
                  <Trophy className="h-5 w-5" />
                  <span>Sports</span>
                </Link>
                <Link 
                  href="/societies" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 py-2 transition-colors duration-200"
                >
                  <Users className="h-5 w-5" />
                  <span>Societies</span>
                </Link>
                <Link 
                  href="/political-structures" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 py-2 transition-colors duration-200"
                >
                  <Scale className="h-5 w-5" />
                  <span>Political Structures</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">UniActivities</h3>
                  <p className="text-gray-300">
                    Your gateway to university life. Join sports, societies, and political structures.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link></li>
                    <li><Link href="/societies" className="text-gray-300 hover:text-white transition-colors">Societies</Link></li>
                    <li><Link href="/political-structures" className="text-gray-300 hover:text-white transition-colors">Political Structures</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <p className="text-gray-300">
                    Student Activities Office<br />
                    University Campus<br />
                    activities@university.edu
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 University Activities Platform. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}