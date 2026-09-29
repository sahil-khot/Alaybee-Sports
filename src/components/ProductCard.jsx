import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({ product, onAddToCart, onToggleWishlist, isSaved, onSelectProduct }) {
  const renderStars = (rating = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4 && rating % 1 <= 0.8;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" size={12} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" size={12} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" size={12} />);
      }
    }
    return stars;
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      className="card h-100 shadow-sm border-0 hover-card rounded-4 overflow-hidden position-relative d-flex flex-column"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative overflow-hidden bg-light" style={{ height: "200px" }}>
        <img
          src={product.image}
          className="card-img-top w-100 h-100"
          alt={product.name}
          style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
        />
        {product.discount && (
          <span className="badge badge-discount position-absolute top-0 start-0 m-3 shadow-sm">
            -{product.discount}%
          </span>
        )}
        {onToggleWishlist && (
          <button
            type="button"
            className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center"
            style={{ width: "34px", height: "34px", zIndex: 2 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            title={isSaved ? "Saved" : "Save to Wishlist"}
          >
            {isSaved ? (
              <FaHeart className="text-danger" size={15} />
            ) : (
              <FaRegHeart className="text-secondary" size={15} />
            )}
          </button>
        )}
      </div>

      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="badge rounded-pill bg-light text-secondary border px-2 py-1" style={{ fontSize: "0.75rem" }}>
            {product.category}
          </span>
          <div className="d-flex align-items-center gap-1">
            <div className="star-rating">{renderStars(product.rating || 5)}</div>
            <span className="text-muted small fw-semibold" style={{ fontSize: "0.75rem" }}>
              {product.rating || 5.0}
            </span>
          </div>
        </div>

        <h6 className="card-title fw-bold text-dark mt-2 mb-1 text-truncate" title={product.name}>
          {product.name}
        </h6>

        {product.description && (
          <p
            className="card-text text-muted small mb-3"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: "0.82rem",
            }}
          >
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="fw-bold text-primary fs-5">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.oldPrice && (
              <span className="text-decoration-line-through text-muted small">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 btn-sm py-2"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <FaShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
