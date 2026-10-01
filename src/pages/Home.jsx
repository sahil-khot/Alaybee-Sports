import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaCheckCircle,
  FaFire,
} from "react-icons/fa";

function Home({ products, onAddToCart, onToggleWishlist, wishlist }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    {
      name: "Cricket",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Football",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Basketball",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Tennis",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Badminton",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Cycling",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Fitness",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Running",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Swimming",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
    {
      name: "Boxing",
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=400&q=80",
      itemsCount: "16 Items",
    },
  ];

  // Pick 4 top featured products across popular sports
  const featuredProducts = products.filter(
    (p) => [1, 11, 31, 51].includes(p.id) || p.rating >= 4.9
  ).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Shop By Categories Section */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <span className="badge bg-primary-subtle text-primary fw-semibold rounded-pill px-3 py-1 mb-1">
              Explore by Sport
            </span>
            <h2 className="fw-bold mb-0">Shop By Categories</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", {
                  state: {
                    from: { pathname: "/categories" },
                    message: "Please log in to explore all categories.",
                  },
                });
              } else {
                navigate("/categories");
              }
            }}
            className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
          >
            View all categories <FaArrowRight size={12} />
          </button>
        </div>

        <div className="row g-3">
          {categories.map((cat) => (
            <div className="col-6 col-md-4 col-lg" key={cat.name}>
              <div
                role="button"
                onClick={() => {
                  const targetPath = `/product?category=${encodeURIComponent(cat.name)}`;
                  if (!isAuthenticated) {
                    navigate("/login", {
                      state: {
                        from: { pathname: targetPath },
                        message: "Please log in to browse this category.",
                      },
                    });
                  } else {
                    navigate(targetPath);
                  }
                }}
                className="card h-100 border-0 shadow-sm hover-card rounded-4 overflow-hidden text-center text-decoration-none category-clickable-card"
                style={{ cursor: "pointer" }}
                title={`Shop ${cat.name} gear`}
              >
                <div style={{ height: "130px", overflow: "hidden" }}>
                  <img
                    src={cat.image}
                    className="w-100 h-100"
                    alt={cat.name}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="card-body py-2 px-1">
                  <p className="card-text fw-bold text-dark mb-0 fs-6">
                    {cat.name}
                  </p>
                  <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {cat.itemsCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-light py-5 border-top border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <span className="badge bg-danger-subtle text-danger fw-semibold rounded-pill px-3 py-1 mb-1 d-inline-flex align-items-center gap-1">
                <FaFire size={12} /> Handpicked Essentials
              </span>
              <h2 className="fw-bold mb-0">Featured Products</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login", {
                    state: {
                      from: { pathname: "/product" },
                      message: "Please log in to browse all items.",
                    },
                  });
                } else {
                  navigate("/product");
                }
              }}
              className="btn btn-outline-dark btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
            >
              Browse all items <FaArrowRight size={12} />
            </button>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-sm-6 col-lg-3" key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isSaved={wishlist.some((item) => item.id === product.id)}
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <span className="badge bg-primary-subtle text-primary fw-semibold rounded-pill px-3 py-1 mb-2">
              The Alaybee Advantage
            </span>
            <h2 className="fw-bold mb-3">Why athletes choose Alaybee Sports</h2>
            <p className="text-muted mb-4">
              Since 2018, we have been outfitting grassroots cricket clubs, school
              teams, state athletes, and weekend fitness enthusiasts with
              uncompromising gear.
            </p>

            <div className="row g-3">
              {[
                {
                  icon: <FaShieldAlt className="text-primary" size={22} />,
                  title: "Authentic Gear",
                  text: "100% genuine equipment sourced directly from certified factories.",
                },
                {
                  icon: <FaTruck className="text-primary" size={22} />,
                  title: "Fast Delivery",
                  text: "Quick shipping to 500+ cities across India with damage-safe packaging.",
                },
                {
                  icon: <FaTag className="text-primary" size={22} />,
                  title: "Direct Pricing",
                  text: "Manufacturer direct prices without high retail distributor markups.",
                },
                {
                  icon: <FaCheckCircle className="text-primary" size={22} />,
                  title: "Verified Reviews",
                  text: "Real reviews and ratings from actual club players and athletes.",
                },
              ].map((item) => (
                <div className="col-md-6" key={item.title}>
                  <div className="bg-white border rounded-4 p-3 h-100 shadow-sm">
                    <div className="mb-2">{item.icon}</div>
                    <h6 className="fw-bold text-dark">{item.title}</h6>
                    <p className="text-muted small mb-0">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80"
                alt="Sports training"
                className="w-100"
                style={{ height: "420px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dark Call-to-Action Section with Crisp White Text */}
      <section
        className="bg-dark text-white py-5"
        style={{
          backgroundColor: "#0d1b2a",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container text-center py-4">
          <img
            src="/logo.png"
            alt="Alaybee Sports"
            className="mx-auto mb-3"
            style={{
              height: "64px",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))",
            }}
          />
          <h2
            className="fw-bold mb-3 text-white"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              fontSize: "2rem",
            }}
          >
            Ready to play harder?
          </h2>
          <p
            className="mb-4 text-white col-md-8 mx-auto"
            style={{
              color: "#f1f5f9",
              fontSize: "1.05rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Explore the latest gear for every game and every level of sport.
            Direct from manufacturer prices with nationwide delivery.
          </p>
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", {
                  state: {
                    from: { pathname: "/product" },
                    message: "Please log in to shop the collection.",
                  },
                });
              } else {
                navigate("/product");
              }
            }}
            className="btn btn-primary btn-lg px-4 shadow rounded-pill d-inline-flex align-items-center gap-2"
          >
            Shop Collection <FaArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Detail Modal if clicked from Home */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isSaved={wishlist.some((item) => item.id === selectedProduct.id)}
        />
      )}
    </>
  );
}

export default Home;
