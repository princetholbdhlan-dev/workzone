const pool = require("../config/db");

async function getFavorites(req, res) {
  try {
    const result = await pool.query(
      `SELECT f.id, f.created_at, t.*
       FROM favorites f
       JOIN tools t ON t.id = f.tool_id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      favorites: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch favorites"
    });
  }
}

async function addFavorite(req, res) {
  try {
    const { toolId } = req.body;

    if (!toolId) {
      return res.status(400).json({
        success: false,
        message: "Tool ID is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO favorites
       (user_id, tool_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, tool_id)
       DO NOTHING
       RETURNING *`,
      [req.user.id, toolId]
    );

    res.status(201).json({
      success: true,
      message: "Tool added to favorites",
      favorite: result.rows[0] || null
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to add favorite"
    });
  }
}

async function removeFavorite(req, res) {
  try {
    const { toolId } = req.params;

    await pool.query(
      `DELETE FROM favorites
       WHERE user_id = $1
       AND tool_id = $2`,
      [req.user.id, toolId]
    );

    res.json({
      success: true,
      message: "Tool removed from favorites"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to remove favorite"
    });
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
