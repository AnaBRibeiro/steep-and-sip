-- Adds user-created tea routines that can be shared on a public profile.
-- Run this once in the Supabase SQL Editor.

create table if not exists routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  morning_tea_id text references teas(id) on delete set null,
  afternoon_tea_id text references teas(id) on delete set null,
  evening_tea_id text references teas(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint routines_has_a_tea check (
    morning_tea_id is not null or afternoon_tea_id is not null or evening_tea_id is not null
  )
);

alter table routines enable row level security;

create policy "Users can view their own routines"
  on routines for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can add their own routines"
  on routines for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can remove their own routines"
  on routines for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on routines to authenticated;
grant all on routines to service_role;

alter table profiles
  add column if not exists routines_public boolean not null default false;
