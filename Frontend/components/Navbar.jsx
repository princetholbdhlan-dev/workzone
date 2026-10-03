import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  Wrench
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("workzone_theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !dark;

    setDark(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme
    );

    localStorage.setItem(
      "workzone_theme",
      newTheme ? "dark" : "light"
    );
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-icon">
            <Wrench size={20} />
          </span>

          <span>WorkZone</span>
        </Link>

        <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/tools" onClick={closeMenu}>
            Tools
          </NavLink>

          <NavLink to="/categories" onClick={closeMenu}>
            Categories
          </NavLink>

          <NavLink to="/pricing" onClick={closeMenu}>
            Pricing
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="nav-actions">

          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {dark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn btn-primary nav-signup"
          >
            Get Started
          </Link>

          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
