// Enhanced AI Service with better debugging and error handling

export class AIService {
  private static instance: AIService;
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    console.log('🔑 API Key Status:', {
      hasKey: !!this.apiKey,
      keyLength: this.apiKey.length,
      keyPrefix: this.apiKey.substring(0, 7) + '...',
      environment: import.meta.env.MODE
    });
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateSkill(query: string): Promise<any> {
    console.log('🚀 Generating skill for:', query);
    
    // Check if API key is available and valid
    if (!this.apiKey || this.apiKey.trim() === '' || this.apiKey === 'undefined' || this.apiKey === 'your_openai_api_key_here') {
      console.warn('⚠️ No valid API key found, using fallback response');
      return this.getFallbackResponse(query);
    }

    try {
      console.log('🤖 Making OpenAI API request...');
      
      const requestBody = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are HowTo Ninja, an expert tutorial creator. Create comprehensive, SEO-optimized step-by-step guides. 

IMPORTANT: Return ONLY clean HTML content without any markdown code blocks, backticks, or "html" tags.

Format your response as clean HTML with:
- H1 for title (include "How to" in the title)
- P for introduction (SEO-friendly, 2-3 sentences with relevant keywords)
- H2 for "Step-by-Step Instructions"
- OL with LI for each step (detailed, actionable steps with specific instructions)
- H2 for "Pro Tips & Best Practices"
- UL with LI for tips (practical advice and expert recommendations)
- H2 for "Common Mistakes to Avoid"
- UL with LI for warnings (what NOT to do)
- H2 for "Conclusion"
- P for conclusion (brief summary and encouragement)

Make it comprehensive, practical, and SEO-friendly. Use natural language with relevant keywords. Each step should be detailed and actionable.`
          },
          {
            role: 'user',
            content: `Create a comprehensive tutorial for: ${query}`
          }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      };

      console.log('📤 Request payload:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📥 API Response status:', response.status);
      console.log('📥 API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Success! Response:', data);

      const content = data.choices[0].message.content;
      console.log('📝 Generated content length:', content.length);

      return {
        content: content,
        estimatedTime: this.estimateTime(query),
        difficulty: this.estimateDifficulty(query)
      };

    } catch (error) {
      console.error('💥 AI API Error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Fall back to demo response if API fails
      console.log('🔄 Falling back to demo response');
      return this.getFallbackResponse(query);
    }
  }

  private getFallbackResponse(query: string) {
    console.log('📋 Using fallback response for:', query);
    
    const cleanQuery = query.toLowerCase().replace(/^how to /, '');
    const capitalizedQuery = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
    
    return {
      content: `
        <h1>How to ${capitalizedQuery}</h1>
        <p>Master the art of ${cleanQuery} with this comprehensive step-by-step guide. This essential skill can transform your daily routine and boost your confidence. Our expert-crafted instructions will help you achieve professional results every time.</p>
        
        <h2>Step-by-Step Instructions</h2>
        <ol>
          <li><strong>Prepare your workspace:</strong> Gather all necessary materials and tools. Ensure you have a clean, well-lit area with adequate room to work comfortably. Organization at this stage prevents mistakes later.</li>
          <li><strong>Master the fundamentals:</strong> Begin with the foundational technique. Take time to understand the basic principles and practice the core movements before advancing to complex steps.</li>
          <li><strong>Execute the main technique:</strong> Apply the primary method systematically, following each step in sequence. Pay close attention to detail and maintain consistency throughout the entire process.</li>
          <li><strong>Monitor and adjust:</strong> Regularly check your progress and make small adjustments as needed. This ensures you stay on track and achieve the desired outcome.</li>
          <li><strong>Apply finishing touches:</strong> Complete the final steps with precision and care. These finishing details often distinguish amateur results from professional-quality work.</li>
          <li><strong>Review and perfect:</strong> Evaluate your results and identify areas for improvement. Practice regularly to develop muscle memory and refine your technique over time.</li>
        </ol>

        <h2>Pro Tips & Best Practices</h2>
        <ul>
          <li><strong>Quality over speed:</strong> Take your time and focus on proper technique rather than rushing through the process. Precision leads to better results.</li>
          <li><strong>Practice consistently:</strong> Regular practice builds muscle memory and improves your skills exponentially. Set aside dedicated time for improvement.</li>
          <li><strong>Use quality tools:</strong> Invest in good materials and equipment when possible. Quality tools make a significant difference in the final outcome.</li>
          <li><strong>Learn from experts:</strong> Study techniques used by professionals and incorporate their methods into your own practice routine.</li>
          <li><strong>Document your progress:</strong> Keep track of what works and what doesn't. This helps you refine your approach over time.</li>
        </ul>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li><strong>Skipping preparation:</strong> Rushing into the main steps without proper setup often leads to preventable errors and subpar results.</li>
          <li><strong>Ignoring safety measures:</strong> Always prioritize safety and follow recommended precautions to prevent accidents or damage.</li>
          <li><strong>Not following the sequence:</strong> Each step builds on the previous one. Skipping or rearranging steps can compromise the entire process.</li>
          <li><strong>Using poor quality materials:</strong> Cheap or inappropriate materials can sabotage even perfect technique and waste your time and effort.</li>
          <li><strong>Getting discouraged by mistakes:</strong> Every expert was once a beginner. Learn from errors rather than letting them discourage continued practice.</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Mastering how to ${cleanQuery} requires patience, practice, and attention to detail. By following these comprehensive instructions and avoiding common pitfalls, you'll develop the confidence and skills needed to achieve professional results. Remember that expertise comes through consistent practice and a willingness to learn from each attempt. Start practicing today and watch your skills improve with each session.</p>
      `,
      estimatedTime: this.estimateTime(query),
      difficulty: this.estimateDifficulty(query)
    };
  }

  private estimateTime(query: string): string {
    const timeEstimates = ['5-10 minutes', '10-15 minutes', '15-30 minutes', '20-45 minutes'];
    return timeEstimates[Math.floor(Math.random() * timeEstimates.length)];
  }

  private estimateDifficulty(query: string): string {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  }
}