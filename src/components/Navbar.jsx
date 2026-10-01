import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleAuthNav = (e, path, message) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login", {
        state: { from: { pathname: path }, message },
      });
    }
  };

  const linkClass = ({ isActive }) =>
    `nav-link px-2 px-xxl-2.5 py-1 rounded-pill transition-all ${
      isActive ? "active text-white fw-semibold" : "text-white-80"
    }`;

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark shadow-sm sticky-top py-1 py-md-1.5">
      <div className="container-fluid px-lg-3 px-xxl-4">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 me-2 me-xxl-3 py-0">
          <img
            src="/logo.png"
            alt="Alaybee Sports"
            style={{
              height: "32px",
              width: "auto",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold text-primary lh-1" style={{ fontSize: "1.15rem", letterSpacing: "-0.2px" }}>
              Alaybee Sports
            </span>
            <span className="brand-subtitle" style={{ fontSize: "0.68rem", opacity: 0.7, marginTop: "2px" }}>
              Sports Sales Since 2018
            </span>
          </div>
        </NavLink>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ width: "22px", height: "22px" }} />
        </button>

        {/* Collapsible Nav Links & Actions */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          {/* Main Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-xl-0 align-items-xl-center gap-1 py-1 py-xl-0">
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
              <NavLink
                to="/product"
                onClick={(e) => handleAuthNav(e, "/product", "Please log in to browse the shop.")}
                className={linkClass}
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/categories"
                onClick={(e) => handleAuthNav(e, "/categories", "Please log in to browse categories.")}
                className={linkClass}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/deals"
                onClick={(e) => handleAuthNav(e, "/deals", "Please log in to view deals.")}
                className={linkClass}
              >
                Deals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/best-sellers"
                onClick={(e) => handleAuthNav(e, "/best-sellers", "Please log in to view best sellers.")}
                className={linkClass}
              >
                Best Sellers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/orders"
                onClick={(e) => handleAuthNav(e, "/orders", "Please log in to view your orders.")}
                className={linkClass}
              >
                <span className="d-flex align-items-center gap-1">
                  <FaBoxOpen size={12} className="opacity-75" />
                  <span>My Orders</span>
                  {ordersCount > 0 && (
                    <span
                      className="badge bg-secondary-subtle text-white rounded-pill ms-1"
                      style={{ fontSize: "10px", padding: "1px 5px" }}
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
          <div className="d-flex align-items-center gap-1.5 gap-xxl-2 flex-nowrap mt-2 mt-xl-0 ms-xl-auto">
            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              onClick={(e) => handleAuthNav(e, "/wishlist", "Please log in to view your wishlist.")}
              className={({ isActive }) =>
                `nav-link px-2 py-1 rounded-pill d-flex align-items-center gap-1 transition-all ${
                  isActive ? "active text-white fw-semibold" : "text-white-80"
                }`
              }
              title="View Wishlist"
            >
              <FaHeart
                className={wishlistCount > 0 ? "text-danger" : "text-white-50"}
                size={13}
              />
              <span className="d-none d-xxl-inline" style={{ fontSize: "0.85rem" }}>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="badge rounded-pill bg-light text-dark ms-0.5" style={{ fontSize: "10px", padding: "1px 5px" }}>
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Cart Button */}
            <NavLink
              to="/cart"
              onClick={(e) => handleAuthNav(e, "/cart", "Please log in to view your cart.")}
              className={({ isActive }) =>
                `btn btn-sm d-flex align-items-center gap-1.5 rounded-pill px-2.5 py-1 ${
                  isActive
                    ? "btn-primary text-white shadow-sm"
                    : "btn-outline-light text-white"
                }`
              }
              style={{ fontSize: "0.84rem", whiteSpace: "nowrap" }}
            >
              <FaShoppingCart size={13} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="badge text-bg-primary rounded-pill px-1.5 py-0.5" style={{ fontSize: "10px" }}>
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-1.5 flex-nowrap">
                <NavLink
                  to="/profile"
                  className="btn btn-sm btn-primary d-flex align-items-center gap-1.5 rounded-pill px-2.5 py-1 shadow-sm"
                  style={{ fontSize: "0.84rem", whiteSpace: "nowrap" }}
                  title="View My Profile"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.name || "Profile"}
                      className="rounded-circle border border-white"
                      style={{
                        width: "18px",
                        height: "18px",
                        objectFit: "cover",
                      }}
                    />
                  ) : user?.role === "athlete" ? (
                    <FaRunning size={13} />
                  ) : (
                    <FaUserCircle size={13} />
                  )}
                  <span>My Profile</span>
                </NavLink>
                <button
                  onClick={logout}
                  className="btn btn-link text-white-50 d-flex align-items-center gap-1 text-decoration-none border-0 p-1 px-1.5 logout-btn-clean"
                  style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}
                  title="Log Out"
                >
                  <FaSignOutAlt size={12} />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-1.5 flex-nowrap">
                <NavLink
                  to="/login"
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-2.5 py-1"
                  style={{ fontSize: "0.84rem", whiteSpace: "nowrap" }}
                >
                  <FaSignInAlt size={11} /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 rounded-pill px-2.5 py-1"
                  style={{ fontSize: "0.84rem", whiteSpace: "nowrap" }}
                >
                  <FaUserPlus size={11} /> Register
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
