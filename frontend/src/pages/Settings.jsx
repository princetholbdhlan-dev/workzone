import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { api } from "../services/api";

function Settings() {
  const [form, setForm] = useState({
    name: "",
    avatar_url: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await api.get("/users/me");

        setForm({
          name: result.user.name || "",
          avatar_url: result.user.avatar_url || ""
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/me", form);

      setMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      setMessage(
        error.message ||
        "Unable to update profile."
      );
    }
  };

  return (
    <section className="section page-section">

      <div className="container settings-container">

        <div className="page-header">
          <span className="section-badge">
            Settings
          </span>

          <h1>Account Settings</h1>

          <p>
            Manage your WorkZone profile.
          </p>
        </div>

        <form
          className="settings-card"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Name</label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Avatar URL</label>

            <input
              value={form.avatar_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  avatar_url: e.target.value
                })
              }
              placeholder="https://..."
            />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
          >
            <Save size={18} />
            Save Changes
          </button>

          {message && (
            <div className="form-status">
              {message}
            </div>
          )}

        </form>

      </div>

    </section>
  );
}

export default Settings;
