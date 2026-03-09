# System Patterns

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Source Files                         │
├─────────────┬──────────────┬───────────────────────────┤
│  _posts/    │   src/       │   _layouts/               │
│  (Markdown) │   styl/js/   │   _includes/              │
└─────┬───────┴──────┬───────┴───────────┬───────────────┘
      │              │                    │
      │         ┌────▼────┐               │
      │         │  Gulp   │               │
      │         └────┬────┘               │
      │              │                    │
      ▼              ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                    Jekyll Build                         │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              _site/ (Static Output)                     │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

| Directory      | Purpose                                    |
|----------------|--------------------------------------------|
| `_posts/`      | Blog posts in Markdown with YAML front matter |
| `_layouts/`    | HTML templates (default, post, page, minimal) |
| `_includes/`   | Reusable HTML partials (header, footer, etc.) |
| `src/styl/`    | Stylus source files for CSS                |
| `src/js/`      | JavaScript source files                    |
| `src/img/`     | Source images (processed by imagemin)      |
| `assets/`      | Compiled CSS, JS, and images               |
| `_site/`       | Generated static site (Jekyll output)      |

## Design Patterns

### Template Inheritance
- `compress.html` → HTML minification wrapper
- `default.html` → Base layout with header/footer
- `post.html` → Blog post layout with author/comments
- `page.html` → Static pages layout

### Asset Pipeline
1. **Stylus** → CSS (with Jeet grid, Rupture breakpoints, Kouto Swiss utilities)
2. **JS files** → Concatenated and minified via Uglify
3. **Images** → Optimized via Imagemin

### Jekyll Conventions
- Posts: `YYYY-MM-DD-title.md` in `_posts/`
- Front matter: layout, title, date, image, description, tags, categories
- Permalinks: `/:title/` (clean URLs)

## Component Relationships

### Includes
- `head.html` - Meta tags, CSS, SEO
- `header-default.html` / `header-post.html` - Navigation
- `footer.html` - Site footer
- `author.html` - Author bio section
- `comments.html` - Disqus integration
- `share.html` - Social sharing buttons
- `svg-icons.html` - Icon definitions
- `menu-search.html` - Search functionality
