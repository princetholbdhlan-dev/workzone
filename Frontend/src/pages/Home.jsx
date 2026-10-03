import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

function Home() {
  const featuredTools = tools.slice(0, 8);

  return (
    <div>

      <section className="hero">
        <div className="container hero-content">

          <div className="hero-badge">
            <Sparkles size={16} />
            Freelancer Super Toolkit
          </div>

          <h1>
            Finish Your Freelance
            <span> Work in Minutes.</span>
          </h1>

          <p>
            WorkZone brings powerful PDF, image, writing,
            SEO, developer and freelancer tools into one
            simple workspace.
          </p>

          <div className="hero-actions">

            <Link
              to="/tools"
              className="btn btn-primary btn-large"
            >
              Explore Tools
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="btn btn-secondary btn-large"
            >
              Create Free Account
            </Link>

          </div>

          <div className="hero-points">

            <span>
              <CheckCircle2 size={17} />
              Free tools
            </span>

            <span>
              <CheckCircle2 size={17} />
              Fast workflow
            </span>

            <span>
              <CheckCircle2 size={17} />
              Freelancer focused
            </span>

          </div>

        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">

          <div className="stat-box">
            <Zap size={25} />
            <strong>14+</strong>
            <span>Useful Tools</span>
          </div>

          <div className="stat-box">
            <ShieldCheck size={25} />
            <strong>Secure</strong>
            <span>Account System</span>
          </div>

          <div className="stat-box">
            <Sparkles size={25} />
            <strong>Fast</strong>
            <span>Simple Workflow</span>
          </div>

          <div className="stat-box">
            <CheckCircle2 size={25} />
            <strong>Free</strong>
            <span>Starter Access</span>
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <SectionTitle
            badge="Popular Tools"
            title="Everything you need in one place"
            description="Use practical tools designed around common freelancer workflows."
          />

          <div className="tools-grid">

            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
              />
            ))}

          </div>

          <div className="center-button">

            <Link
              to="/tools"
              className="btn btn-secondary"
            >
              View All Tools
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

      <section className="cta-section">

        <div className="container cta-box">

          <div>
            <span className="section-badge">
              Start Today
            </span>

            <h2>
              Your freelance workflow,
              simplified.
            </h2>

            <p>
              Create your free WorkZone account
              and keep your productivity tools
              in one place.
            </p>
          </div>

          <Link
            to="/register"
            className="btn btn-primary btn-large"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;
