import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        city: formData.city,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-7 col-xl-6">
          <div className="auth-card p-4 p-md-5">
            <div className="text-center mb-4">
              <Link to="/" title="Alaybee Sports Home">
                <img
                  src="/logo.png"
                  alt="Alaybee Sports Logo"
                  className="mx-auto mb-3"
                  style={{
                    height: "58px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Link>
              <div>
                <span className="badge text-bg-primary rounded-pill px-3 py-2">
                  Join Alaybee Sports
                </span>
              </div>
              <h1 className="main-heading mt-3 mb-1">Create Account</h1>
              <p className="body-text">Register for personalized kits & exclusive deals</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 small" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                    Account Type / Role
                  </label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Club Member (Sports Enthusiast)</option>
                    <option value="athlete">Pro Athlete (Specialized Gear)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                  City / Location
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="e.g. Bengaluru, Karnataka"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="form-control"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 cta-button"
              >
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </form>

            <div className="text-center mt-4 pt-2 border-top">
              <p className="body-text mb-0">
                Already registered?{" "}
                <Link to="/login" className="fw-semibold text-primary">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
