function Contact() {
  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        <div className="col-lg-5">
          <div className="section-card p-4 h-100">
            <span className="badge text-bg-primary rounded-pill px-3 py-2 mb-3">
              Contact us
            </span>
            <h1 className="fw-bold mb-4">Let’s talk sports gear</h1>

            <ul className="list-unstyled">
              <li className="mb-3">
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li className="mb-3">
                <strong>Email:</strong> support@alaybeesports.com
              </li>
              <li className="mb-3">
                <strong>Address:</strong> 18 Sports Avenue, Bengaluru, India
              </li>
              <li>
                <strong>Hours:</strong> Mon - Sat, 9:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="section-card p-4">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your message..."
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
