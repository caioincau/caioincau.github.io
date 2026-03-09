// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    const progressContainer = document.querySelector('.reading-progress-container');
    
    if (!progressBar || !progressContainer) return;
    
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    function updateProgress() {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        // Show progress bar after scrolling past the header
        if (scrollTop > 200) {
            progressContainer.classList.add('visible');
        } else {
            progressContainer.classList.remove('visible');
        }
        
        const start = articleTop - windowHeight / 2;
        const end = articleTop + articleHeight - windowHeight;
        const progress = Math.min(Math.max((scrollTop - start) / (end - start) * 100, 0), 100);
        
        progressBar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// Table of Contents Generator
function initTableOfContents() {
    const toc = document.getElementById('toc');
    const tocList = document.getElementById('toc-list');
    const article = document.querySelector('.post-content');
    
    if (!toc || !tocList || !article) return;
    
    const headings = article.querySelectorAll('h2, h3');
    
    if (headings.length < 2) {
        toc.style.display = 'none';
        return;
    }
    
    headings.forEach(function(heading, index) {
        // Add ID to heading if not present
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        const li = document.createElement('li');
        li.className = 'toc-item toc-' + heading.tagName.toLowerCase();
        
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
        });
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    // Show TOC after scroll
    function checkTocVisibility() {
        if (window.scrollY > 400) {
            toc.classList.add('visible');
        } else {
            toc.classList.remove('visible');
        }
        
        // Highlight current section
        let current = '';
        headings.forEach(function(heading) {
            if (window.scrollY >= heading.offsetTop - 150) {
                current = heading.id;
            }
        });
        
        tocList.querySelectorAll('a').forEach(function(a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkTocVisibility, { passive: true });
    checkTocVisibility();
}

// Code Block Copy Button
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(function(pre) {
        // Wrap code with header
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        // Detect language
        const code = pre.querySelector('code');
        let language = 'code';
        if (code && code.className) {
            const match = code.className.match(/language-(\w+)/);
            if (match) language = match[1];
        }
        
        // Create header
        const header = document.createElement('div');
        header.className = 'code-header';
        header.innerHTML = '<span class="code-language">' + language + '</span>' +
            '<button class="copy-button" onclick="copyCode(this)">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>' +
            '<span>Copiar</span></button>';
        
        pre.insertBefore(header, pre.firstChild);
    });
}

function copyCode(button) {
    const pre = button.closest('pre');
    const code = pre.querySelector('code');
    const text = code ? code.textContent : pre.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        button.classList.add('copied');
        button.querySelector('span').textContent = 'Copiado!';
        
        setTimeout(function() {
            button.classList.remove('copied');
            button.querySelector('span').textContent = 'Copiar';
        }, 2000);
    });
}

// Smooth page transitions
function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(function(link) {
        if (link.hostname === window.location.hostname && 
            !link.getAttribute('href').startsWith('#') &&
            !link.hasAttribute('data-scroll')) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                e.preventDefault();
                document.body.classList.add('fade-exit-active');
                setTimeout(function() {
                    window.location.href = href;
                }, 150);
            });
        }
    });
}

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initReadingProgress();
    initTableOfContents();
    initCodeBlocks();
    initPageTransitions();
});
