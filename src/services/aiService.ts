// Note: In a real implementation, you would need to set up your OpenAI API key
// For demo purposes, we'll simulate AI responses

export class AIService {
  private static instance: AIService;
  private apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateSkill(query: string): Promise<any> {
    // Use OpenAI API if key is available
    if (this.apiKey && this.apiKey.trim() !== '') {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are HowTo Ninja, an expert tutorial creator. Create comprehensive, SEO-optimized step-by-step guides. Format your response as clean HTML with:
                - H1 for title
                - P for introduction (SEO-friendly, 2-3 sentences with relevant keywords)
                - H2 for "Step-by-Step Instructions"
                - OL with LI for each step (detailed, actionable steps)
                - H2 for "Tips & Common Mistakes"
                - UL with LI for tips (practical advice and warnings)
                - H2 for "Conclusion" with a brief summary
                Keep it comprehensive, practical, and SEO-friendly. Use natural language with relevant keywords.`
              },
              {
                role: 'user',
                content: `Create a guide for: ${query}`
              }
            ],
            max_tokens: 800,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return {
          content: data.choices[0].message.content,
          estimatedTime: this.estimateTime(query),
          difficulty: this.estimateDifficulty(query)
        };
      } catch (error) {
        console.error('AI API Error:', error);
        // Fall back to demo response if API fails
        return this.getFallbackResponse(query);
      }
    }

    // Fallback demo response
    return this.getFallbackResponse(query);
  }

  private getFallbackResponse(query: string) {
    const cleanQuery = query.toLowerCase().replace(/^how to /, '');
    const capitalizedQuery = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
    
    return {
      content: `
        <h1>How to ${capitalizedQuery}</h1>
        <p>Learn how to ${cleanQuery} with this comprehensive step-by-step guide. This essential skill can be mastered with practice and the right technique. Follow our detailed instructions to achieve professional results every time.</p>
        
        <h2>Step-by-Step Instructions</h2>
        <ol>
          <li>Gather all necessary materials and tools. Ensure you have a clean, well-lit workspace with adequate room to work comfortably.</li>
          <li>Begin with the foundational technique. Take your time to understand the basic principles before proceeding to more complex steps.</li>
          <li>Apply the core method systematically. Follow each step in sequence, paying attention to detail and maintaining consistency throughout the process.</li>
          <li>Monitor your progress regularly. Make small adjustments as needed to ensure you're on the right track and achieving the desired results.</li>
          <li>Execute the finishing steps with precision. These final touches often make the difference between amateur and professional results.</li>
          <li>Review and refine your technique. Practice regularly to build muscle memory and improve your skills over time.</li>
        </ol>

        <h2>Tips & Common Mistakes</h2>
        <ul>
          <li>Take your time and don't rush - hurrying through the process often leads to mistakes that are difficult to correct later.</li>
          <li>Practice regularly to develop muscle memory and improve your technique. Consistency is key to mastering any skill.</li>
          <li>Never skip the preparation phase - proper setup and organization save time and prevent errors during execution.</li>
          <li>Avoid the common mistake of not following the sequence properly. Each step builds on the previous one for optimal results.</li>
          <li>Use high-quality materials and tools when possible - they make a significant difference in the final outcome.</li>
          <li>Learn from mistakes rather than getting frustrated. Each error is an opportunity to improve your technique.</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Mastering how to ${cleanQuery} requires patience, practice, and attention to detail. By following these step-by-step instructions and avoiding common pitfalls, you'll develop the skills needed to achieve professional results. Remember that improvement comes with consistent practice and a willingness to learn from each attempt.</p>
      `,
      estimatedTime: this.estimateTime(query),
      difficulty: this.estimateDifficulty(query)
    };
  }

  private estimateTime(query: string): string {
    const timeEstimates = ['2-5 minutes', '5-10 minutes', '10-15 minutes', '15-30 minutes'];
    return timeEstimates[Math.floor(Math.random() * timeEstimates.length)];
  }

  private estimateDifficulty(query: string): string {
    const difficulties = ['easy', 'medium', 'hard'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  }
}