import { Link } from "react-router-dom";
import { FaHeart, FaTrashAlt, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

function Wishlist({ wishlist, onToggleWishlist, onAddToCart }) {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1">
          <FaHeart size={12} /> Saved Items
        </span>
        <h1 className="fw-bold mt-3 mb-1">Your Wishlist</h1>
        <p className="text-muted small">
          Sports kits and gear you have bookmarked for later.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5 bg-white border rounded-4 shadow-sm p-4 col-md-8 mx-auto">
          <FaHeart size={44} className="text-muted mb-3 opacity-50" />
          <h4 className="fw-bold text-dark mb-2">No items saved yet</h4>
          <p className="text-muted mb-4">
            Tap the heart icon on any product in our shop to save your favorite gear here.
          </p>
          <Link to="/product" className="btn btn-primary px-4 rounded-pill">
            <FaArrowLeft size={12} className="me-1" /> Browse Sports Catalog
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <div className="card h-100 border-0 shadow-sm hover-card rounded-4 overflow-hidden">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge rounded-pill bg-light text-secondary border px-2 py-1">
                      {item.category}
                    </span>
                    <button
                      className="btn btn-sm btn-link text-danger p-0 d-inline-flex align-items-center gap-1 text-decoration-none small"
                      onClick={() => onToggleWishlist(item)}
                      title="Remove from wishlist"
                    >
                      <FaTrashAlt size={12} /> Remove
                    </button>
                  </div>

                  <h6 className="fw-bold text-dark mt-2 mb-2 text-truncate" title={item.name}>
                    {item.name}
                  </h6>

                  <div className="mt-auto pt-2">
                    <div className="mb-2">
                      <span className="text-primary fw-bold fs-5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.oldPrice && (
                        <span className="text-decoration-line-through text-muted small ms-2">
                          ₹{item.oldPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 btn-sm py-2"
                      onClick={() => onAddToCart(item)}
                    >
                      <FaShoppingCart size={13} /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
