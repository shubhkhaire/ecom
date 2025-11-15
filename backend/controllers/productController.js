import Product from "../models/ProductModel.js";

// GET /api/products
// Supports: page, limit, category, sort (price-asc|price-desc|rating|newest), search, priceMin, priceMax, ratingMin
export const getAllProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      category,
      sort = "newest",
      search = "",
      priceMin,
      priceMax,
      ratingMin,
    } = req.query;

    page = Number(page) || 1;
    limit = Math.min(Number(limit) || 12, 100);

    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }
    if (ratingMin) {
      filter.rating = { $gte: Number(ratingMin) };
    }

    // Determine sort
    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
    };
    const sortSpec = sortMap[sort] || sortMap["newest"];

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortSpec)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      page,
      pages: Math.ceil(total / limit),
      total,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// GET /api/products/categories/list
export const getCategories = async (_req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories.filter(Boolean));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// POST /api/products/:id/reviews (protected)
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure user not reviewing twice
    const alreadyReviewed = product.reviews.find(
      (r) => r.user?.toString() === req.user?._id?.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating) || 5,
      comment: comment || "",
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

// GET /api/products/:id/related
export const getRelatedProducts = async (req, res) => {
  try {
    const base = await Product.findById(req.params.id);
    if (!base) return res.status(404).json({ message: "Product not found" });
    const related = await Product.find({
      _id: { $ne: base._id },
      category: base.category,
    })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(related);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching related products",
      error: error.message,
    });
  }
};
