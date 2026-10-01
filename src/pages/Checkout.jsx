import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaCheckCircle,
  FaCheck,
  FaExclamationCircle,
  FaShoppingBag,
  FaTruck,
  FaReceipt,
  FaShieldAlt,
  FaArrowRight,
  FaLock,
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

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
      setErrorMessage("Please fill all required delivery details before proceeding.");
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    // 3. Initiate realistic payment gateway authorization
    const orderId = "ALB-" + Math.floor(100000 + Math.random() * 900000);
    const txnId = "TXN" + Date.now().toString().slice(-8) + Math.floor(1000 + Math.random() * 9000);
    const orderData = {
      id: orderId,
      txnId,
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

    setIsProcessing(true);
    setProcessingStep(1);
    setErrorMessage("");
    window.scrollTo({ top: 80, behavior: "smooth" });

    // Step 2: Payment Authorization (750ms)
    setTimeout(() => {
      setProcessingStep(2);
    }, 750);

    // Step 3: Order confirmation & tax invoice generation (1500ms)
    setTimeout(() => {
      setProcessingStep(3);
    }, 1500);

    // Final: Success state (2250ms)
    setTimeout(() => {
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

      if (onClearCart) {
        onClearCart();
      }

      setIsProcessing(false);
      setPlacedOrder(orderData);
      setFieldErrors({});
      window.scrollTo({ top: 80, behavior: "smooth" });
    }, 2250);
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

      {/* 1. Realistic Payment Gateway Loading State */}
      {isProcessing ? (
        <div className="row justify-content-center my-4">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 text-center bg-white position-relative overflow-hidden">
              <div className="mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-primary mb-3 bg-primary-subtle shadow-sm payment-pulse"
                  style={{ width: "88px", height: "88px", fontSize: "36px" }}
                >
                  <FaShieldAlt />
                </div>
                <h3 className="fw-bold text-dark mb-1">Authorizing Payment...</h3>
                <p className="text-muted small mb-0">
                  Please do not refresh or press back while we securely process your transaction.
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="progress rounded-pill mb-2" style={{ height: "10px", backgroundColor: "#e2e8f0" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                    role="progressbar"
                    style={{
                      width: processingStep === 1 ? "30%" : processingStep === 2 ? "70%" : "95%",
                      transition: "width 0.6s ease-in-out",
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span className="fw-semibold text-primary">
                    {processingStep === 1 && "Connecting to secure banking gateway..."}
                    {processingStep === 2 && `Verifying ₹${total.toLocaleString("en-IN")} via ${form.paymentMethod}...`}
                    {processingStep === 3 && "Payment Authorized! Generating receipt & invoice..."}
                  </span>
                  <span>{processingStep === 1 ? "30%" : processingStep === 2 ? "70%" : "95%"}</span>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 text-start small border">
                <div className="d-flex justify-content-between mb-1 text-muted">
                  <span>Merchant:</span>
                  <strong className="text-dark">Alaybee Sports Direct</strong>
                </div>
                <div className="d-flex justify-content-between mb-1 text-muted">
                  <span>Payable Amount:</span>
                  <strong className="text-primary fw-bold">₹{total.toLocaleString("en-IN")}</strong>
                </div>
                <div className="d-flex justify-content-between text-muted">
                  <span>Payment Channel:</span>
                  <span className="badge bg-secondary-subtle text-dark">{form.paymentMethod}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-top text-center text-muted small d-flex align-items-center justify-content-center gap-2">
                <FaLock className="text-success" size={12} />
                <span>256-Bit Bank Grade Encryption • NPCI / RBI Certified Gateway</span>
              </div>
            </div>
          </div>
        </div>
      ) : placedOrder ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
              {/* Payment Success Header Banner */}
              <div
                className="p-4 p-md-5 text-center text-white position-relative"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                }}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-success mb-3 shadow-lg bg-white"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "40px",
                  }}
                >
                  <FaCheckCircle className="text-success" />
                </div>

                <div className="mb-2">
                  <span className="badge bg-white bg-opacity-25 text-white rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5">
                    <FaCheck size={11} /> Payment Approved & Verified
                  </span>
                </div>
                <h2 className="fw-bold mb-1 text-white">Payment Successful & Order Confirmed!</h2>
                <p className="mb-0 text-white text-opacity-75" style={{ fontSize: "15px" }}>
                  Thank you, <strong>{placedOrder.customer.name}</strong>! Your sports gear order has been confirmed.
                </p>
              </div>

              {/* Transaction & Order Details */}
              <div className="p-4 p-md-5 bg-white">
                {/* Reference Banner */}
                <div className="d-flex flex-wrap justify-content-between align-items-center p-3 rounded-3 bg-light border mb-4 gap-2">
                  <div>
                    <span className="small text-muted d-block">Transaction ID</span>
                    <span className="fw-bold text-dark font-monospace" style={{ fontSize: "14px" }}>
                      {placedOrder.txnId || "TXN-8472910394"}
                    </span>
                  </div>
                  <div>
                    <span className="small text-muted d-block">Order Reference</span>
                    <span className="badge bg-dark text-white rounded-pill px-3 py-1.5 font-monospace">
                      #{placedOrder.id}
                    </span>
                  </div>
                  <div>
                    <span className="small text-muted d-block">Payment Mode</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1">
                      {placedOrder.paymentMethod} • Paid
                    </span>
                  </div>
                </div>

                {/* Items & Address Summary */}
                <div className="row g-4 mb-4">
                  <div className="col-md-7">
                    <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-1.5">
                      <FaReceipt className="text-primary" size={14} /> Purchased Items ({placedOrder.items.length})
                    </h6>
                    <div className="d-flex flex-column gap-2">
                      {placedOrder.items.map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-light bg-opacity-50">
                          <div className="d-flex align-items-center gap-2.5">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "6px" }}
                            />
                            <div>
                              <span className="fw-semibold text-dark d-block small text-truncate" style={{ maxWidth: "200px" }}>
                                {item.name}
                              </span>
                              <span className="text-muted" style={{ fontSize: "12px" }}>
                                Qty: {item.quantity} × ₹{item.price?.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                          <span className="fw-bold text-dark small">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-5">
                    <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-1.5">
                      <FaTruck className="text-primary" size={14} /> Dispatch & Billing Details
                    </h6>
                    <div className="p-3 bg-light rounded-3 border">
                      <span className="small text-muted d-block">Shipping Address:</span>
                      <strong className="text-dark d-block small mb-1">{placedOrder.customer.name}</strong>
                      <span className="text-muted d-block small mb-2">
                        {placedOrder.customer.address}, {placedOrder.customer.city} - {placedOrder.customer.pinCode}
                      </span>

                      <div className="border-top pt-2 mt-2">
                        <div className="d-flex justify-content-between small text-muted mb-1">
                          <span>Items Subtotal:</span>
                          <span className="text-dark">₹{placedOrder.subtotal?.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between small text-muted mb-1">
                          <span>Delivery Fee:</span>
                          <span className="text-dark">{placedOrder.shipping ? `₹${placedOrder.shipping}` : "FREE"}</span>
                        </div>
                        <div className="d-flex justify-content-between small text-muted mb-1">
                          <span>Taxes (GST):</span>
                          <span className="text-success">Included</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold text-dark pt-1 border-top mt-1">
                          <span>Total Paid:</span>
                          <span className="text-primary fs-6">₹{placedOrder.total?.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action buttons */}
                <div className="d-flex flex-wrap justify-content-center gap-3 pt-2">
                  <Link
                    to="/orders"
                    className="btn btn-primary btn-lg px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 rounded-pill shadow-sm"
                  >
                    <FaReceipt size={15} />
                    View My Orders
                  </Link>

                  <Link
                    to={`/track-order?id=${placedOrder.id}`}
                    className="btn btn-outline-dark btn-lg px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 rounded-pill"
                  >
                    <FaTruck size={15} />
                    Track Live Shipment
                  </Link>

                  <Link
                    to="/product"
                    className="btn btn-link text-muted p-2 d-flex align-items-center gap-1.5 text-decoration-none"
                  >
                    <FaShoppingBag size={14} />
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
