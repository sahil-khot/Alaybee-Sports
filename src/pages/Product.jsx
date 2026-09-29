import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import { FaSearch, FaTimes, FaFilter, FaShoppingBag } from "react-icons/fa";

function Product({ products, onAddToCart, onToggleWishlist, wishlist }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync category state when URL search param changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryFromUrl]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1">
          <FaShoppingBag size={12} /> Official Sports Catalog
        </span>
        <h1 className="fw-bold mt-3 mb-1">Book Your Sports Kits</h1>
        <p className="text-muted small">
          Click any card to inspect full specifications, customer reviews, and ratings.
        </p>
      </div>

      {/* Search and stats bar */}
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
              placeholder="Search gear by name, sport, or keyword..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
            Showing <strong className="text-primary">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
        <span className="text-muted small fw-semibold me-1 d-flex align-items-center gap-1">
          <FaFilter size={12} /> Filter:
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
            onClick={() => handleCategoryChange(category)}
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
          <h5 className="fw-bold">No sports gear matches your search</h5>
          <p className="mb-3 text-muted">
            Try adjusting your search keywords or select "All" from categories.
          </p>
          <button
            className="btn btn-outline-dark btn-sm rounded-pill px-4"
            onClick={() => {
              setSearchTerm("");
              handleCategoryChange("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Clickable Product Detail Modal */}
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

export default Product;
