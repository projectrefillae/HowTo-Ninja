import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChefHat, Laptop, Lightbulb, Hammer, Compass, Heart, Camera, Briefcase, Wrench, MessageCircle, Car, FolderOpen } from 'lucide-react';
import AdBanner from './AdBanner';

interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const skillsData: Skill[] = [
  {
    id: '1',
    title: 'Tie a Perfect Windsor Knot',
    category: 'Life Skills',
    description: 'Master the classic Windsor knot for formal occasions and professional settings.',
    tags: ['fashion', 'professional', 'formal']
  },
  {
    id: '2',
    title: 'Cook Perfect Rice Every Time',
    category: 'Cooking',
    description: 'Learn the foolproof method for fluffy, perfectly cooked rice without a rice cooker.',
    tags: ['cooking', 'basics', 'kitchen']
  },
  {
    id: '3',
    title: 'Speed Read Like a Pro',
    category: 'Learning',
    description: 'Double your reading speed while maintaining comprehension using proven techniques.',
    tags: ['productivity', 'learning', 'skills']
  },
  {
    id: '4',
    title: 'Fix a Leaky Faucet',
    category: 'DIY',
    description: 'Save money by fixing common faucet problems yourself with basic tools.',
    tags: ['home', 'repair', 'plumbing']
  },
  {
    id: '5',
    title: 'Meditate for Inner Peace',
    category: 'Wellness',
    description: 'Start your meditation journey with simple breathing techniques for stress relief.',
    tags: ['mindfulness', 'stress', 'mental health']
  },
  {
    id: '6',
    title: 'Create Strong Passwords',
    category: 'Tech',
    description: 'Protect your digital life with unbreakable passwords and security best practices.',
    tags: ['security', 'privacy', 'digital']
  },
  {
    id: '7',
    title: 'Negotiate Like a Boss',
    category: 'Business',
    description: 'Master negotiation tactics used by top executives and business leaders.',
    tags: ['business', 'communication', 'leadership']
  },
  {
    id: '8',
    title: 'Grow Herbs Indoors',
    category: 'Gardening',
    description: 'Create your own indoor herb garden with minimal space and equipment.',
    tags: ['gardening', 'plants', 'sustainable']
  },
  {
    id: '9',
    title: 'Master Public Speaking',
    category: 'Communication',
    description: 'Overcome fear and deliver compelling presentations that captivate any audience.',
    tags: ['speaking', 'confidence', 'presentation']
  },
  {
    id: '10',
    title: 'Change a Car Tire',
    category: 'Automotive',
    description: 'Essential roadside skill every driver should know for emergency situations.',
    tags: ['automotive', 'emergency', 'safety']
  },
  {
    id: '11',
    title: 'Fold Clothes Like Marie Kondo',
    category: 'Organization',
    description: 'Maximize closet space with the KonMari folding method for perfect organization.',
    tags: ['organization', 'lifestyle', 'efficiency']
  },
  {
    id: '12',
    title: 'Take Professional Photos',
    category: 'Photography',
    description: 'Capture stunning photos with any camera using composition and lighting techniques.',
    tags: ['photography', 'creative', 'visual']
  }
];

const categories = ['All', 'Life Skills', 'Cooking', 'Learning', 'DIY', 'Wellness', 'Tech', 'Business', 'Gardening', 'Communication', 'Automotive', 'Organization', 'Photography'];

interface SkillsLibraryProps {
  onSkillSelect: (skillTitle: string) => void;
}

export default function SkillsLibrary({ onSkillSelect }: SkillsLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedSkills = useMemo(() => {
    let filtered = skillsData.filter(skill => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    return filtered;
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Cooking': ChefHat,
      'Tech': Laptop,
      'Life Skills': Lightbulb,
      'DIY': Hammer,
      'Survival': Compass,
      'Wellness': Heart,
      'Photography': Camera,
      'Business': Briefcase,
      'Learning': Lightbulb,
      'Gardening': Wrench,
      'Communication': MessageCircle,
      'Automotive': Car,
      'Organization': FolderOpen
    };
    return iconMap[category] || Lightbulb;
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-cerulean-200 transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => onSkillSelect(skill.title)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          {(() => {
            const IconComponent = getCategoryIcon(skill.category);
            return <IconComponent className="h-6 w-6 text-cerulean mr-3" />;
          })()}
          <span className="text-xs bg-tea-green-800 text-licorice-600 px-2 py-1 rounded-full">
            {skill.category}
          </span>
        </div>

        <h3 className="font-bold text-licorice text-lg mb-2 group-hover:text-cerulean transition-colors">
          {skill.title}
        </h3>
        <p className="text-licorice-600 text-sm leading-relaxed mb-4">
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {skill.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-tea_green-100 text-tea_green-700 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const SkillListItem = ({ skill }: { skill: Skill }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-cerulean-200 transition-all duration-300 cursor-pointer p-4"
      onClick={() => onSkillSelect(skill.title)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {(() => {
              const IconComponent = getCategoryIcon(skill.category);
              return <IconComponent className="h-5 w-5 text-cerulean" />;
            })()}
            <h3 className="font-bold text-licorice text-lg hover:text-cerulean transition-colors">
              {skill.title}
            </h3>
            <span className="px-2 py-1 bg-tea-green-800 text-licorice-600 rounded-full text-xs font-medium">
              {skill.category}
            </span>
          </div>
          <p className="text-licorice-600 text-sm mb-2">{skill.description}</p>
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner Ad */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <AdBanner 
            slot="1234567890"
            format="horizontal"
            className="text-center"
          />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-licorice mb-2">Skills Library</h1>
              <p className="text-licorice-600">Discover and master new skills with AI-powered guides</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-cerulean text-white' 
                    : 'bg-gray-100 text-licorice-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-cerulean text-white' 
                    : 'bg-gray-100 text-licorice-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-licorice-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills, categories, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cerulean focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cerulean focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-licorice-600">
            Showing {filteredAndSortedSkills.length} of {skillsData.length} skills
          </p>
          
          {/* Mid-Content Ad */}
          <div className="mb-6">
            <AdBanner 
              slot="0987654321"
              format="rectangle"
              className="text-center"
            />
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedSkills.map(skill => (
              <SkillListItem key={skill.id} skill={skill} />
            ))}
          </div>
        )}

        {filteredAndSortedSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-licorice-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-licorice mb-2">No skills found</h3>
            <p className="text-licorice-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}