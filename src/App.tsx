import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SkillPage from './components/SkillPage';
import SkillsLibrary from './components/SkillsLibrary';
import LoadingSpinner from './components/LoadingSpinner';
import { AIService } from './services/aiService';
import { generateMetaTags, generateSlug } from './utils/seo';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'skill' | 'library'>('home');
  const [currentSkill, setCurrentSkill] = useState<string | null>(null);
  const [skillContent, setSkillContent] = useState<any>(null);
  const [currentSkillQuery, setCurrentSkillQuery] = useState('');

  const aiService = AIService.getInstance();

  const handleSearch = async (query: string) => {
    setCurrentView('loading');
    setCurrentSkillQuery(query);
    
    try {
      const response = await aiService.generateSkill(query);
      setSkillContent(response);
      
      // Update meta tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.content, 'text/html');
      const title = doc.querySelector('h1')?.textContent || query;
      const description = doc.querySelector('p')?.textContent || `Learn ${query} with step-by-step instructions`;
      const slug = generateSlug(query);
      
      const metaTags = generateMetaTags(title, description, `https://howtoninja.com/how-to-${slug}`);
      
      // Update document title and meta description
      document.title = metaTags.title;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', metaTags.description);
      
      // Update URL without page reload
      const newUrl = `/how-to-${slug}`;
      window.history.pushState({ skill: query }, title, newUrl);
      
      setCurrentView('skill');
    } catch (error) {
      console.error('Error generating skill:', error);
      setCurrentView('home');
    }
  };

  const handleNavigation = (section: string) => {
    if (section === 'home') {
      setCurrentView('home');
      setCurrentSkillQuery('');
      document.title = 'HowTo Ninja - Learn Any Skill in Minutes';
      window.history.pushState({}, 'HowTo Ninja', '/');
    } else if (section === 'categories') {
      setCurrentView('library');
    } else if (section === 'random') {
      const randomSkills = [
        'tie a bow tie',
        'make paper airplane',
        'whistle loudly',
        'solve a rubiks cube',
        'make origami crane',
        'juggle 3 balls',
        'do a cartwheel',
        'make perfect pancakes'
      ];
      const randomSkill = `How to ${randomSkills[Math.floor(Math.random() * randomSkills.length)]}`;
      handleSearch(randomSkill);
    }
  };

  const handleShare = async () => {
    if (navigator.share && currentSkillQuery) {
      try {
        await navigator.share({
          title: `How to ${currentSkillQuery} - HowTo Ninja`,
          text: `Learn how to ${currentSkillQuery} with this step-by-step guide!`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for browsers without native sharing
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    const savedSkills = JSON.parse(localStorage.getItem('savedSkills') || '[]');
    const skillData = {
      query: currentSkillQuery,
      content: skillContent?.content,
      savedAt: new Date().toISOString()
    };
    
    savedSkills.push(skillData);
    localStorage.setItem('savedSkills', JSON.stringify(savedSkills));
    alert('Skill saved to your collection!');
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.skill) {
        handleSearch(event.state.skill);
      } else {
        setCurrentView('home');
        setCurrentSkillQuery('');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize meta tags on app load
  useEffect(() => {
    const defaultMetaDescription = document.querySelector('meta[name="description"]');
    if (!defaultMetaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn any skill in minutes with AI-powered step-by-step guides. Master cooking, tech, life hacks, DIY, and survival skills with HowTo Ninja.';
      document.head.appendChild(meta);
    }

    // Add viewport meta tag if not present
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }
  }, []);

  const handleViewLibrary = () => {
    setCurrentView('library');
  };

  const handleSkillSearch = (query: string) => {
    handleSearch(query);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentSkillQuery('');
    document.title = 'HowTo Ninja - Learn Any Skill in Minutes';
    window.history.pushState({}, 'HowTo Ninja', '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSkillSearch} 
        onNavigate={handleNavigation}
      />
      
      {currentView === 'home' && (
        <HomePage onSkillClick={handleSearch} />
      )}
      
      {currentView === 'loading' && <LoadingSpinner />}
      
      {currentView === 'skill' && skillContent && (
        <SkillPage
          content={skillContent.content}
          estimatedTime={skillContent.estimatedTime}
          onShare={handleShare}
          onSave={handleSave}
        />
      )}

      {currentView === 'library' && (
        <SkillsLibrary onSkillSelect={handleSkillSearch} />
      )}
    </div>
  );
}

export default App;