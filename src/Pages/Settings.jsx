
import React, { useEffect, useState } from "react";
import {
  FaCog,
  FaStore,
  FaEnvelope,
  FaPercentage,
  FaBell,
  FaShoppingBag,
  FaTools,
  FaSave,
  FaUndo,
} from "react-icons/fa";
import "./CSS/Settings.css";

const defaultSettings = {
  platformName: "TiffinWala",
  supportEmail: "support@tiffinwala.com",
  commission: 10,
  customerNotifications: true,
  homeChefNotifications: true,
  autoAcceptOrders: false,
  maintenanceMode: false,
};

function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("adminSettings");

    if (savedSettings) {
      try {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!settings.platformName.trim() || !settings.supportEmail.trim()) {
      setMessage("Please enter Platform Name and Support Email.");
      return;
    }

    if (
      Number(settings.commission) < 0 ||
      Number(settings.commission) > 100 ||
      settings.commission === ""
    ) {
      setMessage("Commission must be between 0 and 100.");
      return;
    }

    const updatedSettings = {
      ...settings,
      platformName: settings.platformName.trim(),
      supportEmail: settings.supportEmail.trim(),
      commission: Number(settings.commission),
    };

    localStorage.setItem("adminSettings", JSON.stringify(updatedSettings));
    setSettings(updatedSettings);
    setMessage("Settings saved successfully!");
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (!confirmReset) return;

    setSettings(defaultSettings);
    localStorage.setItem("adminSettings", JSON.stringify(defaultSettings));
    setMessage("Settings restored to default values.");
  };

  const settingSections = [
    {
      title: "Customer Notifications",
      description: "Allow notifications to be sent to customers.",
      name: "customerNotifications",
      icon: <FaBell />,
    },
    {
      title: "HomeChef Notifications",
      description: "Allow notifications to be sent to HomeChefs.",
      name: "homeChefNotifications",
      icon: <FaBell />,
    },
    {
      title: "Auto Accept Orders",
      description: "Enable automatic acceptance of incoming orders.",
      name: "autoAcceptOrders",
      icon: <FaShoppingBag />,
    },
    {
      title: "Maintenance Mode",
      description: "Enable maintenance mode for the platform.",
      name: "maintenanceMode",
      icon: <FaTools />,
    },
  ];

  return (
    <div className="admin-settings-page">
      <div className="settings-heading">
        <div>
          <h1>Platform Settings</h1>
          <p>Manage your TiffinWala platform preferences.</p>
        </div>
        <div className="settings-heading-icon">
          <FaCog />
        </div>
      </div>

      {message && (
        <div className="settings-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon"><FaStore /></div>
            <div>
              <h2>General Settings</h2>
              <p>Basic information about your platform.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label>Platform Name</label>
              <input
                type="text"
                name="platformName"
                value={settings.platformName}
                onChange={handleChange}
                placeholder="Enter platform name"
              />
            </div>

            <div className="settings-field">
              <label>Support Email</label>
              <div className="settings-input-icon">
                <FaEnvelope />
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  placeholder="Enter support email"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon"><FaPercentage /></div>
            <div>
              <h2>Commission Settings</h2>
              <p>Set the platform commission percentage.</p>
            </div>
          </div>

          <div className="settings-commission-box">
            <div className="settings-field">
              <label>Platform Commission (%)</label>
              <input
                type="number"
                name="commission"
                min="0"
                max="100"
                step="0.5"
                value={settings.commission}
                onChange={handleChange}
              />
              <small>Enter a value between 0% and 100%.</small>
            </div>

            <div className="commission-preview">
              <span>Current Commission</span>
              <strong>{settings.commission || 0}%</strong>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-card-icon"><FaBell /></div>
            <div>
              <h2>Platform Preferences</h2>
              <p>Control notifications and order preferences.</p>
            </div>
          </div>

          <div className="settings-options">
            {settingSections.map((item) => (
              <div className="settings-option" key={item.name}>
                <div className="settings-option-icon">{item.icon}</div>

                <div className="settings-option-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={settings[item.name]}
                    onChange={handleChange}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-action-buttons">
          <button
            type="button"
            className="settings-reset-btn"
            onClick={handleReset}
          >
            <FaUndo /> Reset Defaults
          </button>

          <button type="submit" className="settings-save-btn">
            <FaSave /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
