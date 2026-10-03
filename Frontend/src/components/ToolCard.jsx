import {
  Image,
  Maximize,
  RefreshCw,
  Files,
  Scissors,
  Archive,
  Type,
  CaseUpper,
  Braces,
  Table,
  Search,
  Receipt,
  WandSparkles,
  Code,
  ArrowRight,
  Lock
} from "lucide-react";

import { Link } from "react-router-dom";

const icons = {
  Image,
  Maximize,
  RefreshCw,
  Files,
  Scissors,
  Archive,
  Type,
  CaseUpper,
  Braces,
  Table,
  Search,
  Receipt,
  WandSparkles,
  Code
};

function ToolCard({ tool }) {
  const Icon = icons[tool.icon] || WrenchFallback;

  return (
    <div className="tool-card">

      <div className="tool-card-top">

        <div className="tool-icon">
          <Icon size={23} />
        </div>

        {tool.pro && (
          <span className="pro-badge">
            PRO
          </span>
        )}

      </div>

      <h3>{tool.name}</h3>

      <p>{tool.description}</p>

      <div className="tool-card-bottom">

        <span className="tool-category">
          {tool.category}
        </span>

        <Link
          to={`/tools/${tool.slug}`}
          className="tool-arrow"
        >
          {tool.pro && <Lock size={14} />}
          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
}

function WrenchFallback() {
  return <span>⚙</span>;
}

export default ToolCard;
