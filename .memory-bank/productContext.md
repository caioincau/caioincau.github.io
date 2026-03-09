# Product Context

## Why This Project Exists
This is Caio Incau's personal blog, serving as a platform to share thoughts on technology, career development, management, and personal finance. The blog has been active since at least 2018, with posts covering topics from webpack performance to career advice.

## Problems It Solves
- Provides a permanent, owned platform for publishing content (vs. social media)
- Enables sharing of knowledge and experiences with the tech community
- Creates a professional online presence at caio.dev

## How It Works

### Content Flow
1. Author creates new post using `./initpost.sh -c "Post Title"`
2. New Markdown file is created in `_posts/` with date-prefixed filename
3. Author fills in front matter (title, tags, categories, description)
4. Author writes content in Markdown
5. Running `gulp` builds the site and serves it locally with live reload
6. Site is deployed to GitHub Pages (caioincau.github.io → caio.dev)

### User Experience Goals
- Fast page loads (minimized CSS/JS, compressed HTML)
- Clean, readable typography for blog posts
- Easy navigation between posts, tags, and about page
- Mobile-responsive design
- Social sharing capabilities
- Commenting system for reader engagement

## Content Themes (based on existing posts)
- Career advice ("Avalie sua empresa", "Mudança de emprego", "Visão de um senior")
- Book reviews/summaries ("Inspired", "Gestor Eficaz", "Feitas para Durar")
- Technical topics ("Performance Webpack" series)
- Personal finance ("Economize e será livre", "Economize com cartão de crédito")
- Tech culture ("Cultura de debate", "Cuidado com os heróis")
