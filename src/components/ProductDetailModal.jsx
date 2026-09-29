import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaPlus,
  FaMinus,
  FaUserCheck,
} from "react-icons/fa";

function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isSaved,
}) {
  const [quantity, setQuantity] = useState(1);
  const [reviewsList, setReviewsList] = useState(product?.reviews || []);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4 && rating % 1 <= 0.8;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: reviewName.trim(),
      rating: Number(reviewRating),
      date: "Just now",
      comment: reviewComment.trim(),
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  const handleAddToCartClick = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div
      className="modal-backdrop-custom"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-custom p-4 p-md-5">
        <button
          className="close-btn-custom"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={16} />
        </button>

        <div className="row g-4 mb-4">
          {/* Left: Product Image */}
          <div className="col-md-5">
            <div className="position-relative rounded-4 overflow-hidden shadow-sm border bg-light h-100 d-flex align-items-center justify-content-center">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid w-100"
                style={{
                  maxHeight: "360px",
                  objectFit: "cover",
                }}
              />
              {product.discount && (
                <span className="badge badge-discount position-absolute top-0 start-0 m-3 shadow-sm">
                  {product.discount}% OFF
                </span>
              )}
              {product.inStock && (
                <span className="badge bg-success position-absolute bottom-0 start-0 m-3 shadow-sm d-flex align-items-center gap-1">
                  <FaCheckCircle size={12} /> In Stock
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="col-md-7 d-flex flex-column">
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
              <span className="badge bg-primary-subtle text-primary fw-semibold px-2 py-1 rounded-pill">
                {product.category}
              </span>
              {product.brand && (
                <span className="badge bg-secondary-subtle text-secondary fw-semibold px-2 py-1 rounded-pill">
                  {product.brand}
                </span>
              )}
            </div>

            <h3 className="fw-bold text-dark mb-2">{product.name}</h3>

            {/* Ratings summary */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="star-rating">{renderStars(product.rating || 5)}</div>
              <span className="fw-bold text-dark">{product.rating || 5.0}</span>
              <span className="text-muted small">
                ({product.ratingCount || reviewsList.length || 50} verified ratings)
              </span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-baseline gap-3 mb-3">
              <span className="fs-3 fw-bold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.oldPrice && (
                <span className="text-decoration-line-through text-muted fs-6">
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.oldPrice && (
                <span className="badge bg-danger-subtle text-danger fw-bold">
                  Save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="text-secondary small mb-3">{product.description}</p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-3">
                <h6 className="fw-bold text-dark mb-2">Key Highlights:</h6>
                <ul className="list-unstyled mb-0">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="small text-muted d-flex align-items-center gap-2 mb-1">
                      <FaCheckCircle className="text-success flex-shrink-0" size={13} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assurances */}
            <div className="d-flex gap-3 text-muted small py-2 border-top border-bottom mb-3 flex-wrap">
              <span className="d-flex align-items-center gap-1">
                <FaTruck className="text-primary" /> Free Express Delivery
              </span>
              <span className="d-flex align-items-center gap-1">
                <FaShieldAlt className="text-primary" /> 100% Genuine Guaranteed
              </span>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-2">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center border rounded-3 p-1">
                  <button
                    type="button"
                    className="btn btn-sm btn-light py-1 px-2"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={11} />
                  </button>
                  <span className="px-3 fw-bold">{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-light py-1 px-2"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={11} />
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary px-4 flex-grow-1"
                  onClick={handleAddToCartClick}
                >
                  <FaShoppingCart />
                  {addedNotice ? "Added to Cart!" : "Add to Cart"}
                </button>

                {onToggleWishlist && (
                  <button
                    type="button"
                    className={`btn ${isSaved ? "btn-danger" : "btn-outline-secondary"} p-2 px-3`}
                    onClick={() => onToggleWishlist(product)}
                    title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    {isSaved ? <FaHeart /> : <FaRegHeart />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-top pt-4 mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h5 className="fw-bold mb-0">Customer Reviews & Ratings</h5>
            <span className="badge bg-light text-dark border">
              {reviewsList.length} verified reviews
            </span>
          </div>

          <div className="row g-3">
            {/* Reviews display */}
            <div className="col-lg-7">
              {reviewsList.length === 0 ? (
                <p className="text-muted small">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                <div className="d-flex flex-column gap-2" style={{ maxHeight: "280px", overflowY: "auto" }}>
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-3 bg-light rounded-3 border">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-semibold text-dark small d-flex align-items-center gap-1">
                          <FaUserCheck className="text-success" size={13} /> {rev.author}
                        </span>
                        <span className="text-muted small" style={{ fontSize: "0.75rem" }}>
                          {rev.date}
                        </span>
                      </div>
                      <div className="star-rating mb-1" style={{ fontSize: "0.8rem" }}>
                        {renderStars(rev.rating)}
                      </div>
                      <p className="text-secondary small mb-0">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Add Review Form */}
            <div className="col-lg-5">
              <div className="p-3 border rounded-3 bg-white">
                <h6 className="fw-bold mb-2">Write a Review</h6>
                <form onSubmit={handleAddReview}>
                  <div className="mb-2">
                    <label className="form-label small text-muted mb-1">Your Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Sahil"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small text-muted mb-1">Rating</label>
                    <select
                      className="form-select form-select-sm"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars - Very Good</option>
                      <option value="3">⭐⭐⭐ 3 Stars - Good</option>
                      <option value="2">⭐⭐ 2 Stars - Fair</option>
                      <option value="1">⭐ 1 Star - Poor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small text-muted mb-1">Your Feedback</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      placeholder="Share your experience with this kit..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-dark btn-sm w-100">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
