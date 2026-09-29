import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import { FaFire, FaSearch, FaFilter, FaTimes, FaTrophy } from "react-icons/fa";

function BestSellers({ products, onAddToCart, onToggleWishlist, wishlist = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products that are designated best sellers or have 4.8+ ratings
  const baseBestSellers = useMemo(() => {
    return products.filter((p) => p.isBestSeller || p.rating >= 4.8);
  }, [products]);

  const categories = [
    "All",
    ...new Set(baseBestSellers.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return baseBestSellers.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [baseBestSellers, selectedCategory, searchTerm]);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <span className="badge bg-danger text-white rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 shadow-sm">
          <FaFire size={13} /> Highly Rated & Trending
        </span>
        <h1 className="fw-bold mt-3 mb-2 d-flex align-items-center justify-content-center gap-2 flex-wrap">
          <FaTrophy className="text-warning" size={30} /> Best Selling Sports Gear
        </h1>
        <p className="text-muted col-md-7 mx-auto">
          Our customer-favorite sports essentials backed by 4.8+ star verified ratings and real club athlete testimonials.
        </p>
      </div>

      {/* Search & Counter Bar */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-lg-8">
          <div className="position-relative">
            <span
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              style={{ pointerEvents: "none" }}
            >
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill ps-5 pe-5"
              placeholder="Search best sellers by name, sport, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-3 text-muted p-0"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        <div className="col-lg-4 text-lg-end">
          <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fs-6 fw-normal">
            Showing <strong className="text-danger">{filteredProducts.length}</strong> top sellers
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
        <span className="text-muted small fw-semibold me-1 d-flex align-items-center gap-1">
          <FaFilter size={12} /> Filter Sport:
        </span>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm ${
              selectedCategory === category
                ? "btn-dark shadow-sm"
                : "btn-outline-dark"
            } rounded-pill px-3 py-1`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isSaved={wishlist.some((item) => item.id === product.id)}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="alert alert-warning text-center mt-4 p-4 rounded-4 shadow-sm">
          <h5 className="fw-bold">No best sellers found</h5>
          <p className="mb-3 text-muted">
            Try resetting your search query or choosing another sport category.
          </p>
          <button
            className="btn btn-outline-dark btn-sm rounded-pill px-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Detail Modal on Card Click */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isSaved={wishlist.some((item) => item.id === selectedProduct.id)}
        />
      )}
    </div>
  );
}

export default BestSellers;
