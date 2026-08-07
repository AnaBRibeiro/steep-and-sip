-- Adds a privacy toggle for the profile's Link field.
-- Run this once in the Supabase SQL Editor.

alter table profiles
  add column if not exists website_public boolean not null default false;
