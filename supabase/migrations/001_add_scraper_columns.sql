-- Add columns needed by the scraper Edge Function
-- Run this in Supabase SQL Editor

-- source_id: used for deduplication (e.g. circular number)
ALTER TABLE regulations ADD COLUMN IF NOT EXISTS source_id TEXT;

-- notified: tracks whether email digest has been sent
ALTER TABLE regulations ADD COLUMN IF NOT EXISTS notified BOOLEAN DEFAULT false;

-- entity_relevance: which entity types this regulation applies to
ALTER TABLE regulations ADD COLUMN IF NOT EXISTS entity_relevance TEXT[];

-- url: direct link to the regulation (rename from source_url for consistency)
-- Keep source_url as-is, add url as alias
ALTER TABLE regulations ADD COLUMN IF NOT EXISTS url TEXT;

-- Create index on source_id for fast duplicate lookups
CREATE INDEX IF NOT EXISTS idx_regulations_source_id ON regulations (source_id);

-- Create index on notified for fast email queries
CREATE INDEX IF NOT EXISTS idx_regulations_notified ON regulations (notified);

-- Update RLS: allow service_role to do everything
DROP POLICY IF EXISTS "Only service role can insert/update regulations" ON regulations;
CREATE POLICY "Service role full access on regulations"
  ON regulations FOR ALL USING (true);
