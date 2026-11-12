
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaUserShield, FaSave, FaEdit } from "react-icons/fa";
import "./CSS/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@example.com",
    phone: "",
    role: "Super Admin",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

    setProfile({
      name: savedUser.name || "Super Admin",
      email: savedUser.email || "admin@example.com",
      phone: savedUser.phone || "",
      role: savedUser.role || "Super Admin",
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!profile.name.trim() || !profile.email.trim()) {
      setMessage("Name and email are required.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

    const updatedUser = {
      ...savedUser,
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      role: profile.role,
    };

    localStorage.setItem("adminUser", JSON.stringify(updatedUser));

    setProfile(updatedUser);
    setIsEditing(false);
    setMessage("Profile updated successfully!");

    window.dispatchEvent(new Event("adminProfileUpdated"));
  };

  return (
    <div className="admin-profile-page">
      <div className="profile-page-heading">
        <div>
          <h1>Admin Profile</h1>
          <p>Manage your administrator account information.</p>
        </div>

        {!isEditing && (
          <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-left-card">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <span className="profile-status">Active Account</span>

          <div className="profile-account-info">
            <div>
              <FaUserShield />
              <span>Account Type</span>
              <strong>Super Admin</strong>
            </div>
            <div>
              <FaEnvelope />
              <span>Email Address</span>
              <strong>{profile.email}</strong>
            </div>
          </div>
        </div>

        <div className="profile-form-card">
          <h2>Personal Information</h2>
          <p>Update your personal account details below.</p>

          {message && (
            <div className="profile-message">{message}</div>
          )}

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <div className="profile-input-wrap">
                  <FaUserCircle />
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <div className="profile-input-wrap">
                  <FaEnvelope />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Mobile Number</label>
                <div className="profile-input-wrap">
                  <FaPhone />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Role</label>
                <div className="profile-input-wrap">
                  <FaUserShield />
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={() => {
                    const savedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
                    setProfile({
                      name: savedUser.name || "Super Admin",
                      email: savedUser.email || "admin@example.com",
                      phone: savedUser.phone || "",
                      role: savedUser.role || "Super Admin",
                    });
                    setIsEditing(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="profile-save-btn">
                  <FaSave /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
