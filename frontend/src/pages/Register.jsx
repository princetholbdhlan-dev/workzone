import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(form);

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            <UserPlus size={24} />
          </div>

          <h1>Create your account</h1>

          <p>
            Start using WorkZone today.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              required
              minLength="8"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
              placeholder="Minimum 8 characters"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </section>
  );
}

export default Register;
