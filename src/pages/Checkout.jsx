import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaShoppingBag,
  FaTruck,
  FaReceipt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

function Checkout({ cart = [], subtotal = 0, onPlaceOrder, onClearCart }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    city: user?.city || "Bengaluru",
    pinCode: "560001",
    paymentMethod: "UPI",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();

    // 1. Check if cart has items
    if (cart.length === 0) {
      setErrorMessage("Your cart is empty! Please add items to your cart before placing an order.");
      return;
    }

    // 2. Validate all mandatory fields
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = true;
    if (!form.lastName.trim()) errors.lastName = true;
    if (!form.address.trim()) errors.address = true;
    if (!form.city.trim()) errors.city = true;
    if (!form.pinCode.trim()) errors.pinCode = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fill the details before placing your order.");
      // Scroll smoothly to top of form
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    // 3. All valid: generate order
    const orderId = "ALB-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now(),
      customer: {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        phone: form.phone.trim() || user?.phone || "N/A",
        email: form.email.trim() || user?.email || "athlete@alaybee.com",
        address: form.address.trim(),
        city: form.city.trim(),
        pinCode: form.pinCode.trim(),
      },
      paymentMethod: form.paymentMethod || "UPI",
      items: [...cart],
      subtotal,
      shipping,
      total,
      status: "Confirmed",
      estimatedDelivery: "3-5 Business Days",
    };

    // Save to global orders and localStorage
    if (onPlaceOrder) {
      onPlaceOrder(orderData);
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem("alaybee_orders") || "[]");
        localStorage.setItem("alaybee_orders", JSON.stringify([orderData, ...saved]));
      } catch (err) {
        console.error(err);
      }
    }

    // Clear cart
    if (onClearCart) {
      onClearCart();
    }

    // Set success state
    setPlacedOrder(orderData);
    setErrorMessage("");
    setFieldErrors({});
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2">
          Checkout
        </span>
        <h1 className="main-heading mt-3">Complete your order</h1>
        {!isAuthenticated && !placedOrder && (
          <p className="body-text mt-2">
            Have an account?{" "}
            <Link to="/login" className="fw-semibold text-primary">
              Log in with 1-click Demo Account
            </Link>{" "}
            for instant checkout!
          </p>
        )}
      </div>

      {/* Success Notification in Green */}
      {placedOrder ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5"
              style={{ borderTop: "6px solid #198754" }}
            >
              <div
                className="p-4 p-md-5 text-center"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 shadow"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "38px",
                    backgroundColor: "#198754",
                  }}
                >
                  <FaCheckCircle />
                </div>

                {/* Explicit green heading requested */}
                <h2 className="fw-bold mb-2" style={{ color: "#198754" }}>
                  Order placed successfully!
                </h2>
                <p className="text-success-emphasis fs-5 mb-3">
                  Thank you, <strong>{placedOrder.customer.name}</strong>! Your sports order has been confirmed.
                </p>

                <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-white rounded-pill border border-success-subtle shadow-sm mb-4">
                  <span className="text-muted small">Order ID:</span>
                  <span className="fw-bold text-dark fs-6">#{placedOrder.id}</span>
                </div>

                <div className="row g-3 text-start bg-white p-4 rounded-4 border border-success-subtle shadow-sm mb-4">
                  <div className="col-sm-6">
                    <span className="text-muted small d-block">Delivery Address:</span>
                    <strong className="text-dark d-block">{placedOrder.customer.name}</strong>
                    <span className="text-muted small">
                      {placedOrder.customer.address}, {placedOrder.customer.city} - {placedOrder.customer.pinCode}
                    </span>
                  </div>
                  <div className="col-sm-3 col-6">
                    <span className="text-muted small d-block">Payment Method:</span>
                    <strong className="text-dark">{placedOrder.paymentMethod}</strong>
                    <span className="badge bg-success-subtle text-success border border-success-subtle d-block mt-1 w-auto">
                      Paid / Authorized
                    </span>
                  </div>
                  <div className="col-sm-3 col-6">
                    <span className="text-muted small d-block">Total Paid:</span>
                    <h5 className="fw-bold text-primary mb-0">
                      ₹{placedOrder.total?.toLocaleString("en-IN")}
                    </h5>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link
                    to="/orders"
                    className="btn btn-success btn-lg px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                  >
                    <FaReceipt size={16} />
                    View My Orders
                  </Link>

                  <Link
                    to={`/track-order?id=${placedOrder.id}`}
                    className="btn btn-outline-success btn-lg px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                  >
                    <FaTruck size={16} />
                    Track Shipment
                  </Link>

                  <Link
                    to="/product"
                    className="btn btn-outline-secondary btn-lg px-4 py-2 d-flex align-items-center gap-2"
                  >
                    <FaShoppingBag size={15} />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Checkout Form & Summary */
        <>
          {/* Validation Notice Alert if details are missing */}
          {errorMessage && (
            <div
              className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm rounded-4 mb-4"
              role="alert"
            >
              <FaExclamationCircle className="text-danger flex-shrink-0 fs-5" />
              <div>
                <strong>Action Required: </strong>
                {errorMessage}
              </div>
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={() => setErrorMessage("")}
                aria-label="Close"
              />
            </div>
          )}

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="section-card p-4">
                <h4 className="fw-bold mb-3 text-dark">Delivery & Contact Details</h4>

                <form onSubmit={handlePlaceOrder}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        First name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${fieldErrors.firstName ? "is-invalid border-danger" : ""}`}
                        placeholder="Enter first name"
                        value={form.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                      {fieldErrors.firstName && (
                        <div className="text-danger small mt-1">Please enter your first name.</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Last name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${fieldErrors.lastName ? "is-invalid border-danger" : ""}`}
                        placeholder="Enter last name"
                        value={form.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                      {fieldErrors.lastName && (
                        <div className="text-danger small mt-1">Please enter your last name.</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile number (optional)"
                        value={form.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="For order receipts"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${fieldErrors.address ? "is-invalid border-danger" : ""}`}
                        rows="3"
                        placeholder="Flat / House no., Building, Street, Area"
                        value={form.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                      {fieldErrors.address && (
                        <div className="text-danger small mt-1">Please enter delivery address.</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${fieldErrors.city ? "is-invalid border-danger" : ""}`}
                        placeholder="e.g. Bengaluru, Mumbai"
                        value={form.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                      {fieldErrors.city && (
                        <div className="text-danger small mt-1">Please enter city.</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        PIN code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${fieldErrors.pinCode ? "is-invalid border-danger" : ""}`}
                        placeholder="e.g. 560001"
                        value={form.pinCode}
                        onChange={(e) => handleInputChange("pinCode", e.target.value)}
                      />
                      {fieldErrors.pinCode && (
                        <div className="text-danger small mt-1">Please enter PIN code.</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Payment method</label>
                      <select
                        className="form-select"
                        value={form.paymentMethod}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      >
                        <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                        <option value="Credit / Debit Card">Credit / Debit Card</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                      </select>
                    </div>

                    <div className="col-12 mt-3">
                      <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-2 small text-muted">
                        <FaShieldAlt className="text-primary fs-5" />
                        <span>
                          Safe & Secure 256-bit SSL encrypted checkout. Guaranteed authentic Alaybee sports products.
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="summary-box p-4">
                <h4 className="fw-bold mb-3 text-dark">Order Summary</h4>
                
                {cart.length === 0 ? (
                  <div className="alert alert-light border text-center py-4 mb-3">
                    <p className="text-muted mb-2">No items in your cart.</p>
                    <Link to="/product" className="btn btn-outline-primary btn-sm">
                      Browse Sports Gear
                    </Link>
                  </div>
                ) : (
                  <div className="mb-3" style={{ maxHeight: "240px", overflowY: "auto" }}>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "36px",
                              height: "36px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=150&q=80";
                            }}
                          />
                          <div style={{ maxWidth: "210px" }}>
                            <span className="small fw-semibold text-dark text-truncate d-block">
                              {item.name}
                            </span>
                            <span className="text-muted small">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="fw-semibold text-dark">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold text-dark">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-semibold text-dark">₹{shipping.toLocaleString("en-IN")}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  className="btn btn-primary w-100 py-3 fw-bold fs-6 shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Place order</span>
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
