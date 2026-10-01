import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaCamera, FaTrashAlt, FaCheck, FaRunning, FaUserCircle, FaUpload } from "react-icons/fa";
import api from "../services/api";

const SPORTS_AVATARS = [
  { name: "Cricket Pro", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
  { name: "Footballer", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
  { name: "Runner", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
  { name: "Basketball Ace", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" },
  { name: "Fitness Coach", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  { name: "Tennis Star", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
];

function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    avatar: user?.avatar || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [athletePerks, setAthletePerks] = useState([]);
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        avatar: user.avatar || "",
      });

      // Test authorized backend endpoint
      api
        .getAthletePerks()
        .then((res) => {
          if (res.success && res.perks) {
            setAthletePerks(res.perks);
            setAuthStatus({
              authorized: true,
              message: "Pro Athlete Role Authorized",
            });
          }
        })
        .catch((err) => {
          setAuthStatus({
            authorized: false,
            message: err.message || "Standard Member Role",
          });
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 320;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.88);

        applyNewAvatar(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const applyNewAvatar = async (avatarUrl) => {
    setSaving(true);
    setMessage("");
    try {
      await updateProfile({
        ...formData,
        avatar: avatarUrl,
      });
      setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
      setMessage("Profile picture updated successfully!");
      setShowAvatarPicker(false);
    } catch (err) {
      setMessage(err.message || "Failed to update profile picture.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateProfile({
        ...formData,
        avatar: "",
      });
      setFormData((prev) => ({ ...prev, avatar: "" }));
      setMessage("Profile picture removed.");
      setShowAvatarPicker(false);
    } catch (err) {
      setMessage(err.message || "Failed to remove profile picture.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <span className="badge text-bg-primary rounded-pill px-3 py-2 mb-2">
            My Account
          </span>
          <h1 className="main-heading mb-1">User Profile & Access</h1>
          <p className="body-text mb-0">
            Manage your credentials, profile picture, and sports member privileges.
          </p>
        </div>

        <button
          onClick={logout}
          className="btn btn-outline-danger align-self-start align-self-md-center px-4"
        >
          Sign Out
        </button>
      </div>

      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
            aria-label="Close"
          />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="d-none"
      />

      <div className="row g-4">
        {/* Left Column: Profile Card */}
        <div className="col-lg-5">
          <div className="section-card p-4">
            <div className="text-center pb-3 border-bottom mb-3">
              {/* Profile Avatar with Camera Trigger */}
              <div
                className="profile-avatar-container mb-3"
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload or change profile picture"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User Avatar"}
                    className="rounded-circle shadow-sm border border-3 border-primary-subtle"
                    style={{
                      width: "88px",
                      height: "88px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{
                      width: "88px",
                      height: "88px",
                      fontSize: "32px",
                      backgroundColor:
                        user?.role === "athlete" ? "#0d6efd" : "#0d1b2a",
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <div className="avatar-overlay">
                  <FaCamera size={18} className="mb-1" />
                  <span>Change</span>
                </div>
              </div>

              {/* Profile Picture Action Buttons */}
              <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={saving}
                  className="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center gap-1.5 px-3 py-1"
                >
                  <FaUpload size={11} /> Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1"
                >
                  Sports Avatars
                </button>
                {user?.avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={saving}
                    className="btn btn-outline-danger btn-sm rounded-pill p-1 px-2"
                    title="Remove profile picture"
                  >
                    <FaTrashAlt size={11} />
                  </button>
                )}
              </div>

              {/* Sports Avatars Preset Drawer */}
              {showAvatarPicker && (
                <div className="p-3 bg-light rounded-3 border mb-3 text-start">
                  <span className="small fw-semibold text-muted d-block mb-2">
                    Pick a Sports Avatar:
                  </span>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {SPORTS_AVATARS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyNewAvatar(preset.url)}
                        className={`avatar-preset-btn ${user?.avatar === preset.url ? "active" : ""}`}
                        title={preset.name}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <h2 className="card-heading mb-1" style={{ fontSize: "20px" }}>
                {user?.name}
              </h2>
              <p className="body-text mb-2 text-muted">{user?.email}</p>

              <div>
                <span
                  className={`badge rounded-pill px-3 py-2 ${
                    user?.role === "athlete"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {user?.role === "athlete"
                    ? "🏃 Pro Athlete"
                    : "👤 Club Member"}
                </span>
              </div>
            </div>

            {!editMode ? (
              <div>
                <div className="mb-3">
                  <span className="text-muted d-block small">Email Address</span>
                  <span className="fw-semibold text-dark">{user?.email}</span>
                </div>
                <div className="mb-3">
                  <span className="text-muted d-block small">Contact Phone</span>
                  <span className="fw-semibold text-dark">
                    {user?.phone || "Not specified"}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-muted d-block small">City / Location</span>
                  <span className="fw-semibold text-dark">
                    {user?.city || "Not specified"}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-muted d-block small">Role Status</span>
                  <span className="fw-semibold text-capitalize text-dark">
                    {user?.role} (Authenticated)
                  </span>
                </div>

                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-outline-primary w-100"
                >
                  Edit Profile Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary flex-grow-1"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Authorization & Role Perks */}
        <div className="col-lg-7">
          <div className="summary-box p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h3 className="card-heading mb-1">
                  Authorization & Access Privileges
                </h3>
                <p className="body-text text-muted mb-0 small">
                  Verified by backend JSON Web Token (JWT) and role middleware.
                </p>
              </div>
              <span
                className={`badge ${
                  user?.role === "athlete" ? "bg-success" : "bg-info"
                }`}
              >
                JWT Active
              </span>
            </div>

            {user?.role === "athlete" ? (
              <div className="p-3 bg-primary-subtle border border-primary-subtle rounded-3 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <span className="fs-5 me-2">🏆</span>
                  <strong className="text-primary">
                    Pro Athlete Lounge (Authorized Endpoint)
                  </strong>
                </div>
                <p className="small mb-2 text-dark">
                  Your token has verified role: <code>athlete</code>. You have exclusive
                  access to pro-level gear discounts and custom manufacturing:
                </p>
                <ul className="mb-0 small ps-3">
                  {athletePerks.map((perk, idx) => (
                    <li key={idx} className="mb-1 text-dark">
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-3 bg-light border rounded-3 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <span className="fs-5 me-2">👤</span>
                  <strong className="text-dark">Club Member Status</strong>
                </div>
                <p className="small mb-2 text-muted">
                  You are logged in as a registered Sports Club Member.
                </p>
                <ul className="mb-0 small text-muted ps-3">
                  <li>Access to standard kits and store discounts.</li>
                  <li>Fast checkout with saved shipping info.</li>
                  <li>Order tracking & purchase history.</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border small text-muted">
                  💡 <em>Want Pro Athlete perks? Test logging in with the <strong>Pro Athlete Demo</strong> account on the Login page!</em>
                </div>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
              <Link to="/orders" className="btn btn-primary cta-button">
                My Orders
              </Link>
              <Link to="/product" className="btn btn-outline-primary">
                Browse Shop
              </Link>
              <Link to="/cart" className="btn btn-outline-secondary">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
