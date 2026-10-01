import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "General Inquiry",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge text-bg-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1.5 mb-2">
          <FaHeadset size={12} /> Contact & Support
        </span>
        <h1 className="main-heading fw-bold mb-2">Let’s Talk Sports Gear</h1>
        <p className="body-text text-muted col-lg-6 mx-auto mb-0">
          Have a question about equipment specs, club bulk pricing, tournament gear, or shipping? Our team of sports specialists is here to assist you.
        </p>
      </div>

      <div className="row g-4 align-items-stretch">
        {/* Left Column: Support Hub & Contact Details */}
        <div className="col-lg-5 d-flex">
          <div className="section-card p-4 p-md-5 h-100 w-100 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1.5 fw-semibold mb-3">
                Customer Care & Hub
              </span>
              <h3 className="fw-bold mb-3 text-dark">Get In Touch</h3>
              <p className="text-muted small mb-4">
                Reach out directly via phone, email, or visit our Bengaluru distribution facility.
              </p>

              {/* Contact item boxes */}
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: "38px", height: "38px" }}>
                    <FaPhoneAlt size={14} />
                  </div>
                  <div>
                    <span className="small text-muted d-block fw-semibold">Phone Support</span>
                    <a href="tel:+919876543210" className="fw-bold text-dark text-decoration-none">
                      +91 98765 43210
                    </a>
                    <span className="d-block text-muted" style={{ fontSize: "11px" }}>Toll-Free • Instant Response</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: "38px", height: "38px" }}>
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <span className="small text-muted d-block fw-semibold">Email Assistance</span>
                    <a href="mailto:support@alaybeesports.com" className="fw-bold text-dark text-decoration-none">
                      support@alaybeesports.com
                    </a>
                    <span className="d-block text-muted" style={{ fontSize: "11px" }}>Average response time: &lt; 2 hours</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: "38px", height: "38px" }}>
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <span className="small text-muted d-block fw-semibold">Sports Headquarters</span>
                    <span className="fw-bold text-dark d-block">18 Sports Avenue, HSR Layout</span>
                    <span className="d-block text-muted" style={{ fontSize: "11px" }}>Bengaluru, Karnataka - 560102, India</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: "38px", height: "38px" }}>
                    <FaClock size={14} />
                  </div>
                  <div>
                    <span className="small text-muted d-block fw-semibold">Operating Hours</span>
                    <span className="fw-bold text-dark d-block">Monday &ndash; Saturday</span>
                    <span className="d-block text-muted" style={{ fontSize: "11px" }}>9:00 AM &ndash; 8:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Assurance footer banner */}
            <div className="p-3 rounded-3 bg-primary-subtle text-primary-emphasis border border-primary-subtle d-flex align-items-center gap-2.5 mt-auto">
              <FaShieldAlt size={22} className="text-primary flex-shrink-0" />
              <div className="small">
                <strong className="d-block">Direct Factory Authentic Gear</strong>
                <span>100% genuine equipment guaranteed since 2018.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Message Form */}
        <div className="col-lg-7 d-flex">
          <div className="section-card p-4 p-md-5 h-100 w-100 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold text-dark mb-0">Send Us a Message</h3>
                <span className="badge bg-light text-muted border small">Quick Reply</span>
              </div>
              <p className="text-muted small mb-4">
                Fill out the form below and an Alaybee sports specialist will reach out to you promptly.
              </p>

              {submitted && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4 rounded-3 border-0 shadow-sm" style={{ backgroundColor: "#dcfce7", color: "#15803d" }}>
                  <FaCheckCircle className="flex-shrink-0" size={16} />
                  <div>
                    <strong>Message sent successfully!</strong> Thank you for reaching out. We will get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Inquiry Category</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="General Inquiry">General Sports Inquiry</option>
                      <option value="Order Tracking">Order Status & Tracking</option>
                      <option value="Bulk Club Order">Bulk Club / School Team Order</option>
                      <option value="Equipment Advice">Equipment Recommendation</option>
                      <option value="Return / Replacement">Return or Replacement</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Cricket kit bat sizing"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark">Your Message *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Provide details about what you need assistance with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn btn-primary btn-lg w-100 py-3 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold rounded-pill shadow-sm"
                    >
                      <FaPaperPlane size={14} />
                      {sending ? "Sending Message..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="text-center text-muted small mt-4 pt-3 border-top">
              <span>🔒 Your privacy is protected. We will never share your contact information.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
