import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Cart({ cart, subtotal, onUpdateQuantity, onRemove }) {
  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5 mb-2">
          <FaShoppingBag size={12} /> Shopping Bag
        </span>
        <h1 className="fw-bold mt-2 mb-1">Your Shopping Cart</h1>
        <p className="text-muted small">
          Review your equipment selection and proceed to secure checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5 bg-white border rounded-4 shadow-sm p-4 col-md-8 col-lg-6 mx-auto">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center text-muted mb-3"
            style={{ width: "80px", height: "80px", fontSize: "32px" }}
          >
            <FaShoppingBag className="opacity-50" />
          </div>
          <h4 className="fw-bold text-dark mb-2">Your cart is currently empty</h4>
          <p className="text-muted mb-4 small">
            Looks like you haven't added any sports gear to your kit yet. Explore our authentic tournament-grade equipment!
          </p>
          <Link
            to="/product"
            className="btn btn-primary btn-lg rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
          >
            <FaArrowLeft size={13} /> Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4 align-items-start">
          {/* Cart items column */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold text-dark small">
                {cart.length} unique item{cart.length > 1 ? "s" : ""} in bag
              </span>
              <Link
                to="/product"
                className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1.5 small text-decoration-none"
              >
                <FaArrowLeft size={11} /> Continue shopping
              </Link>
            </div>

            {cart.map((item) => (
              <div className="section-card p-3 mb-3 shadow-sm rounded-4 border bg-white" key={item.id}>
                <div className="d-flex gap-3 align-items-center flex-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image border rounded-3"
                    style={{ width: "72px", height: "72px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80";
                    }}
                  />

                  <div className="flex-grow-1" style={{ minWidth: "180px" }}>
                    <span className="badge bg-light text-secondary border mb-1" style={{ fontSize: "11px" }}>
                      {item.category}
                    </span>
                    <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "15px" }}>{item.name}</h6>
                    <p className="fw-bold text-primary mb-0 fs-6">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      {item.quantity > 1 && (
                        <span className="text-muted fw-normal small ms-2" style={{ fontSize: "12px" }}>
                          (₹{item.price.toLocaleString("en-IN")} each)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Natural Quantity Stepper */}
                  <div className="d-flex align-items-center border rounded-pill px-2 py-1 bg-light shadow-xs">
                    <button
                      type="button"
                      className="btn-qty-stepper"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="fw-bold px-3 text-dark text-center" style={{ minWidth: "28px" }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="btn-qty-stepper"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Natural Remove Item Button */}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger border-0 rounded-pill px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 remove-cart-item-btn"
                    onClick={() => onRemove(item.id)}
                    title="Remove item"
                  >
                    <FaTrashAlt size={12} />
                    <span className="d-none d-sm-inline" style={{ fontSize: "12px" }}>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="col-lg-4">
            <div className="summary-box p-4 shadow-sm rounded-4 border bg-white">
              <h5 className="fw-bold mb-3 text-dark pb-2 border-bottom">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2 text-secondary small">
                <span>Subtotal ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="fw-semibold text-dark">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary small">
                <span>Estimated Shipping</span>
                <span className="fw-semibold text-dark">
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary small">
                <span>Applicable GST / Taxes</span>
                <span className="text-success fw-semibold">Included</span>
              </div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between fw-bold fs-5 mb-4 text-dark">
                <span>Total Amount</span>
                <span className="text-primary">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Natural Primary Checkout CTA */}
              <Link
                to="/checkout"
                className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3 checkout-cta-btn"
              >
                <FaLock size={13} />
                <span>Proceed to Checkout</span>
                <FaArrowRight size={13} />
              </Link>

              <div className="p-2.5 bg-light rounded-3 text-center text-muted small d-flex align-items-center justify-content-center gap-1.5 border">
                <FaShieldAlt className="text-success" size={14} />
                <span>256-Bit Encrypted & Buyer Protected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
