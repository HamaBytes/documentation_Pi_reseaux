-- Supabase initialization SQL (run in your Supabase SQL editor)
-- Creates a minimal `tests` table for storing validation tests and screenshot URLs

create extension if not exists "pgcrypto";

create table if not exists tests (
  id uuid primary key default gen_random_uuid(),
  department text,
  service text,
  server text,
  test_name text not null,
  description text,
  status text,
  screenshot_urls text[] default '{}',
  evidence_links text[] default '{}',
  created_at timestamptz default now()
);

-- Optional: simple services and servers tables for inventory
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  test_templates jsonb
);

create table if not exists servers (
  id uuid primary key default gen_random_uuid(),
  department text,
  name text not null,
  role text,
  ip text,
  notes text
);
