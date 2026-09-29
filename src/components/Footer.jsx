import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/logo.png"
                alt="Alaybee Sports"
                style={{
                  height: "40px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
              />
              <h5 className="fw-bold text-white mb-0">Alaybee Sports</h5>
            </div>
            <p className="text-light mb-2">Sports Sales Since 1988</p>
            <p className="text-secondary mb-0">
              Premium sports equipment and accessories for athletes, schools,
              clubs, and active families.
            </p>
          </div>

          <div className="col-md-4 col-lg-2">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/product" className="footer-link">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="text-white mb-3">Categories</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/categories" className="footer-link">
                  Football
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="footer-link">
                  Cricket
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="footer-link">
                  Fitness
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="footer-link">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="text-white mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/track-order" className="footer-link">
                  Track Order
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/deals" className="footer-link">
                  Offers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="footer-link">
                  News
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 text-center text-secondary small">
          &copy; 2026 Alaybee Sports. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
