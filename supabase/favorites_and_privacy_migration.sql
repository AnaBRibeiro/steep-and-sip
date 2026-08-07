-- Adds tea favorites and granular profile privacy controls.
-- Run this once in the Supabase SQL Editor.

-- ---------------------------------------------------------------------------
-- Favorites
-- ---------------------------------------------------------------------------
create table if not exists favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  tea_id text not null references teas(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, tea_id)
);

alter table favorites enable row level security;

create policy "Users can view their own favorites"
  on favorites for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can add their own favorites"
  on favorites for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can remove their own favorites"
  on favorites for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on favorites to authenticated;
grant all on favorites to service_role;

-- ---------------------------------------------------------------------------
-- Granular profile privacy
-- Avatar and display name are always shown on a public profile; bio and
-- favorites are each an opt-in on top of the existing "is_public" master switch.
-- ---------------------------------------------------------------------------
alter table profiles
  add column if not exists bio_public boolean not null default false,
  add column if not exists favorites_public boolean not null default false;
