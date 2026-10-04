const pool = require("../config/db");

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(
    "SELECT id, name, email, avatar, plan, created_at FROM users WHERE id = $1 LIMIT 1",
    [id]
  );

  return result.rows[0];
}

async function createUser(name, email, passwordHash) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, plan, created_at`,
    [name, email, passwordHash]
  );

  return result.rows[0];
}

async function updateUser(id, name, avatar) {
  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         avatar = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, name, email, avatar, plan, created_at`,
    [name, avatar || null, id]
  );

  return result.rows[0];
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser
};
