const posts = [
  {
    title: "How to Choose the Right Football for Match Day",
    text: "Ball size, grip, and surface type matter more than most players realize. Learn what to look for before buying.",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "5 Essentials for a Better Home Workout Setup",
    text: "A few smart accessories can turn your room into an effective and motivating fitness space.",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cycling Gear That Actually Improves Performance",
    text: "Comfort, safety, and fit all play a role in making your rides smoother and more efficient.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  },
];

function Blog() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge text-bg-primary rounded-pill px-3 py-2">
          Sports Journal
        </span>
        <h1 className="fw-bold mt-3">Tips, guides & inspiration</h1>
      </div>

      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-lg-4" key={post.title}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h4 className="fw-bold">{post.title}</h4>
                <p className="text-muted">{post.text}</p>
                <button className="btn btn-outline-dark">Read more</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
