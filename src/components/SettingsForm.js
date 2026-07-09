"use client";

import { useState } from "react";

const initialSettings = {
  displayName: "",
  email: "",
  emailNotifications: true,
  theme: "system",
  currency: "USD",
};

export default function SettingsForm() {
  const [settings, setSettings] = useState(initialSettings);
  const [savedMessage, setSavedMessage] = useState("");

  function handleChange(event) {
    const { name, type, checked, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSavedMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedMessage("Settings saved successfully.");
  }

  return (
    <section className="settings-card">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Update your profile and app preferences.</p>
      </header>

      <form className="settings-form" onSubmit={handleSubmit}>
        <fieldset className="settings-group">
          <legend>Profile</legend>

          <label className="field">
            <span>Display name</span>
            <input
              type="text"
              name="displayName"
              value={settings.displayName}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
        </fieldset>

        <fieldset className="settings-group">
          <legend>Preferences</legend>

          <label className="field field-checkbox">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <span>Send me email notifications</span>
          </label>

          <label className="field">
            <span>Theme</span>
            <select name="theme" value={settings.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </label>

          <label className="field">
            <span>Default currency</span>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </label>
        </fieldset>

        <div className="settings-actions">
          <button type="submit" className="button-primary">
            Save settings
          </button>
          {savedMessage ? (
            <p className="settings-message" role="status">
              {savedMessage}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
