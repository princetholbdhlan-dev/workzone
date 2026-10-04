const pool = require("../config/db");

async function sendMessage(req, res) {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const result = await pool.query(
      `INSERT INTO contact_messages
       (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [
        name.trim(),
        email.trim().toLowerCase(),
        subject?.trim() || null,
        message.trim()
      ]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to send message"
    });
  }
}

module.exports = {
  sendMessage
};
