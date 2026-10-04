import {
  Zap,
  Target,
  ShieldCheck,
  Users
} from "lucide-react";

function About() {
  return (
    <section className="section page-section">

      <div className="container">

        <div className="page-header center">

          <span className="section-badge">
            About WorkZone
          </span>

          <h1>
            One workspace for
            freelancer productivity.
          </h1>

          <p>
            WorkZone is designed to bring commonly
            used freelancer utilities into one
            convenient platform.
          </p>

        </div>

        <div className="about-grid">

          <div className="about-card">
            <Zap size={28} />
            <h3>Fast</h3>
            <p>
              Complete repetitive tasks faster
              with dedicated utilities.
            </p>
          </div>

          <div className="about-card">
            <Target size={28} />
            <h3>Focused</h3>
            <p>
              Tools are organized around practical
              freelancer workflows.
            </p>
          </div>

          <div className="about-card">
            <ShieldCheck size={28} />
            <h3>Secure</h3>
            <p>
              WorkZone is built with authentication
              and account security in mind.
            </p>
          </div>

          <div className="about-card">
            <Users size={28} />
            <h3>Freelancer First</h3>
            <p>
              The platform is designed around
              everyday freelance work.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
