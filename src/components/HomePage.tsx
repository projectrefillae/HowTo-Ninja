import React, { useState } from 'react';
import { TrendingUp, Clock, Users, Star, ArrowRight, Zap, ChefHat, Laptop, Lightbulb, Hammer, Compass, Heart } from 'lucide-react';
import AdBanner from './AdBanner';

interface HomePageProps {
  onSkillClick: (skill: string) => void;
}

export default function HomePage({ onSkillClick }: HomePageProps) {
  const categories = [
    { name: 'Cooking', icon: ChefHat, color: 'bg-vermilion' },
    { name: 'Tech', icon: Laptop, color: 'bg-cerulean' },
    { name: 'Life Hacks', icon: Lightbulb, color: 'bg-tea-green' },
    { name: 'DIY', icon: Hammer, color: 'bg-auburn' },
    { name: 'Survival', icon: Compass, color: 'bg-tea-green-600' },
    { name: 'Health', icon: Heart, color: 'bg-vermilion-600' }
  ];

  const trendingSkills = [
    { title: 'How to tie a tie', category: 'Life Hacks' },
    { title: 'How to cook perfect rice', category: 'Cooking' },
    { title: 'How to speed up your computer', category: 'Tech' },
    { title: 'How to remove stains from clothes', category: 'Life Hacks' },
    { title: 'How to change a tire', category: 'Survival' },
    { title: 'How to fold a fitted sheet', category: 'Life Hacks' }
  ];

  const recentSkills = [
    'How to make coffee',
    'How to meditate',
    'How to backup photos',
    'How to plant seeds'
  ];

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cerulean to-cerulean-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-2xl">
              <Zap className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Any Skill in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            AI-powered micro-lessons that teach you exactly what you need to know, when you need to know it.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-licorice">Popular Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onSkillClick(`${category.name} skills`)}
              >
                <div className="mb-3 flex justify-center">
                  <category.icon className="h-8 w-8 text-licorice" />
                </div>
                <h3 className="font-semibold text-licorice mb-2 group-hover:text-cerulean">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Skills */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-cerulean mr-3" />
              <h2 className="text-3xl font-bold text-licorice">Trending Skills</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onSkillClick(skill.title)}
              >
                <div className="mb-4">
                  <span className="text-xs bg-tea-green-800 text-licorice-600 px-2 py-1 rounded-full">
                    {skill.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-licorice mb-3 group-hover:text-cerulean">
                  {skill.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Mid-Content Ad */}
        <section className="mb-16">
          <AdBanner 
            slot="0987654321"
            format="rectangle"
            className="text-center"
          />
        </section>

        {/* Recent Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-licorice mb-6">Recently Learned Skills</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-cerulean-300 cursor-pointer transition-colors group"
                  onClick={() => onSkillClick(skill)}
                >
                  <p className="font-medium text-licorice group-hover:text-cerulean">
                    {skill}
                  </p>
                  <p className="text-sm text-licorice-600 mt-1">Completed</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-cerulean to-cerulean-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-xl text-cerulean-100 mb-6">
            Search for any skill above and get instant, AI-powered step-by-step instructions.
          </p>
        </section>
      </div>
    </div>
  );
}