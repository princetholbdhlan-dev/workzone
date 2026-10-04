const pool = require("./db");

async function initDatabase() {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        avatar TEXT,
        plan VARCHAR(50) NOT NULL DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tools (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(150) NOT NULL,
        slug VARCHAR(150) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100),
        icon VARCHAR(100),
        is_pro BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, tool_id)
      );

      CREATE TABLE IF NOT EXISTS history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
        action VARCHAR(100) DEFAULT 'used',
        input_data JSONB,
        output_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_projects_user_id
      ON projects(user_id);

      CREATE INDEX IF NOT EXISTS idx_favorites_user_id
      ON favorites(user_id);

      CREATE INDEX IF NOT EXISTS idx_history_user_id
      ON history(user_id);

      CREATE INDEX IF NOT EXISTS idx_tools_slug
      ON tools(slug);

      CREATE INDEX IF NOT EXISTS idx_tools_category
      ON tools(category);
    `);

    console.log("✅ WorkZone database tables are ready");
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    throw error;
  }
}

module.exports = initDatabase;
