export function generateStructuredData(skill: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": skill.title,
    "description": skill.introduction,
    "image": `https://via.placeholder.com/1200x630?text=${encodeURIComponent(skill.title)}`,
    "totalTime": skill.estimatedTime,
    "supply": [],
    "tool": [],
    "step": skill.steps?.map((step: string, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Step ${index + 1}`,
      "text": step,
      "url": `${url}#step-${index + 1}`
    })) || []
  };
}

export function generateMetaTags(title: string, description: string, url: string) {
  return {
    title: `${title} | HowTo Ninja - Learn Any Skill`,
    description: description.length > 155 ? description.substring(0, 152) + '...' : description,
    canonical: url,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'HowTo Ninja',
      type: 'article',
      image: `https://via.placeholder.com/1200x630?text=${encodeURIComponent(title)}`
    }
  };
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/^how to /, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}