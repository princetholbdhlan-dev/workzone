import { useEffect, useState } from "react";
import {
  User,
  Wrench,
  History,
  FolderKanban,
  LogOut
} from "lucide-react";

import { api, logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [userResult, historyResult, projectResult] =
          await Promise.all([
            api.get("/users/me"),
            api.get("/history"),
            api.get("/projects")
          ]);

        setUser(userResult.user);
        setHistory(historyResult.history || []);
        setProjects(projectResult.projects || []);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading) {
    return (
      <section className="section page-section">
        <div className="container">
          <div className="loading">
            Loading dashboard...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">

      <div className="container">

        <div className="dashboard-header">

          <div>
            <span className="section-badge">
              Dashboard
            </span>

            <h1>
              Welcome back
              {user?.name
                ? `, ${user.name}`
                : ""}
            </h1>

            <p>
              Manage your WorkZone activity
              from one place.
            </p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        <div className="dashboard-stats">

          <div className="dashboard-stat">
            <div>
              <span>Tools Used</span>
              <strong>{history.length}</strong>
            </div>

            <Wrench size={25} />
          </div>

          <div className="dashboard-stat">
            <div>
              <span>History</span>
              <strong>{history.length}</strong>
            </div>

            <History size={25} />
          </div>

          <div className="dashboard-stat">
            <div>
              <span>Projects</span>
              <strong>{projects.length}</strong>
            </div>

            <FolderKanban size={25} />
          </div>

          <div className="dashboard-stat">
            <div>
              <span>Account</span>
              <strong>Active</strong>
            </div>

            <User size={25} />
          </div>

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-panel">

            <div className="panel-header">
              <h2>Recent Activity</h2>
            </div>

            {history.length === 0 ? (
              <div className="empty-state">
                No tool activity yet.
              </div>
            ) : (
              <div className="activity-list">

                {history
                  .slice(0, 8)
                  .map((item) => (
                    <div
                      className="activity-item"
                      key={item.id}
                    >
                      <Wrench size={18} />

                      <div>
                        <strong>
                          {item.tool_name}
                        </strong>

                        <span>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}

              </div>
            )}

          </div>

          <div className="dashboard-panel">

            <div className="panel-header">
              <h2>Projects</h2>
            </div>

            {projects.length === 0 ? (
              <div className="empty-state">
                No projects yet.
              </div>
            ) : (
              <div className="activity-list">

                {projects
                  .slice(0, 6)
                  .map((project) => (
                    <div
                      className="activity-item"
                      key={project.id}
                    >
                      <FolderKanban size={18} />

                      <div>
                        <strong>
                          {project.name}
                        </strong>

                        <span>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;
