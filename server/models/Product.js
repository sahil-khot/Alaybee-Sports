const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id: Number,
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: String },
  comment: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    brand: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    ratingCount: { type: Number, default: 50 },
    inStock: { type: Boolean, default: true },
    image: { type: String, required: true },
    features: [{ type: String }],
    reviews: [reviewSchema],
    isBestSeller: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
