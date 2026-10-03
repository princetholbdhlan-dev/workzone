import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import ToolCard from "../components/ToolCard";
import { tools } from "../data/tools";

function Tools() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(tools.map((tool) => tool.category))
  ];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {

      const matchesSearch =
        tool.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        tool.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        tool.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="section page-section">

      <div className="container">

        <div className="page-header">
          <span className="section-badge">
            WorkZone Tools
          </span>

          <h1>Tools for your everyday work</h1>

          <p>
            Search and explore the WorkZone freelancer
            toolkit.
          </p>
        </div>

        <div className="tools-controls">

          <div className="search-box">
            <Search size={19} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tools..."
            />
          </div>

          <div className="category-filter">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "filter-active"
                    : ""
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        <div className="tools-grid">

          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
            />
          ))}

        </div>

        {filteredTools.length === 0 && (
          <div className="empty-state">
            No tools found.
          </div>
        )}

      </div>

    </section>
  );
}

export default Tools;
