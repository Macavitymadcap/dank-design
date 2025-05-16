class ThemeManager {
    static instance;
    constructor() {
        if (ThemeManager.instance) return ThemeManager.instance;
        this.html = document.documentElement;
        this.darkLink = htmx.find("#hljs-theme");
        this.lightLink = htmx.find("#hljs-theme-light");
        this.themeSwitch = htmx.find("#theme-toggle");
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
        if (this.themeSwitch) {
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
    htmx.findAll("pre code").forEach((block) => {
        window.hljs && window.hljs.highlightElement(block);
    });
});
