import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import { generateStructuredData } from '../utils/seo';

interface SkillPageProps {
  content: string;
  estimatedTime: string;
  difficulty?: string;
  onShare: () => void;
  onSave: () => void;
}

export default function SkillPage({ content, estimatedTime, difficulty, onShare, onSave }: SkillPageProps) {
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Parse content to extract structured data
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const title = doc.querySelector('h1')?.textContent || '';
    const introduction = doc.querySelector('p')?.textContent || '';
    const steps = Array.from(doc.querySelectorAll('ol li')).map(li => li.textContent || '');
    
    const structuredData = generateStructuredData(
      { title, introduction, steps, estimatedTime, difficulty },
      window.location.href
    );
    
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [content, estimatedTime, difficulty]);

  // Clean the content to remove any HTML comments or unwanted text
  const cleanContent = content.replace(/```html|```/g, '').trim();

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={onShare}
                  className="flex items-center px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-cerulean-600 transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button
                  onClick={onSave}
                  className="flex items-center px-4 py-2 bg-tea-green-600 text-white rounded-lg hover:bg-tea-green-700 transition-colors"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </button>
              </div>
            </div>

            {/* Skill Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div 
                className="prose prose-lg max-w-none skill-content"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            </div>

            {/* Tips Section (Mobile Collapsible) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setShowTips(!showTips)}
                className="lg:hidden w-full flex items-center justify-between text-left font-semibold text-licorice mb-4"
              >
                Tips & Common Mistakes
                {showTips ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              <div className={`${showTips ? 'block' : 'hidden'} lg:block`}>
                <h3 className="hidden lg:block font-semibold text-licorice mb-4">Tips & Common Mistakes</h3>
                {/* Tips content will be rendered by the main content */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}