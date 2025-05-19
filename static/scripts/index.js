class ThemeManager {
    static instance;
    constructor() {
        if (ThemeManager.instance) return ThemeManager.instance;
        this.html = document.documentElement;
        this.darkLink = htmx.find("#hljs-theme");
        this.lightLink = htmx.find("#hljs-theme-light");
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
        this.themeSwitch = htmx.find("#theme-toggle");
        if (this.themeSwitch) {
            // Remove previous event listeners by cloning
            const newSwitch = this.themeSwitch.cloneNode(true);
            this.themeSwitch.parentNode.replaceChild(newSwitch, this.themeSwitch);
            this.themeSwitch = newSwitch;
            htmx.on(this.themeSwitch, "change", () => {
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
        if (!this.darkLink || !this.lightLink) return;
        if (theme === "dark") {
            this.darkLink.disabled = false;
            this.lightLink.disabled = true;
        } else {
            this.darkLink.disabled = true;
            this.lightLink.disabled = false;
        }
    }
}

function highlightCode() {
    htmx.findAll("pre code").forEach((block) => {
        // Only highlight if not already highlighted
        if (!block.classList.contains("hljs")) {
            window.hljs && window.hljs.highlightElement(block);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const themeManager = new ThemeManager();
    highlightCode();

    document.addEventListener("htmx:afterSwap", (e) => {
        highlightCode();
        // Re-bind theme toggle event in case header or toggle was swapped in
        themeManager.bindThemeToggleEvent();
    });
});

