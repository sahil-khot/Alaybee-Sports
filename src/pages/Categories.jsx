import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar, FaTags } from "react-icons/fa";

function Categories({ products }) {
  const navigate = useNavigate();

  const categoryNames = [
    "Cricket",
    "Football",
    "Basketball",
    "Tennis",
    "Badminton",
    "Cycling",
    "Fitness",
    "Running",
    "Swimming",
    "Boxing",
  ];

  const categoryGroups = categoryNames.map((catName) => {
    const items = products.filter((item) => item.category === catName);
    return {
      name: catName,
      items: items,
      previewItems: items.slice(0, 3),
    };
  });

  const handleCategoryRedirect = (catName) => {
    navigate(`/product?category=${encodeURIComponent(catName)}`);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge text-bg-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1">
          <FaTags size={12} /> Browse By Sport
        </span>
        <h1 className="fw-bold mt-3 mb-2">Shop by Category</h1>
        <p className="text-muted col-md-6 mx-auto">
          Explore equipment by category. Click any category or item preview to view the complete catalog in that sport.
        </p>
      </div>

      <div className="row g-4">
        {categoryGroups.map((group) => (
          <div className="col-lg-6" key={group.name}>
            <div
              className="section-card p-4 h-100 hover-card category-clickable-card"
              onClick={() => handleCategoryRedirect(group.name)}
              title={`Click to explore all ${group.name} gear`}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{group.name}</h3>
                  <span className="text-muted small">
                    {group.items.length} items available
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center gap-1 px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryRedirect(group.name);
                  }}
                >
                  View All <FaArrowRight size={11} />
                </button>
              </div>

              {/* 3 items preview for each category */}
              <div className="row g-3">
                {group.previewItems.map((product) => (
                  <div
                    className="col-4"
                    key={product.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryRedirect(group.name);
                    }}
                  >
                    <div className="bg-light rounded-3 p-2 h-100 border text-center transition-all">
                      <div
                        className="rounded-2 overflow-hidden mb-2 bg-white"
                        style={{ height: "100px" }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80";
                          }}
                        />
                      </div>
                      <p
                        className="fw-semibold text-dark mb-1 text-truncate"
                        style={{ fontSize: "0.82rem" }}
                        title={product.name}
                      >
                        {product.name}
                      </p>
                      <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                        <FaStar className="text-warning" size={10} />
                        <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                          {product.rating}
                        </span>
                      </div>
                      <p className="text-primary fw-bold mb-0" style={{ fontSize: "0.85rem" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
