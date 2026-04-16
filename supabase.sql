-- Supabase 初始化 SQL
-- 在 Supabase SQL Editor 中执行一次即可

-- 启用 RLS（行级安全）建议保留默认策略

CREATE TABLE IF NOT EXISTS cycle_data (
  id TEXT PRIMARY KEY,
  trip_days JSONB NOT NULL DEFAULT '[]'::jsonb,
  gear_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  accommodations JSONB NOT NULL DEFAULT '[]'::jsonb,
  settings JSONB NOT NULL DEFAULT '{"darkMode":false}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 允许匿名插入/更新/读取（因为您使用固定账号 cycle，不开放注册）
ALTER TABLE cycle_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON cycle_data
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated" ON cycle_data
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
