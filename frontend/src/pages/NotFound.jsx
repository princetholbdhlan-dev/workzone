import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="not-found">

      <div>

        <span className="not-found-number">
          404
        </span>

        <h1>Page not found</h1>

        <p>
          The page you're looking for doesn't
          exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

      </div>

    </section>
  );
}

export default NotFound;
