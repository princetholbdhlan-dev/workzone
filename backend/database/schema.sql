CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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
    status VARCHAR(50) DEFAULT 'active',
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

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_projects_user_id
ON projects(user_id);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id
ON favorites(user_id);

CREATE INDEX IF NOT EXISTS idx_history_user_id
ON history(user_id);

CREATE INDEX IF NOT EXISTS idx_tools_slug
ON tools(slug);


INSERT INTO tools
(name, slug, description, category, icon, is_pro)
VALUES
(
    'Image Compressor',
    'image-compressor',
    'Compress images while maintaining quality.',
    'Image',
    'Image',
    false
),
(
    'Image Resizer',
    'image-resizer',
    'Resize images quickly for different platforms.',
    'Image',
    'Maximize',
    false
),
(
    'Image Converter',
    'image-converter',
    'Convert images between popular formats.',
    'Image',
    'RefreshCw',
    false
),
(
    'PDF Merger',
    'pdf-merger',
    'Merge multiple PDF files into one document.',
    'PDF',
    'Files',
    false
),
(
    'PDF Splitter',
    'pdf-splitter',
    'Split PDF documents into separate files.',
    'PDF',
    'Scissors',
    false
),
(
    'PDF Compressor',
    'pdf-compressor',
    'Reduce PDF file size.',
    'PDF',
    'FileDown',
    false
),
(
    'Word Counter',
    'word-counter',
    'Count words, characters and sentences.',
    'Text',
    'Type',
    false
),
(
    'Case Converter',
    'case-converter',
    'Convert text to uppercase, lowercase and more.',
    'Text',
    'CaseUpper',
    false
),
(
    'JSON Formatter',
    'json-formatter',
    'Format and validate JSON data.',
    'Developer',
    'Braces',
    false
),
(
    'CSV Cleaner',
    'csv-cleaner',
    'Clean and organize CSV data.',
    'Data',
    'Table',
    false
),
(
    'SEO Title Generator',
    'seo-title-generator',
    'Generate SEO-friendly titles.',
    'SEO',
    'Search',
    true
),
(
    'Invoice Generator',
    'invoice-generator',
    'Create professional invoices.',
    'Freelancer',
    'Receipt',
    false
),
(
    'AI Rewriter',
    'ai-rewriter',
    'Rewrite content using AI.',
    'Writing',
    'Sparkles',
    true
),
(
    'HTML Formatter',
    'html-formatter',
    'Format and clean HTML code.',
    'Developer',
    'Code',
    false
)
ON CONFLICT (slug) DO NOTHING;
