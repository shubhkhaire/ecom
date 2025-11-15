# 🎨 Component Usage Examples

## ThemeToggle Component

### Import and Usage

```jsx
import ThemeToggle from "./components/ThemeToggle";

// In your component
function Header() {
  return (
    <nav>
      {/* Your nav items */}
      <ThemeToggle />
    </nav>
  );
}
```

### Features

- Automatically detects saved theme preference
- Saves preference to localStorage
- Smooth transition between themes
- Accessible with aria-label
- Animated icon change

---

## LoadingSpinner Component

### Import and Usage

```jsx
import LoadingSpinner from './components/LoadingSpinner';

// Basic usage
<LoadingSpinner />

// With size
<LoadingSpinner size="lg" />

// With text
<LoadingSpinner size="md" text="Loading products..." />

// All options
<LoadingSpinner size="sm" text="Please wait..." />
```

### Available Sizes

- `sm` - 30px
- `md` - 50px (default)
- `lg` - 70px

---

## ScrollToTop Component

### Import and Usage

```jsx
import ScrollToTop from "./components/ScrollToTop";

// In App.js or layout component
function App() {
  return (
    <>
      <Header />
      <Routes>{/* Your routes */}</Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}
```

### Features

- Appears after scrolling 300px
- Smooth scroll animation
- Gradient background with hover effect
- Fixed position (bottom right)
- Auto-positioned above FAB cart button

---

## ProductCard Component

### Import and Usage

```jsx
import ProductCard from "./pages/ProductCard";

// In HomePage or product list
function ProductList({ products }) {
  return (
    <div className="row">
      {products.map((product, index) => (
        <div className="col-md-3 mb-4" key={product._id}>
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  );
}
```

### Features

- Lazy loading images
- Stagger animation based on index
- Hover scale effect
- Loading placeholder
- Gradient price display

---

## Button Examples

### Primary Button

```jsx
<button className="btn btn--primary">
  Add to Cart
</button>

// Large
<button className="btn btn--primary btn-lg">
  Shop Now
</button>

// Small
<button className="btn btn--primary btn-sm">
  View
</button>
```

### Secondary Button

```jsx
<button className="btn btn--secondary">Learn More</button>
```

### Ghost Button

```jsx
<button className="btn btn--ghost">Cancel</button>
```

### Outline Button

```jsx
<button className="btn btn--outline">View Details</button>
```

### Success & Danger

```jsx
<button className="btn btn-success">
  Confirm Order
</button>

<button className="btn btn-danger">
  Delete
</button>
```

---

## Card Component

### Basic Card

```jsx
<div className="card">
  <div className="image-wrapper">
    <img src="product.jpg" alt="Product" loading="lazy" />
  </div>
  <div className="card__body">
    <h5 className="card__title">Product Name</h5>
    <p className="card__desc">Short description</p>
    <div className="card__meta">
      <span className="price">₹999</span>
      <button className="btn btn--primary btn-sm">Add</button>
    </div>
  </div>
</div>
```

### Card with Badge

```jsx
<div className="card">
  <div className="image-wrapper" style={{ position: "relative" }}>
    <span
      className="badge badge--new"
      style={{ position: "absolute", top: "10px", right: "10px" }}
    >
      New
    </span>
    <img src="product.jpg" alt="Product" loading="lazy" />
  </div>
  <div className="card__body">{/* Content */}</div>
</div>
```

---

## Form Examples

### Text Input

```jsx
<div className="form-group">
  <label className="form-label">Email Address</label>
  <input
    type="email"
    className="form-control"
    placeholder="Enter your email"
    required
  />
</div>
```

### Select Dropdown

```jsx
<div className="form-group">
  <label className="form-label">Category</label>
  <select className="form-control">
    <option>All Categories</option>
    <option>Electronics</option>
    <option>Clothing</option>
  </select>
</div>
```

### Search Input

```jsx
<input
  type="text"
  className="form-control search-input"
  placeholder="🔍 Search products..."
  onChange={(e) => setSearch(e.target.value)}
/>
```

### Form with Actions

```jsx
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label className="form-label">Product Name</label>
    <input type="text" className="form-control" required />
  </div>

  <div className="form-group">
    <label className="form-label">Description</label>
    <textarea className="form-control" rows="4" />
  </div>

  <div className="form-actions">
    <button type="button" className="btn btn--ghost">
      Cancel
    </button>
    <button type="submit" className="btn btn--primary">
      Save Product
    </button>
  </div>
</form>
```

---

## Badge Examples

```jsx
<span className="badge badge--new">New</span>
<span className="badge badge--sale">Sale 50%</span>
<span className="badge badge--stock">In Stock</span>
```

---

## Animation Classes

### Fade In

```jsx
<div className="fade-in">This content fades in</div>
```

### Fade In Up

```jsx
<div className="fade-in-up">This content slides up while fading in</div>
```

### Fade In Scale

```jsx
<div className="fade-in-scale">This content scales while fading in</div>
```

### Stagger Items (for lists)

```jsx
{
  items.map((item, index) => (
    <div
      className="stagger-item"
      style={{ animationDelay: `${index * 50}ms` }}
      key={item.id}
    >
      {item.content}
    </div>
  ));
}
```

---

## Gradient Text

```jsx
<h1 className="gradient-text">
  Beautiful Gradient Heading
</h1>

<p className="gradient-text">
  Even paragraphs can have gradients!
</p>
```

---

## Hero Section

```jsx
<div className="hero">
  <div className="hero__left">
    <h1 className="hero__title">Welcome to Our Store</h1>
    <p className="hero__subtitle">
      Discover amazing products at unbeatable prices
    </p>
    <div className="hero__cta">
      <button className="btn btn--primary btn-lg">Shop Now</button>
    </div>
  </div>
  <div className="hero__art">
    <img src="hero-image.png" alt="Hero" />
  </div>
</div>
```

---

## Grid System

### 4 Column Grid

```jsx
<div className="row">
  <div className="col-md-3">Column 1</div>
  <div className="col-md-3">Column 2</div>
  <div className="col-md-3">Column 3</div>
  <div className="col-md-3">Column 4</div>
</div>
```

### 2 Column Grid

```jsx
<div className="row">
  <div className="col-md-6">Left Column</div>
  <div className="col-md-6">Right Column</div>
</div>
```

### Product Grid

```jsx
<div className="grid grid--products">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

---

## Container

```jsx
<div className="container">
  {/* Your content - max-width: 1200px, centered */}
</div>
```

---

## Cart Container

```jsx
<div className="cart-container">
  <h3 className="cart__title">Your Shopping Cart</h3>

  {items.map((item) => (
    <div className="cart-item" key={item.id}>
      <div className="d-flex align-items-center gap-3">
        <img src={item.image} alt={item.name} />
        <span>{item.name}</span>
      </div>
      <span className="price">₹{item.price}</span>
    </div>
  ))}
</div>
```

---

## Utility Classes

### Spacing

```jsx
<div className="mt-5">Top margin</div>
<div className="mb-4">Bottom margin</div>
<div className="p-3">Padding all sides</div>
```

### Flexbox

```jsx
<div className="d-flex justify-content-between align-items-center">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Text Alignment

```jsx
<p className="text-center">Centered text</p>
<p className="text-muted">Muted text</p>
```

---

## Pro Tips

### 1. Lazy Loading Images

Always use `loading="lazy"` for better performance:

```jsx
<img src="image.jpg" alt="Description" loading="lazy" />
```

### 2. Combine Classes

```jsx
<button className="btn btn--primary btn-lg fade-in-up">Get Started</button>
```

### 3. Custom Delays for Animations

```jsx
<div className="fade-in-up" style={{ animationDelay: "200ms" }}>
  Content
</div>
```

### 4. Using CSS Variables in Inline Styles

```jsx
<div
  style={{
    padding: "var(--s-lg)",
    borderRadius: "var(--r-md)",
    background: "var(--gradient-subtle)",
  }}
>
  Content
</div>
```

### 5. Responsive Images

```jsx
<div className="image-wrapper">
  <img
    src="product.jpg"
    alt="Product"
    loading="lazy"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/400";
    }}
  />
</div>
```

---

## Common Patterns

### Loading State

```jsx
import LoadingSpinner from "./components/LoadingSpinner";

function ProductPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading products..." />;
  }

  return <div>{/* Your content */}</div>;
}
```

### Empty State

```jsx
{
  items.length === 0 ? (
    <div className="text-center fade-in" style={{ padding: "3rem 0" }}>
      <p
        className="text-muted"
        style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}
      >
        No items found
      </p>
      <button className="btn btn--primary">Start Shopping</button>
    </div>
  ) : (
    <div>{/* Show items */}</div>
  );
}
```

### Modal/Dialog Pattern

```jsx
<div className="modal-overlay fade-in">
  <div className="cart-container fade-in-scale">
    <h3 className="gradient-text">Confirm Action</h3>
    <p>Are you sure you want to continue?</p>
    <div className="form-actions">
      <button className="btn btn--ghost">Cancel</button>
      <button className="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

---

**Remember**: Always check DESIGN_SYSTEM.md for the complete list of available classes and variables!
