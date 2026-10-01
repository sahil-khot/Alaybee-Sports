import { Link } from "react-router-dom";
import { FaBoxOpen, FaTruck, FaCheckCircle, FaReceipt, FaShoppingBag, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function Orders({ orders = [] }) {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2">
          Order History
        </span>
        <h1 className="main-heading mt-3">My Orders</h1>
        <p className="body-text mt-2 text-muted">
          Track and view details of all your sports equipment purchases
        </p>
      </div>

      {orders.length === 0 ? (
        /* Empty State */
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5 text-center">
            <div className="section-card p-5">
              <div
                className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center text-primary mb-3 shadow-sm"
                style={{ width: "80px", height: "80px", fontSize: "36px" }}
              >
                <FaBoxOpen />
              </div>
              <h3 className="card-heading mb-2">No orders placed yet</h3>
              <p className="body-text text-muted mb-4">
                Looks like you haven't placed an order yet. Browse our top sports equipment and complete your workout or match kit!
              </p>
              <Link to="/product" className="btn btn-primary cta-button px-4 py-2">
                <FaShoppingBag className="me-2" />
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Orders List */
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold">
                Total Orders: {orders.length}
              </span>
              <Link to="/product" className="btn btn-outline-primary btn-sm">
                + Continue Shopping
              </Link>
            </div>

            <div className="d-flex flex-column gap-4">
              {orders.map((order) => (
                <div key={order.id} className="section-card overflow-hidden shadow-sm">
                  {/* Order Top Bar */}
                  <div className="bg-light p-3 px-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <span className="small text-muted d-block">ORDER PLACED</span>
                        <span className="fw-semibold text-dark d-flex align-items-center gap-1">
                          <FaCalendarAlt size={13} className="text-muted" />
                          {order.date}
                        </span>
                      </div>
                      <div className="border-start ps-3">
                        <span className="small text-muted d-block">TOTAL</span>
                        <span className="fw-bold text-primary">
                          ₹{order.total?.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="border-start ps-3 d-none d-sm-block">
                        <span className="small text-muted d-block">SHIP TO</span>
                        <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: "160px" }}>
                          {order.customer?.name || "Customer"}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold d-flex align-items-center gap-1">
                        <FaCheckCircle size={12} />
                        {order.status || "Confirmed"}
                      </span>
                      <span className="badge bg-dark text-white rounded-pill px-3 py-2">
                        #{order.id}
                      </span>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-4">
                    <div className="row g-4 align-items-stretch">
                      {/* Products & Tracking Progress column */}
                      <div className="col-lg-7 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                              <FaReceipt className="text-primary" />
                              Purchased Items ({order.items?.length || 0})
                            </h6>
                            <span className="badge bg-light text-muted border small">
                              Direct Manufacturer Dispatch
                            </span>
                          </div>

                          <div className="d-flex flex-column gap-2 mb-4">
                            {order.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className="d-flex align-items-center justify-content-between p-3 rounded-3 border bg-light bg-opacity-50"
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                      width: "64px",
                                      height: "64px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80";
                                    }}
                                  />
                                  <div>
                                    <h6 className="mb-1 fw-semibold text-dark" style={{ fontSize: "14px" }}>
                                      {item.name}
                                    </h6>
                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                      <span className="small text-muted">
                                        Qty: <strong className="text-dark">{item.quantity}</strong> × ₹{item.price?.toLocaleString("en-IN")}
                                      </span>
                                      {item.category && (
                                        <span className="badge bg-white text-secondary border px-2 py-0.5" style={{ fontSize: "11px" }}>
                                          {item.category}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <span className="fw-bold text-dark fs-6 pe-2">
                                  ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Fulfillment & Progress Bar to eliminate blank space on left */}
                        <div className="p-3 bg-white border rounded-3 mt-auto shadow-xs">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small fw-bold text-dark d-flex align-items-center gap-1.5">
                              <FaTruck className="text-primary" size={13} /> Shipment Progress
                            </span>
                            <span className="badge bg-success-subtle text-success small px-2 py-0.5">
                              Estimated Delivery: 3-5 Days
                            </span>
                          </div>

                          {/* Progress steps */}
                          <div className="order-steps-container py-2">
                            <div className="d-flex justify-content-between position-relative">
                              <div className="text-center" style={{ width: "25%", zIndex: 2 }}>
                                <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center shadow-xs" style={{ width: "26px", height: "26px", fontSize: "12px" }}>
                                  ✓
                                </div>
                                <span className="d-block small text-dark fw-semibold mt-1" style={{ fontSize: "11px" }}>Placed</span>
                              </div>
                              <div className="text-center" style={{ width: "25%", zIndex: 2 }}>
                                <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center shadow-xs" style={{ width: "26px", height: "26px", fontSize: "12px" }}>
                                  ✓
                                </div>
                                <span className="d-block small text-dark fw-semibold mt-1" style={{ fontSize: "11px" }}>Confirmed</span>
                              </div>
                              <div className="text-center" style={{ width: "25%", zIndex: 2 }}>
                                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center shadow-xs" style={{ width: "26px", height: "26px", fontSize: "12px" }}>
                                  ●
                                </div>
                                <span className="d-block small text-primary fw-semibold mt-1" style={{ fontSize: "11px" }}>Packed</span>
                              </div>
                              <div className="text-center" style={{ width: "25%", zIndex: 2 }}>
                                <div className="rounded-circle bg-light border text-muted d-inline-flex align-items-center justify-content-center" style={{ width: "26px", height: "26px", fontSize: "12px" }}>
                                  ○
                                </div>
                                <span className="d-block small text-muted mt-1" style={{ fontSize: "11px" }}>Delivered</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery & summary column */}
                      <div className="col-lg-5 d-flex">
                        <div className="p-3 bg-light rounded-3 w-100 d-flex flex-column justify-content-between border">
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                              <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-1.5">
                                <FaMapMarkerAlt className="text-danger" size={13} />
                                Delivery Address
                              </h6>
                              <span className="badge bg-white text-muted border small">Verified</span>
                            </div>

                            <p className="small mb-1 text-dark fw-bold">
                              {order.customer?.name}
                            </p>
                            <p className="small text-muted mb-1">
                              {order.customer?.address}
                            </p>
                            <p className="small text-muted mb-2">
                              {order.customer?.city} - {order.customer?.pinCode}
                            </p>
                            {order.customer?.phone && (
                              <p className="small text-muted mb-3">
                                📞 <strong>Phone:</strong> {order.customer?.phone}
                              </p>
                            )}

                            <div className="bg-white p-2.5 rounded-3 border mb-3">
                              <div className="d-flex justify-content-between small text-muted mb-1">
                                <span>Payment Method:</span>
                                <span className="badge bg-success-subtle text-success border border-success-subtle">
                                  {order.paymentMethod || "UPI"} (Paid)
                                </span>
                              </div>
                              <div className="d-flex justify-content-between small text-muted mb-1">
                                <span>Shipping:</span>
                                <strong className="text-dark">
                                  {order.shipping ? `₹${order.shipping}` : "FREE"}
                                </strong>
                              </div>
                              <div className="d-flex justify-content-between small fw-bold text-dark pt-1 border-top mt-1">
                                <span>Grand Total:</span>
                                <span className="text-primary fs-6">
                                  ₹{order.total?.toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Link
                              to={`/track-order?id=${order.id}`}
                              className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold shadow-sm"
                            >
                              <FaTruck size={14} />
                              Track Shipment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
