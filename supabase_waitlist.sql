-- Run this in Supabase SQL editor
create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (position('@' in email) > 1),
  city text,
  zip text,
  source text,
  user_agent text,
  referer text
);

create index if not exists idx_waitlist_email on public.waitlist ((lower(email)));

alter table public.waitlist enable row level security;
-- No anon insert policies; use service role from server only.
