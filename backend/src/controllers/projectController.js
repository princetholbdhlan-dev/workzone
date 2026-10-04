const pool = require("../config/db");

async function getProjects(req, res) {
  try {
    const result = await pool.query(
      `SELECT *
       FROM projects
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      projects: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch projects"
    });
  }
}

async function createProject(req, res) {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO projects
       (user_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        req.user.id,
        name.trim(),
        description?.trim() || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Project created",
      project: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create project"
    });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM projects
       WHERE id = $1
       AND user_id = $2
       RETURNING id`,
      [id, req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      message: "Project deleted"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete project"
    });
  }
}

module.exports = {
  getProjects,
  createProject,
  deleteProject
};
