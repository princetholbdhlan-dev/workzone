const pool = require("../config/db");

async function getTools(req, res) {
  try {
    const result = await pool.query(
      `SELECT *
       FROM tools
       WHERE is_active = true
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      tools: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch tools"
    });
  }
}

async function getToolBySlug(req, res) {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM tools
       WHERE slug = $1
       AND is_active = true
       LIMIT 1`,
      [slug]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        success: false,
        message: "Tool not found"
      });
    }

    res.json({
      success: true,
      tool: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch tool"
    });
  }
}

module.exports = {
  getTools,
  getToolBySlug
};
