import { Link } from "react-router-dom";
import {
  Image,
  FileText,
  PenLine,
  Code,
  Database,
  Search,
  Briefcase,
  Sparkles,
  ArrowRight
} from "lucide-react";

import { categories } from "../data/tools";

const icons = {
  Image,
  PDF: FileText,
  Writing: PenLine,
  Developer: Code,
  Data: Database,
  SEO: Search,
  Freelancer: Briefcase,
  AI: Sparkles
};

function Categories() {
  return (
    <section className="section page-section">

      <div className="container">

        <div className="page-header">
          <span className="section-badge">
            Categories
          </span>

          <h1>Explore WorkZone categories</h1>

          <p>
            Find the right tools for your specific
            freelance workflow.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((category) => {

            const Icon =
              icons[category.name] || Sparkles;

            return (
              <Link
                to={`/tools?category=${category.name}`}
                className="category-card"
                key={category.name}
              >

                <div className="category-icon">
                  <Icon size={25} />
                </div>

                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <span>
                  Explore
                  <ArrowRight size={17} />
                </span>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;
