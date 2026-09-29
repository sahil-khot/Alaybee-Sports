import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

function Cart({ cart, subtotal, onUpdateQuantity, onRemove }) {
  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1">
          <FaShoppingBag size={12} /> Shopping Bag
        </span>
        <h1 className="fw-bold mt-3 mb-1">Your Shopping Cart</h1>
        <p className="text-muted small">
          Review your equipment selection and proceed to secure checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5 bg-white border rounded-4 shadow-sm p-4 col-md-8 mx-auto">
          <FaShoppingBag size={48} className="text-muted mb-3 opacity-50" />
          <h4 className="fw-bold text-dark mb-2">Your cart is currently empty</h4>
          <p className="text-muted mb-4">
            Looks like you haven't added any sports gear to your cart yet.
          </p>
          <Link to="/product" className="btn btn-primary px-4 rounded-pill">
            <FaArrowLeft size={12} className="me-1" /> Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold text-muted">
                {cart.length} unique item{cart.length > 1 ? "s" : ""} in cart
              </span>
              <Link
                to="/product"
                className="btn btn-link text-primary p-0 d-inline-flex align-items-center gap-1 text-decoration-none small"
              >
                <FaArrowLeft size={11} /> Continue shopping
              </Link>
            </div>

            {cart.map((item) => (
              <div className="section-card p-3 mb-3 shadow-sm" key={item.id}>
                <div className="d-flex gap-3 align-items-center flex-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image border"
                  />
                  <div className="flex-grow-1" style={{ minWidth: "180px" }}>
                    <span className="badge bg-light text-secondary border mb-1">
                      {item.category}
                    </span>
                    <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                    <p className="fw-bold text-primary mb-0 fs-6">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      {item.quantity > 1 && (
                        <span className="text-muted fw-normal small ms-2">
                          (₹{item.price.toLocaleString("en-IN")} each)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center border rounded-3 p-1 bg-light">
                    <button
                      className="btn btn-light btn-sm py-1 px-2 border-0"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="fw-bold px-3">{item.quantity}</span>
                    <button
                      className="btn btn-light btn-sm py-1 px-2 border-0"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  <button
                    className="btn btn-link text-danger p-2 d-inline-flex align-items-center gap-1 text-decoration-none small"
                    onClick={() => onRemove(item.id)}
                    title="Remove product"
                  >
                    <FaTrashAlt size={13} />
                    <span className="d-none d-sm-inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="summary-box p-4 shadow-sm">
              <h5 className="fw-bold mb-3 text-dark">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal</span>
                <span className="fw-semibold text-dark">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Standard Delivery</span>
                <span className="fw-semibold text-dark">
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5 mb-4 text-dark">
                <span>Total Amount</span>
                <span className="text-primary">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-3"
              >
                <FaLock size={13} /> Proceed to Checkout
              </Link>

              <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                <FaShieldAlt className="text-success" />
                <span>SSL Encrypted & Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
