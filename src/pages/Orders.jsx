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
                    <div className="row g-4">
                      {/* Products column */}
                      <div className="col-lg-8">
                        <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                          <FaReceipt className="text-primary" />
                          Purchased Items ({order.items?.length || 0})
                        </h6>

                        <div className="d-flex flex-column gap-3">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-white"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80";
                                  }}
                                />
                                <div>
                                  <h6 className="mb-0 fw-semibold text-dark" style={{ fontSize: "14px" }}>
                                    {item.name}
                                  </h6>
                                  <span className="small text-muted">
                                    Qty: <strong className="text-dark">{item.quantity}</strong> × ₹{item.price?.toLocaleString("en-IN")}
                                  </span>
                                  {item.category && (
                                    <span className="badge bg-light text-muted border ms-2 small">
                                      {item.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="fw-bold text-dark fs-6 pe-2">
                                ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery & summary column */}
                      <div className="col-lg-4">
                        <div className="p-3 bg-light rounded-3 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-1">
                              <FaMapMarkerAlt className="text-danger" size={13} />
                              Delivery Address
                            </h6>
                            <p className="small mb-1 text-dark fw-semibold">
                              {order.customer?.name}
                            </p>
                            <p className="small text-muted mb-1">
                              {order.customer?.address}
                            </p>
                            <p className="small text-muted mb-2">
                              {order.customer?.city} - {order.customer?.pinCode}
                            </p>
                            {order.customer?.phone && (
                              <p className="small text-muted mb-2">
                                Phone: {order.customer?.phone}
                              </p>
                            )}

                            <hr className="my-2" />
                            <div className="d-flex justify-content-between small text-muted mb-1">
                              <span>Payment Method:</span>
                              <strong className="text-dark">{order.paymentMethod || "UPI"}</strong>
                            </div>
                            <div className="d-flex justify-content-between small text-muted mb-1">
                              <span>Shipping:</span>
                              <strong className="text-dark">
                                {order.shipping ? `₹${order.shipping}` : "FREE"}
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between small fw-bold text-dark mt-2 pt-2 border-top">
                              <span>Grand Total:</span>
                              <span className="text-primary fs-6">
                                ₹{order.total?.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2">
                            <Link
                              to={`/track-order?id=${order.id}`}
                              className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
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
