# Tech Context

## Technologies Used

### Core Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Jekyll     | -       | Static site generator |
| Ruby       | .ruby-version | Jekyll runtime |
| Node.js    | >=18.0.0 | Gulp task runner |
| Gulp       | 5.0.0   | Asset pipeline |

### CSS
| Technology | Purpose |
|------------|---------|
| Stylus     | CSS preprocessor |
| Jeet       | Grid system |
| Rupture    | Media query breakpoints |
| Kouto Swiss | Stylus utilities |
| Autoprefixer | Vendor prefixing |

### JavaScript
| Library | Purpose |
|---------|---------|
| Zepto (azepto.js) | jQuery-like lightweight library |
| simpleJekyllSearch.js | Client-side search |
| scroll.js | Smooth scrolling |

### Build Tools
| Tool | Purpose |
|------|---------|
| gulp-stylus | Compile Stylus to CSS |
| gulp-concat | Concatenate JS files |
| gulp-uglify | Minify JavaScript |
| gulp-imagemin | Optimize images |
| browser-sync | Live reload development server |
| gulp-plumber | Error handling in pipes |

## Development Setup

### Prerequisites
1. Install Ruby (see .ruby-version)
2. Install Jekyll: `gem install jekyll bundler`
3. Install Node.js 18+ 
4. Run `npm install`

### Development Commands
```bash
# Start development server with live reload
npm run dev

# Build assets only (no Jekyll required)
npm run assets

# Full build with Jekyll
npm run build

# Create new post
./initpost.sh -c "Post Title"
```

### Build Output
- CSS compiled to `assets/css/main.css`
- JS compiled to `assets/js/main.js`
- Jekyll generates site to `_site/`

## Technical Constraints
- Requires Ruby and Jekyll for full site generation
- Some Stylus dependencies show circular dependency warnings (harmless)

## Dependencies (package.json)

### Dev Dependencies (Updated March 2026)
- `autoprefixer-stylus: ^1.0.0`
- `browser-sync: ^3.0.2`
- `gulp: ^5.0.0`
- `gulp-concat: ^2.6.1`
- `gulp-imagemin: ^7.1.0`
- `gulp-plumber: ^1.2.1`
- `gulp-stylus: ^3.0.1`
- `gulp-terser: ^2.1.0` (replaced gulp-uglify)
- `jeet: ^7.2.0`
- `kouto-swiss: ^1.1.0`
- `rupture: ^0.7.1`

## External Services
- **GitHub Pages**: Hosting
- **Disqus**: Comments
- **Google Plus** (deprecated): Social integration
- **Twitter**: Social sharing

## Configuration Files
| File | Purpose |
|------|---------|
| `_config.yml` | Jekyll configuration |
| `package.json` | Node.js dependencies |
| `gulpfile.js` | Gulp task definitions |
| `.ruby-version` | Ruby version specification |
| `CNAME` | Custom domain (caio.dev) |
