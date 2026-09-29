function TrackOrder() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="section-card p-4 text-center">
            <span className="badge text-bg-primary rounded-pill px-3 py-2 mb-3">
              Order tracking
            </span>
            <h1 className="fw-bold mb-4">Track your shipment</h1>

            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter order ID"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary btn-lg w-100">Track</button>
              </div>
            </div>

            <div className="mt-5">
              <div className="card border-0 bg-light rounded-4 p-4">
                <h5 className="fw-bold mb-3">Status: In transit</h5>
                <div className="d-flex justify-content-between text-muted mb-2">
                  <span>Order placed</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Shipping progress"
                  aria-valuenow="66"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div className="progress-bar" style={{ width: "66%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
