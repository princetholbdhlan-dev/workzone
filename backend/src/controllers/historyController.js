const pool = require("../config/db");

async function getHistory(req, res) {
  try {
    const result = await pool.query(
      `SELECT h.*, t.name AS tool_name, t.slug AS tool_slug
       FROM history h
       LEFT JOIN tools t ON t.id = h.tool_id
       WHERE h.user_id = $1
       ORDER BY h.created_at DESC
       LIMIT 100`,
      [req.user.id]
    );

    res.json({
      success: true,
      history: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch history"
    });
  }
}

async function addHistory(req, res) {
  try {
    const {
      toolId,
      action,
      inputData,
      outputData
    } = req.body;

    const result = await pool.query(
      `INSERT INTO history
       (user_id, tool_id, action, input_data, output_data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        req.user.id,
        toolId || null,
        action || "used",
        inputData || null,
        outputData || null
      ]
    );

    res.status(201).json({
      success: true,
      history: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to save history"
    });
  }
}

module.exports = {
  getHistory,
  addHistory
};
