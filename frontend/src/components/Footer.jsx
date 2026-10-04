import { Link } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          <div className="footer-brand">

            <Link to="/" className="brand">
              <span className="brand-icon">
                W
              </span>

              <span>WorkZone</span>
            </Link>

            <p>
              A powerful freelancer toolkit designed
              to help you complete everyday work faster.
            </p>

            <div className="social-links">
              <a href="#" aria-label="Github">
                <Github size={18} />
              </a>

              <a href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>

              <a href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>

          </div>

          <div>
            <h4>Product</h4>

            <Link to="/tools">All Tools</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div>
            <h4>Company</h4>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div>
            <h4>Newsletter</h4>

            <p>
              Get updates about new WorkZone tools.
            </p>

            <div className="newsletter">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Your email"
              />

              <button>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} WorkZone.
            All rights reserved.
          </span>

          <span>
            Freelancer Super Toolkit
          </span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
