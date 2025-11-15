# Design System Quick Reference

## 🎨 Color Palette

### Primary Colors

```css
--indigo-600: #5b21b6
--indigo-500: #7c3aed
--indigo-400: #a78bfa
--blue-600: #2563eb
--blue-500: #3b82f6
--blue-400: #60a5fa
--pink-600: #db2777
--pink-500: #ec4899
--pink-400: #f472b6
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #ec4899 100%)
--gradient-secondary: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)
--gradient-accent: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)
--gradient-subtle: linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)
```

## 📏 Spacing System

```css
--s-xs: 0.25rem   /* 4px */
--s-sm: 0.5rem    /* 8px */
--s-md: 1rem      /* 16px */
--s-lg: 1.5rem    /* 24px */
--s-xl: 2rem      /* 32px */
--s-2xl: 3rem     /* 48px */
```

## 🔘 Border Radius

```css
--r-sm: 8px
--r-md: 12px
--r-lg: 16px
--r-xl: 20px
--r-2xl: 24px
--r-full: 9999px
```

## 💫 Shadows

```css
--shadow-xs: 0 2px 8px rgba(124, 58, 237, 0.06)
--shadow-sm: 0 4px 16px rgba(124, 58, 237, 0.08)
--shadow-md: 0 8px 24px rgba(124, 58, 237, 0.12)
--shadow-lg: 0 16px 40px rgba(124, 58, 237, 0.15)
--shadow-hover: 0 20px 48px rgba(124, 58, 237, 0.2)
```

## ⚡ Transitions

```css
--trans-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--trans: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--trans-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

## 🎭 Button Classes

### Primary Button

```html
<button class="btn btn--primary">Click Me</button>
```

### Secondary Button

```html
<button class="btn btn--secondary">Click Me</button>
```

### Ghost Button

```html
<button class="btn btn--ghost">Click Me</button>
```

### Outline Button

```html
<button class="btn btn--outline">Click Me</button>
```

### Button Sizes

```html
<button class="btn btn--primary btn-sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn-lg">Large</button>
```

## 🎬 Animation Classes

### Fade In

```html
<div class="fade-in">Content</div>
```

### Fade In Up

```html
<div class="fade-in-up">Content</div>
```

### Fade In Scale

```html
<div class="fade-in-scale">Content</div>
```

### Slide In Right

```html
<div class="slide-in-right">Content</div>
```

### Stagger Items (for lists)

```html
<div class="stagger-item">Item 1</div>
<div class="stagger-item">Item 2</div>
<div class="stagger-item">Item 3</div>
```

## 🖼️ Card Component

```html
<div class="card">
  <div class="image-wrapper">
    <img src="image.jpg" alt="Product" loading="lazy" />
  </div>
  <div class="card__body">
    <h5 class="card__title">Product Name</h5>
    <p class="card__desc">Description</p>
    <div class="card__meta">
      <span class="price">₹999</span>
      <button class="btn btn--primary btn-sm">Add</button>
    </div>
  </div>
</div>
```

## 📝 Form Elements

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-control" placeholder="Enter email" />
</div>

<div class="form-group">
  <label class="form-label">Category</label>
  <select class="form-control">
    <option>Option 1</option>
  </select>
</div>
```

## 🎨 Gradient Text

```html
<h1 class="gradient-text">Beautiful Heading</h1>
```

## 🌓 Dark Mode Toggle

The ThemeToggle component automatically handles theme switching. To use:

```jsx
import ThemeToggle from "./components/ThemeToggle";

<ThemeToggle />;
```

## 📱 Responsive Grid

```html
<div class="row">
  <div class="col-md-6">Half width on desktop</div>
  <div class="col-md-6">Half width on desktop</div>
</div>

<div class="row">
  <div class="col-md-3">Quarter width</div>
  <div class="col-md-3">Quarter width</div>
  <div class="col-md-3">Quarter width</div>
  <div class="col-md-3">Quarter width</div>
</div>
```

## 🎯 Utility Classes

### Spacing

```css
.mt-2  /* margin-top: 0.5rem */
/* margin-top: 0.5rem */
.mt-3  /* margin-top: 1rem */
.mt-4  /* margin-top: 1.5rem */
.mt-5  /* margin-top: 3rem */
.mb-3  /* margin-bottom: 1rem */
.mb-4; /* margin-bottom: 1.5rem */
```

### Flexbox

```css
.d-flex                    /* display: flex */
/* display: flex */
.justify-content-between  /* justify-content: space-between */
.align-items-center       /* align-items: center */
.flex-wrap; /* flex-wrap: wrap */
```

### Text

```css
.text-center     /* text-align: center */
/* text-align: center */
.text-muted      /* color: var(--text-muted) */
.text-secondary; /* color: var(--text-secondary) */
```

### Images

```html
<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" class="img-fluid" alt="Description" />
```

## 🎪 Badge Components

```html
<span class="badge badge--new">New</span>
<span class="badge badge--sale">Sale</span>
<span class="badge badge--stock">In Stock</span>
```

## 📦 Container

```html
<div class="container">
  <!-- Max-width: 1200px, centered, with padding -->
  Content here
</div>
```

## 🎨 Hero Section

```html
<div class="hero">
  <div class="hero__left">
    <h1 class="hero__title">Main Heading</h1>
    <p class="hero__subtitle">Subtitle text</p>
    <div class="hero__cta">
      <button class="btn btn--primary btn-lg">Call to Action</button>
    </div>
  </div>
  <div class="hero__art">
    <!-- Image or SVG -->
  </div>
</div>
```

## ✨ Best Practices

1. **Always use CSS variables** for colors, spacing, and other design tokens
2. **Lazy load images** with `loading="lazy"` attribute
3. **Use semantic HTML** for better accessibility
4. **Add animations sparingly** to avoid performance issues
5. **Test in dark mode** to ensure proper contrast
6. **Use stagger animations** for lists of items
7. **Maintain consistent spacing** using the spacing system
8. **Follow mobile-first** approach for responsive design
