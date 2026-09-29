const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getBestSellers,
  getProductById,
} = require("../controllers/productController");

router.get("/best-sellers", getBestSellers);
router.get("/:id", getProductById);
router.get("/", getAllProducts);

module.exports = router;
