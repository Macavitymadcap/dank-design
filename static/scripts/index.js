class ThemeManager {
    static instance;
    constructor() {
        if (ThemeManager.instance) return ThemeManager.instance;
        this.html = document.documentElement;
        this.darkLink = document.getElementById("hljs-theme");
        this.lightLink = document.getElementById("hljs-theme-light");
        this.themeSwitch = null; // Will be set in init()
        this.init();
        ThemeManager.instance = this;
    }

    init() {
        this.setDefaultTheme();
        this.bindThemeToggleEvent();
    }

    setDefaultTheme() {
        const saved = localStorage.getItem("theme");
        const prefersDarkScheme =
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (saved) {
            this.setTheme(saved);
        } else if (prefersDarkScheme) {
            this.setTheme("dark");
        } else {
            this.setTheme("light");
        }
    }

    bindThemeToggleEvent() {
        // Always re-query the toggle in case it was loaded dynamically
        this.themeSwitch = document.getElementById("theme-toggle");
        if (this.themeSwitch) {
            // Remove previous event listeners by cloning
            const newSwitch = this.themeSwitch.cloneNode(true);
            this.themeSwitch.parentNode.replaceChild(newSwitch, this.themeSwitch);
            this.themeSwitch = newSwitch;
            
            // Add event listener to the new switch
            this.themeSwitch.addEventListener("change", () => {
                this.setTheme(
                    this.html.getAttribute("data-theme") === "dark"
                        ? "light"
                        : "dark",
                );
            });
        }
    }

    setTheme(theme) {
        this.html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        this.updateHighlightJsTheme(theme);
    }

    updateHighlightJsTheme(theme) {
        if (!this.darkLink || !this.lightLink) {
            // Re-query in case they weren't available at initialization
            this.darkLink = document.getElementById("hljs-theme");
            this.lightLink = document.getElementById("hljs-theme-light");
            if (!this.darkLink || !this.lightLink) return;
        }
        
        if (theme === "dark") {
            this.darkLink.disabled = false;
            this.lightLink.disabled = true;
        } else {
            this.darkLink.disabled = true;
            this.lightLink.disabled = false;
        }
    }
}

const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/dank-design/' : '/';

function highlightCode() {
    // Check if hljs is loaded
    if (typeof hljs !== 'undefined') {
        // Find all code blocks and highlight them
        document.querySelectorAll("pre code").forEach((block) => {
            // Only highlight if not already highlighted
            if (!block.classList.contains("hljs")) {
                hljs.highlightElement(block);
            }
        });
    } else {
        console.warn("highlight.js is not loaded yet");
        // Retry after a short delay if highlight.js isn't loaded yet
        setTimeout(highlightCode, 500);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const themeManager = new ThemeManager();
    
    // Initial highlighting
    highlightCode();
    
    // Set up HTMX events
    if (typeof htmx !== 'undefined') {
        htmx.config = htmx.config || {};
        htmx.config.baseURL = basePath;
        
        // Re-highlight code blocks after HTMX swaps content
        document.addEventListener("htmx:afterSwap", (e) => {
            // Wait a small amount of time for the new content to be fully rendered
            setTimeout(() => {
                highlightCode();
                // Re-bind theme toggle event in case header or toggle was swapped in
                themeManager.bindThemeToggleEvent();
            }, 50);
        });
        
        // Fix paths for HTMX requests
        document.addEventListener("htmx:beforeRequest", (evt) => {
            const url = evt.detail.requestConfig.path;
            if (!url.startsWith('http') && !url.startsWith('/dank-design/') && url.startsWith('/')) {
                evt.detail.requestConfig.path = basePath + url.substring(1);
            }
        });
    } else {
        console.warn("HTMX is not loaded");
    }
});

// In case the DOM content loaded event has already fired,
// run the initialization immediately
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    const themeManager = new ThemeManager();
    highlightCode();
}