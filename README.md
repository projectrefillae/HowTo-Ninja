# HowTo Ninja - AI-Powered Learning Platform

## 🚀 Features
Learn any skill in minutes with AI-generated step-by-step tutorials.
- **AI-Powered Tutorials**: Generate comprehensive how-to guides for any skill
- **SEO Optimized**: Built for search engine visibility and organic traffic
- **Mobile Responsive**: Perfect experience on all devices
- **Skills Library**: Curated collection of popular tutorials
- **Clean UI**: Professional design focused on learning
## 🛠️ Setup Instructions
### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```
### 2. Configure API Keys
Edit the `.env` file with your credentials:
```env
# OpenAI API Key (required for AI-generated content)
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
# Google AdSense Client ID (for monetization)
VITE_ADSENSE_CLIENT_ID=ca-pub-your-adsense-id-here
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Run Development Server
```bash
npm run dev
```
## 🔑 Getting API Keys
### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file
### Google AdSense
1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get approved (may take a few days)
3. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
4. Update the AdSense client ID in both `.env` and `index.html`
## 💰 Monetization Features
- **Google AdSense Integration**: Banner, rectangle, and sidebar ads
- **SEO Optimized**: Built for organic traffic growth
- **High-Value Content**: Educational content attracts quality advertisers
- **Mobile Ad Support**: Responsive ad units for all devices
## 🚀 Deployment
### Environment Variables for Production
Set these environment variables in your hosting platform:
- `VITE_OPENAI_API_KEY`: Your OpenAI API key
- `VITE_ADSENSE_CLIENT_ID`: Your Google AdSense client ID
### Recommended Hosting Platforms
- **Vercel**: Automatic deployments from GitHub
- **Netlify**: Easy static site hosting
- **Railway**: Full-stack hosting with environment variables
## 🔒 Security Notes
- **Never commit API keys** to version control
- The `.env` file is automatically ignored by Git
- Use environment variables for production deployment
- Regularly rotate your API keys for security
## 📈 SEO Features
- Semantic HTML structure
- Meta tags optimization
- Open Graph tags for social sharing
- Structured data (JSON-LD)
- Mobile-first responsive design
- Fast loading times
## 🎯 Content Strategy
- Target long-tail keywords ("how to" queries)
- Create comprehensive, helpful content
- Focus on user intent and search volume
- Build topical authority in skill-based content
## 📊 Analytics & Tracking
Add Google Analytics or other tracking tools to monitor:
- Page views and user engagement
- Popular skill searches
- Ad performance and revenue
- SEO ranking improvements
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
## 🆘 Support
For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the setup instructions
---
**⚠️ Important Security Reminder**: Never commit your `.env` file or expose API keys publicly. Always use environment variables for production deployments.