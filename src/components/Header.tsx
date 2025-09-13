import React, { useState } from 'react';
import { Search, Menu, X, Zap, Home, Grid3X3, Shuffle } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

export default function Header({ onSearch, onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const navItems = [
    { label: 'Home', icon: Home, section: 'home' },
    { label: 'Categories', icon: Grid3X3, section: 'categories' },
    { label: 'Random Skill', icon: Shuffle, section: 'random' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      {/* Top Banner Ad Container */}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-cerulean p-2 rounded-lg mr-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-licorice">HowTo Ninja</h1>
              <p className="text-xs text-licorice-600 hidden sm:block">Learn Any Skill</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="How to..."
                  className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cerulean text-white p-2 rounded-full hover:bg-cerulean-600 transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-licorice-700 hover:bg-tea-green-800 hover:text-cerulean transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-licorice-700 hover:bg-tea-green-800"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="How to..."
                className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cerulean text-white p-2 rounded-full hover:bg-cerulean-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-licorice-700 hover:bg-tea-green-800 hover:text-cerulean transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}