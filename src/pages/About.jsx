function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img
          src="/logo.png"
          alt="Alaybee Sports"
          className="mx-auto mb-3"
          style={{ height: "64px", width: "auto", objectFit: "contain" }}
        />
        <div>
          <span className="badge text-bg-primary px-3 py-2 rounded-pill mb-3">
            About Alaybee Sports
          </span>
        </div>
        <h1 className="fw-bold display-6">
          Built for performance, trusted for quality
        </h1>
      </div>

      <div className="row align-items-center g-4 mb-5">
        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80"
            alt="Alaybee Sports store"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <p className="fs-5 text-muted">
            <strong className="text-dark">Alaybee Sports</strong> is an online
            sports equipment destination built to help athletes, teams, and
            fitness lovers buy reliable gear with confidence.
          </p>
          <ul className="list-group list-group-flush border rounded-4 overflow-hidden">
            <li className="list-group-item">
              Sports equipment manufacturer since 1988
            </li>
            <li className="list-group-item">
              Premium quality goods for every sport
            </li>
            <li className="list-group-item">
              Direct manufacturer pricing without middlemen
            </li>
            <li className="list-group-item">
              100% genuine products with trusted support
            </li>
            <li className="list-group-item">
              Easy ordering, secure payments, quick shipping
            </li>
          </ul>
        </div>
      </div>

      <div className="accordion" id="aboutAccordion">
        <div className="accordion-item border-0 shadow-sm mb-3 rounded-4 overflow-hidden">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#historyCollapse"
              aria-expanded="true"
              aria-controls="historyCollapse"
            >
              Our History
            </button>
          </h2>
          <div
            id="historyCollapse"
            className="accordion-collapse collapse show"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              Since 1988, Alaybee has grown from a small sports manufacturing
              business into a recognized name for quality equipment, export
              standards, and dependable customer care.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 shadow-sm mb-3 rounded-4 overflow-hidden">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#missionCollapse"
              aria-expanded="false"
              aria-controls="missionCollapse"
            >
              Our Mission
            </button>
          </h2>
          <div
            id="missionCollapse"
            className="accordion-collapse collapse"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              We aim to make authentic, performance-driven sports gear
              accessible to everyone, from beginners to professionals, while
              delivering a smooth, honest shopping experience.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 shadow-sm rounded-4 overflow-hidden">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#whyCollapse"
              aria-expanded="false"
              aria-controls="whyCollapse"
            >
              Why Choose Us
            </button>
          </h2>
          <div
            id="whyCollapse"
            className="accordion-collapse collapse"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              We combine quality craftsmanship, affordable pricing, secure
              transactions, fast delivery, and long-term customer support—
              everything needed for a trustworthy sports shopping experience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
