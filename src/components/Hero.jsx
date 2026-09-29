import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero-banner">
      {/* Dark overlay makes the white text ultra-readable over the cycling photo */}
      <div className="hero-overlay d-flex align-items-center">
        <div className="container text-center text-white py-5">
          <img
            src="/logo.png"
            alt="Alaybee Sports"
            className="mx-auto mb-3"
            style={{
              height: "76px",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))",
            }}
          />
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-25 mb-3 text-white">
            <FaShieldAlt className="text-warning" size={13} />
            <span style={{ fontSize: "0.85rem", color: "#ffffff", fontWeight: 500 }}>
              Direct Manufacturer Quality Since 1988
            </span>
          </div>

          <h1
            className="display-4 fw-bold mb-2 text-white"
            style={{
              color: "#ffffff",
              textShadow: "0 3px 12px rgba(0,0,0,0.8)",
              letterSpacing: "-0.02em",
            }}
          >
            Alaybee Sports
          </h1>
          <p
            className="fs-4 mb-3 text-white fw-semibold"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Sports Sales Since 1988
          </p>
          <p
            className="col-lg-8 mx-auto mb-4 text-white"
            style={{
              color: "#f8fafc",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Your one-stop online sports shop for authentic, high-quality
            sports equipment &mdash; delivered directly from the manufacturer
            at the best prices across India.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/product" className="btn btn-primary btn-lg px-4 shadow">
              Shop Now <FaArrowRight size={14} />
            </Link>
            <Link
              to="/categories"
              className="btn btn-outline-light btn-lg px-4"
              style={{ borderRadius: "0.75rem" }}
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
