import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import { FaFire } from "react-icons/fa";

function Deals({ products, onAddToCart, onToggleWishlist, wishlist = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const offers = products.filter((product) => product.discount >= 25);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-danger text-white rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1">
          <FaFire size={13} /> Hot Deals & Discounts
        </span>
        <h1 className="fw-bold mt-3 mb-1">Limited-Time Sports Offers</h1>
        <p className="text-muted small">
          Grab high performance equipment with minimum 25% to 40% discount directly from our factory warehouse.
        </p>
      </div>

      <div className="row g-4">
        {offers.map((product) => (
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

export default Deals;
