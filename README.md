# Dank Design

A lightweight, responsive CSS design system for quickly building clean, modern user interfaces. This pattern library can be plugged into any project to provide a consistent visual language with customizable themes. 

You can see the design system in action on the [Dank Design website](https://macavitymadcap.github.io/dank-design/), which is built with this repository.



## Features

- 🎨 **Light & Dark Theme** - Built-in theme support with automatic switching based on system preferences
- 📱 **Responsive Grid** - 12-column layout system with breakpoints for various screen sizes
- 🧩 **Component Library** - Ready-to-use components including cards, alerts, badges, form elements and more
- 🔄 **Flexible Layout Options** - Grid and flexbox utilities for versatile page composition
- 🎯 **Utility Classes** - Spacing, sizing, typography and color helpers for rapid development
- 🌈 **Consistent Color System** - Semantic color variables for theming and visual coherence
- 🔤 **Typography** - Well-defined text styles and font combinations

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dank-design.git
   ```

2. Link the CSS in your HTML file:
   ```html
   <link rel="stylesheet" href="path/to/dank-design/static/styles/index.css">
   ```

3. For the theme toggler and code highlighting functionality, include the JavaScript:
   ```html
   <script src="path/to/dank-design/static/scripts/index.js" defer></script>
   ```

4. (Optional) For code highlighting, include highlight.js:
   ```html
   <link 
       id="hljs-theme" 
       rel="stylesheet" 
       href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
   >
   <link 
       id="hljs-theme-light" 
       rel="stylesheet" 
       href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" 
       disabled
   >
   <script 
       src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" 
       defer
   ></script>
   ```

5. (Optional) For Alpine.js and HTMX functionality:
   ```html
   <script src="//unpkg.com/alpinejs" defer></script>
   <script 
       src="https://unpkg.com/htmx.org@2.0.4" 
       integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" 
       crossorigin="anonymous"
   ></script>
   ```

### Basic Structure

The minimal structure to use Dank Design:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Dank Design Project</title>
    <link rel="stylesheet" href="path/to/dank-design/static/styles/index.css">
    <script src="path/to/dank-design/static/scripts/index.js" defer></script>
</head>
<body>
    <header>
        <div class="container">
            <h1>My Project</h1>
            <!-- Theme toggle -->
            <div class="form-group">
                <label for="theme-toggle">
                    <span title="Toggle light/dark theme">🌞 / 🌙</span>
                    <input type="checkbox" class="switch" id="theme-toggle">
                </label>
            </div>
        </div>
    </header>

    <main class="container">
        <!-- Your content here -->
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025</p>
        </div>
    </footer>
</body>
</html>
```

## CSS Structure

The library is organized into modular CSS files:

```
static/styles/
├── 1-variables.css     # Theme variables and colors
├── 2-base.css          # Base styles and resets
├── 3-layout.css        # Layout containers
├── 4-typography.css    # Text styles
├── 5-theme.css         # Color utility classes
├── 6-buttons.css       # Button styles
├── 7-code.css          # Code formatting
├── 8-cards.css         # Card components
├── 9-alerts.css        # Alert components
├── 10-badges.css       # Badge components
├── 11-forms.css        # Form controls
├── 12-tables.css       # Table styles
├── 13-details.css      # Accordion/details styles
├── 14-lists.css        # List styles
├── 15-misc.css         # Miscellaneous utilities
└── index.css           # Main import file
```

## Components

### Layout

#### Container

Use the `.container` class to create a centered, responsive content area:

```html
<div class="container">
    <!-- Content here -->
</div>
```

#### Grid System

Dank Design uses a 12-column grid system:

```html
<div class="grid">
    <div class="col-6 col-md-4 col-sm-12">
        <!-- Spans 6 columns on large screens, 4 on medium, and full width on small -->
    </div>
    <div class="col-6 col-md-8 col-sm-12">
        <!-- Spans 6 columns on large screens, 8 on medium, and full width on small -->
    </div>
</div>
```

#### Flex Layout

Use the wrapped-row for flexible card layouts:

```html
<div class="wrapped-row">
    <div class="card"><!-- Content --></div>
    <div class="card"><!-- Content --></div>
    <div class="card"><!-- Content --></div>
</div>
```

### Components

#### Cards

```html
<div class="card">
    <div class="card-header">Card Title</div>
    <div class="card-body">Card content</div>
    <div class="card-footer">Card footer</div>
</div>
```

Variants: `.card-primary`, `.card-secondary`, `.card-success`, `.card-warning`, `.card-danger`, `.card-outline`, etc.

#### Buttons

```html
<button class="btn">Default Button</button>
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-success">Success Button</button>
<button class="btn btn-outline">Outline Button</button>
```

#### Alerts

```html
<div class="alert alert-primary">
    <strong>Primary Alert!</strong> This is a primary alert message.
</div>
```

Variants: `.alert-secondary`, `.alert-success`, `.alert-warning`, `.alert-danger`

#### Badges

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
```

#### Form Elements

```html
<div class="form-group">
    <label for="text-input">Text Input</label>
    <input type="text" id="text-input" placeholder="Enter text...">
</div>

<div class="form-group">
    <label for="checkbox">
        Toggle Switch
        <input type="checkbox" id="checkbox" class="switch">
    </label>
</div>
```

#### Accordions

```html
<details>
    <summary>Accordion Title</summary>
    <div class="content">
        Accordion content here
    </div>
</details>
```

### Utility Classes

#### Spacing

Margin and padding utilities: `.mt-1` to `.mt-5`, `.mb-1` to `.mb-5`, `.p-1` to `.p-5`

#### Width

Width utilities: `.w-25`, `.w-50`, `.w-75`, `.w-100`

#### Typography

Text alignment: `.text-left`, `.text-center`, `.text-right`, `.text-justify`

Text transformation: `.text-uppercase`, `.text-lowercase`, `.text-capitalise`

Font sizes: `.text-xs`, `.text-sm`, `.text-base`, `.text-lg`, `.text-xl`, `.text-2xl`, `.text-3xl`, `.text-4xl`

#### Colors

Background colors: `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-warning`, `.bg-danger`, etc.

Text colors: `.text-primary`, `.text-secondary`, `.text-success`, `.text-warning`, `.text-danger`, etc.

## Theming

Dank Design supports light and dark themes using CSS variables defined in `1-variables.css`. The theme can be toggled with a switch input with ID `theme-toggle`, or it will automatically match the user's system preference.

To customize the theme colors:

1. Override the CSS variables in your own stylesheet:

```css
:root {
    --colour-primary: #your-color-here;
    --colour-secondary: #your-color-here;
    /* etc. */
}
```

## Browser Support

Dank Design works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

[MIT License](LICENSE)

## Credits

Created by Dan Kiernan
