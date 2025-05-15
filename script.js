class ThemeManager {
    static instance;
    constructor() {
        if (ThemeManager.instance) return ThemeManager.instance;
        this.html = document.documentElement;
        this.darkLink = document.getElementById("hljs-theme");
        this.lightLink = document.getElementById("hljs-theme-light");
        this.toggleBtn = document.getElementById("theme-toggle");
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
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener("click", () => {
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

new ThemeManager();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre code").forEach((block) => {
        window.hljs && window.hljs.highlightElement(block);
    });
});
