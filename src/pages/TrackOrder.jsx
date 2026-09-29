import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaTruck, FaBox, FaCheckCircle, FaSearch, FaShoppingBag } from "react-icons/fa";

function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const idFromQuery = searchParams.get("id");
    if (idFromQuery) {
      setOrderId(idFromQuery);
      handleTrack(idFromQuery);
    } else {
      // Auto-load the most recent order from localStorage if available
      try {
        const saved = localStorage.getItem("alaybee_orders");
        if (saved) {
          const list = JSON.parse(saved);
          if (list && list.length > 0) {
            setOrderId(list[0].id);
            setTrackedOrder(list[0]);
            setSearched(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [searchParams]);

  const handleTrack = (idToSearch) => {
    const targetId = (idToSearch || orderId).trim();
    if (!targetId) return;

    setSearched(true);
    try {
      const saved = localStorage.getItem("alaybee_orders");
      if (saved) {
        const list = JSON.parse(saved);
        const match = list.find(
          (o) =>
            o.id.toLowerCase() === targetId.toLowerCase() ||
            o.id.toLowerCase() === `#${targetId.toLowerCase()}`
        );
        if (match) {
          setTrackedOrder(match);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Default mock response if not in local storage or dummy ID
    setTrackedOrder({
      id: targetId.startsWith("#") ? targetId.slice(1) : targetId,
      date: "Recent",
      status: "In transit",
      customer: { city: "Bengaluru", name: "Valued Athlete" },
      total: 2647,
      items: [{ name: "Sports Gear & Accessories", quantity: 1, price: 2647 }],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleTrack();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="section-card p-4 p-md-5 text-center shadow-sm">
            <span className="badge text-bg-primary rounded-pill px-3 py-2 mb-3">
              Order tracking
            </span>
            <h1 className="fw-bold mb-2">Track your shipment</h1>
            <p className="text-muted mb-4">
              Enter your Order ID (e.g., ALB-123456) to check the live delivery status.
            </p>

            <form onSubmit={onSubmit} className="row g-2 justify-content-center mb-4">
              <div className="col-md-7">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch className="text-muted" size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter order ID (e.g. ALB-824109)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold">
                  Track Order
                </button>
              </div>
            </form>

            {searched && trackedOrder && (
              <div className="mt-4 text-start">
                <div className="card border-0 bg-light rounded-4 p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div>
                      <span className="text-muted small d-block">Tracking Order</span>
                      <h5 className="fw-bold text-dark mb-0">#{trackedOrder.id}</h5>
                    </div>
                    <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                      Status: {trackedOrder.status || "In transit"}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between text-muted small fw-semibold mb-2">
                    <span className="text-primary d-flex align-items-center gap-1">
                      <FaCheckCircle size={12} /> Order placed
                    </span>
                    <span className="text-primary d-flex align-items-center gap-1">
                      <FaCheckCircle size={12} /> Packed
                    </span>
                    <span className="text-primary d-flex align-items-center gap-1">
                      <FaTruck size={12} /> Shipped
                    </span>
                    <span className="text-muted">Delivered</span>
                  </div>

                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Shipping progress"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "10px" }}
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                      style={{ width: "75%" }}
                    ></div>
                  </div>

                  <div className="row g-3 mt-3 pt-2">
                    <div className="col-sm-6">
                      <span className="text-muted small d-block">Estimated Delivery:</span>
                      <strong className="text-dark">3 - 5 Business Days</strong>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <span className="text-muted small d-block">Carrier:</span>
                      <strong className="text-dark">Alaybee Express Logistics</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top d-flex gap-2">
                    <Link to="/orders" className="btn btn-outline-primary btn-sm">
                      View All My Orders
                    </Link>
                    <Link to="/product" className="btn btn-light btn-sm text-muted">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
