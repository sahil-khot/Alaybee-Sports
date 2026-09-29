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
  FaBoxOpen,
} from "react-icons/fa";

function Navbar({ cartCount = 0, wishlistCount = 0, ordersCount = 0 }) {
  const { user, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-1.5 rounded-pill transition-all ${
      isActive ? "active text-white fw-semibold" : "text-white-80"
    }`;

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark shadow-sm sticky-top py-2">
      <div className="container-fluid px-lg-4">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 me-4 py-1">
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

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible Nav Links & Actions */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          {/* Main Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-xl-0 align-items-xl-center gap-1 gap-xl-2 py-2 py-xl-0">
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
              <NavLink to="/orders" className={linkClass}>
                <span className="d-flex align-items-center gap-1">
                  <FaBoxOpen size={13} className="opacity-75" />
                  <span>My Orders</span>
                  {ordersCount > 0 && (
                    <span
                      className="badge bg-secondary-subtle text-white rounded-pill ms-1"
                      style={{ fontSize: "10px", padding: "2px 6px" }}
                    >
                      {ordersCount}
                    </span>
                  )}
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Action Icons & Auth */}
          <div className="d-flex align-items-center gap-2 gap-xl-3 flex-wrap mt-2 mt-xl-0">
            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `nav-link px-3 py-1.5 rounded-pill d-flex align-items-center gap-1 transition-all ${
                  isActive ? "active text-white fw-semibold" : "text-white-80"
                }`
              }
            >
              <FaHeart
                className={wishlistCount > 0 ? "text-danger" : "text-white-50"}
                size={14}
              />
              <span className="d-none d-sm-inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="badge rounded-pill bg-light text-dark ms-1">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Cart Button */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `btn btn-sm d-flex align-items-center gap-2 rounded-pill px-3 py-1.5 ${
                  isActive
                    ? "btn-primary text-white shadow-sm"
                    : "btn-outline-light text-white"
                }`
              }
            >
              <FaShoppingCart size={14} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="badge text-bg-primary rounded-pill px-2">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2 ms-xl-1">
                <NavLink
                  to="/profile"
                  className="btn btn-sm btn-primary d-flex align-items-center gap-2 rounded-pill px-3 py-1.5"
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
                  className="btn btn-sm btn-outline-secondary text-white-50 d-flex align-items-center gap-1 rounded-pill px-2 py-1.5"
                  title="Log Out"
                >
                  <FaSignOutAlt size={12} />
                  <span className="d-none d-xxl-inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2 ms-xl-1">
                <NavLink
                  to="/login"
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-1.5"
                >
                  <FaSignInAlt size={12} /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-1.5"
                >
                  <FaUserPlus size={12} /> Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
