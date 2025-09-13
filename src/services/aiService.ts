// Note: In a real implementation, you would need to set up your OpenAI API key
// For demo purposes, we'll simulate AI responses

export class AIService {
  private static instance: AIService;
  private apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateSkill(query: string): Promise<any> {
    // In production, replace this with actual OpenAI API call
    if (this.apiKey && this.apiKey !== '') {
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
                content: `You are a helpful assistant that creates step-by-step guides. Format your response as HTML with:
                - H1 for title
                - P for introduction (SEO-friendly, 2-3 sentences)
                - H2 for "Step-by-Step Instructions"
                - OL with LI for each step
                - H2 for "Tips & Common Mistakes"
                - UL with LI for tips
                Keep it concise and practical.`
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

        const data = await response.json();
        return {
          content: data.choices[0].message.content,
          estimatedTime: this.estimateTime(query),
          difficulty: this.estimateDifficulty(query)
        };
      } catch (error) {
        console.error('AI API Error:', error);
        return this.getFallbackResponse(query);
      }
    }

    // Fallback demo response
    return this.getFallbackResponse(query);
  }

  private getFallbackResponse(query: string) {
    const cleanQuery = query.toLowerCase().replace(/^how to /, '');
    return {
      content: `
        <h1>How to ${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)}</h1>
        <p>Learn how to ${cleanQuery} with this comprehensive step-by-step guide. This skill is essential for daily life and can be mastered with practice and the right technique.</p>
        
        <h2>Step-by-Step Instructions</h2>
        <ol>
          <li>Prepare all necessary materials and find a comfortable workspace</li>
          <li>Start with the basic foundation technique</li>
          <li>Apply the core method carefully and systematically</li>
          <li>Check your progress and make adjustments as needed</li>
          <li>Complete the final steps with attention to detail</li>
          <li>Review your work and practice for improvement</li>
        </ol>

        <h2>Tips & Common Mistakes</h2>
        <ul>
          <li>Take your time - rushing leads to mistakes</li>
          <li>Practice regularly to build muscle memory</li>
          <li>Don't skip the preparation steps</li>
          <li>Common mistake: Not following the sequence properly</li>
          <li>Pro tip: Watch video tutorials for visual reference</li>
        </ul>
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