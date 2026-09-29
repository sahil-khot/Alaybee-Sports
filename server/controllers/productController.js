const Product = require("../models/Product");

// Get all products with optional category, search, or best-seller filter
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, bestSeller } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (bestSeller === "true") {
      query.isBestSeller = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ rating: -1, id: 1 });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get best seller products
exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({
      $or: [{ isBestSeller: true }, { rating: { $gte: 4.8 } }],
    }).sort({ rating: -1, ratingCount: -1 });

    res.json({
      success: true,
      count: bestSellers.length,
      data: bestSellers,
    });
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by numeric ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
