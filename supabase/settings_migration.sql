-- Adds self-service profile fields and an avatar upload bucket.
-- Run this once in the Supabase SQL Editor.

alter table profiles
  add column if not exists username text unique,
  add column if not exists bio text,
  add column if not exists website text,
  add column if not exists is_public boolean not null default false;

alter table profiles
  add constraint profiles_username_format
  check (username is null or username ~ '^[a-z0-9_]{3,20}$');

-- Storage bucket for avatar uploads (public so avatars can be shown without signed URLs).
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Only the owner (their own user-id folder) can write their avatar.
create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Anyone can view avatars (they're rendered publicly across the site).
create policy "Anyone can view avatars"
  on storage.objects for select
  to public
  using (bucket_id = 'avatars');
