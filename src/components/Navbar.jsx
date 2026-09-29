import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaShoppingCart,
  FaHeart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaRunning,
} from "react-icons/fa";

function Navbar({ cartCount, wishlistCount }) {
  const { user, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link active fw-semibold text-white"
      : "nav-link text-white-50";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 me-4">
          <img
            src="/logo.png"
            alt="Alaybee Sports"
            style={{
              height: "44px",
              width: "auto",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
          <div className="d-flex flex-column">
            <span className="fs-4 fw-bold text-primary lh-1">Alaybee Sports</span>
            <span className="brand-subtitle mt-1">Sports Sales Since 2018</span>
          </div>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className={linkClass}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={linkClass}>
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/deals" className={linkClass}>
                Deals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/best-sellers" className={linkClass}>
                Best Sellers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>

            {/* Wishlist Link with Heart Icon */}
            <li className="nav-item">
              <NavLink
                to="/wishlist"
                className={`${linkClass} d-flex align-items-center gap-1`}
              >
                <FaHeart
                  className={wishlistCount > 0 ? "text-danger" : "text-white-50"}
                  size={14}
                />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill bg-light text-dark ms-1">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Cart Button with Cart Icon */}
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="btn btn-outline-light btn-sm ms-lg-2 d-flex align-items-center gap-2"
              >
                <FaShoppingCart size={14} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="badge text-bg-primary rounded-pill px-2">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Auth section */}
            {isAuthenticated ? (
              <li className="nav-item dropdown ms-lg-2">
                <div className="d-flex align-items-center gap-2">
                  <NavLink
                    to="/profile"
                    className="btn btn-sm btn-primary d-flex align-items-center gap-2"
                    title="View My Profile"
                  >
                    {user?.role === "athlete" ? (
                      <FaRunning size={14} />
                    ) : (
                      <FaUserCircle size={14} />
                    )}
                    <span>{user?.name?.split(" ")[0] || "Account"}</span>
                  </NavLink>
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-secondary text-white-50 d-flex align-items-center gap-1"
                    title="Log Out"
                  >
                    <FaSignOutAlt size={12} />
                    <span className="d-none d-lg-inline">Logout</span>
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item ms-lg-2 d-flex gap-2">
                <NavLink
                  to="/login"
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                >
                  <FaSignInAlt size={12} /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                >
                  <FaUserPlus size={12} /> Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
