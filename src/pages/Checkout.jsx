import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Checkout({ cart, subtotal }) {
  const { user, isAuthenticated } = useAuth();
  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    phone: user?.phone || "",
    city: user?.city || "Bengaluru",
    address: "",
    pinCode: "560001",
  });

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge text-bg-primary rounded-pill px-3 py-2">
          Checkout
        </span>
        <h1 className="main-heading mt-3">Complete your order</h1>
        {!isAuthenticated && (
          <p className="body-text mt-2">
            Have an account?{" "}
            <Link to="/login" className="fw-semibold text-primary">
              Log in with 1-click Demo Account
            </Link>{" "}
            for instant checkout!
          </p>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="section-card p-4">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Street, area, city"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bengaluru"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">PIN code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="560001"
                    value={form.pinCode}
                    onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Payment method</label>
                  <select className="form-select">
                    <option>UPI</option>
                    <option>Credit / Debit Card</option>
                    <option>Cash on Delivery</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="summary-box p-4">
            <h4 className="fw-bold mb-3">Order Summary</h4>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString("en-IN")}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <Link to="/" className="btn btn-primary w-100 mt-4">
              Place order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
