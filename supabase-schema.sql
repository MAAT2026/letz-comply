-- ============================================================
-- LetzComply — Supabase Database Schema
-- Run this in Supabase SQL Editor after creating your project
-- ============================================================

-- Enable Row Level Security on all tables
-- Users can only see/edit their own data

-- 1. Regulations (populated by scraper or admin)
CREATE TABLE regulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL, -- CSSF, ESMA, ALFI, LPEA
  date DATE NOT NULL,
  topic TEXT,
  relevance TEXT DEFAULT 'medium', -- high, medium, low
  summary TEXT,
  full_detail TEXT,
  ai_summary TEXT,
  applicable_to TEXT[], -- array of fund types
  function_insights JSONB DEFAULT '{}'::jsonb,
  concepts TEXT[],
  chain JSONB DEFAULT '[]'::jsonb,
  tags TEXT[],
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Regulations are viewable by all authenticated users"
  ON regulations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only service role can insert/update regulations"
  ON regulations FOR ALL USING (auth.role() = 'service_role');

-- 2. User Actions (per-user task tracking)
CREATE TABLE user_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  title TEXT NOT NULL,
  description TEXT,
  regulation_id UUID,
  regulation_title TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'medium',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own actions"
  ON user_actions FOR ALL USING (auth.uid() = user_id);

-- 3. Calendar Events (per-user custom events)
CREATE TABLE calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  end_date DATE,
  category TEXT DEFAULT 'custom',
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own calendar events"
  ON calendar_events FOR ALL USING (auth.uid() = user_id);

-- 4. Regulatory Deadlines (shared, admin-managed)
CREATE TABLE regulatory_deadlines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  source TEXT, -- CSSF, ESMA, etc.
  category TEXT,
  applicable_to TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE regulatory_deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deadlines viewable by all authenticated users"
  ON regulatory_deadlines FOR SELECT TO authenticated USING (true);

-- 5. Industry Events (shared, admin-managed)
CREATE TABLE industry_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  end_date DATE,
  organizer TEXT,
  location TEXT,
  url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE industry_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events viewable by all authenticated users"
  ON industry_events FOR SELECT TO authenticated USING (true);

-- 6. Projects (per-user fund simulations / onboarding projects)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  name TEXT NOT NULL,
  type TEXT, -- 'simulation', 'onboarding', 'advisor'
  data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'in-progress',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own projects"
  ON projects FOR ALL USING (auth.uid() = user_id);

-- 7. Funds (per-user simulated funds)
CREATE TABLE funds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  name TEXT NOT NULL,
  regime TEXT,
  legal_form TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE funds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own funds"
  ON funds FOR ALL USING (auth.uid() = user_id);

-- 8. Mandates (per-user onboarding mandates)
CREATE TABLE mandates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  client_name TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE mandates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own mandates"
  ON mandates FOR ALL USING (auth.uid() = user_id);
