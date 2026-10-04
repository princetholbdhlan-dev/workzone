import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      await loginUser(form);

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.message ||
        "Login failed."
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
            <LogIn size={24} />
          </div>

          <h1>Welcome back</h1>

          <p>
            Login to your WorkZone account.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

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
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
              placeholder="••••••••"
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
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?
          {" "}
          <Link to="/register">
            Create account
          </Link>
        </div>

      </div>

    </section>
  );
}

export default Login;
