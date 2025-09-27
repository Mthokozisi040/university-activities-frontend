// components/ActivityCard.jsx
import Link from 'next/link';
import { 
  Football, 
  Users, 
  Scale, 
  Music, 
  BookOpen, 
  Camera,
  Mic,
  Heart,
  Code,
  Palette
} from 'lucide-react';

const iconMap = {
  football: Football,
  basketball: Football, // Using Football as placeholder
  tennis: Football,
  debate: Mic,
  photography: Camera,
  music: Music,
  book: BookOpen,
  art: Palette,
  coding: Code,
  volunteer: Heart,
  government: Scale,
  student_council: Users,
  political_party: Scale
};

export default function ActivityCard({ activity, category }) {
  const IconComponent = iconMap[activity.icon] || Users;
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-800">{activity.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-6 line-clamp-3">{activity.description}</p>
      
      <Link 
        href={`/${category}/${activity.id}`}
        className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
      >
        Join Now
      </Link>
    </div>
  );
}