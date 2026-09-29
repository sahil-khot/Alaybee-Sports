import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectPath = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-click login with dummy accounts
  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setLoading(true);

    try {
      await login(demoEmail, demoPassword);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Quick login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
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
                  Authentication
                </span>
              </div>
              <h1 className="main-heading mt-3 mb-1">Welcome Back</h1>
              <p className="body-text">Log in to your Alaybee Sports account</p>
            </div>

            {/* Quick Demo Login Box */}
            <div className="demo-account-box p-3 mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold" style={{ color: "var(--text-main-dark)", fontSize: "14px" }}>
                  ⚡ Quick Demo Login
                </span>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                  1-Click Access
                </span>
              </div>
              <p className="text-muted small mb-2">
                Use pre-configured dummy accounts for rapid testing:
              </p>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    handleQuickLogin("athlete@alaybee.com", "password123")
                  }
                  className="btn btn-outline-primary btn-sm text-start py-2 d-flex justify-content-between align-items-center"
                >
                  <span>
                    🏃‍♂️ <strong>Pro Athlete Demo</strong>
                    <span className="d-block text-muted small" style={{ fontSize: "11px" }}>
                      athlete@alaybee.com
                    </span>
                  </span>
                  <span className="badge bg-primary text-white">Log in</span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    handleQuickLogin("member@alaybee.com", "password123")
                  }
                  className="btn btn-outline-secondary btn-sm text-start py-2 d-flex justify-content-between align-items-center"
                >
                  <span>
                    👤 <strong>Club Member Demo</strong>
                    <span className="d-block text-muted small" style={{ fontSize: "11px" }}>
                      member@alaybee.com
                    </span>
                  </span>
                  <span className="badge bg-secondary text-white">Log in</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 small" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                  Email address
                </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: "var(--text-main-dark)" }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 cta-button"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="text-center mt-4 pt-2 border-top">
              <p className="body-text mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="fw-semibold text-primary">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
