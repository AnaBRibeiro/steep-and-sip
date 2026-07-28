-- Steep & Sip Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).

-- ---------------------------------------------------------------------------
-- Newsletter signups
-- ---------------------------------------------------------------------------
create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_signups enable row level security;

-- Anyone (using the public anon key) can submit a signup, but cannot read the list back.
create policy "Public can insert newsletter signups"
  on newsletter_signups
  for insert
  to anon
  with check (true);

grant insert on newsletter_signups to anon;

-- ---------------------------------------------------------------------------
-- Teas
-- ---------------------------------------------------------------------------
create table if not exists teas (
  id text primary key,
  name text not null,
  emoji text not null,
  category text not null,
  caffeine text not null check (caffeine in ('none', 'low', 'medium', 'high')),
  flavors text[] not null,
  goals text[] not null,
  times text[] not null,
  steep_temp text not null,
  steep_time text not null,
  description text not null,
  ritual text not null
);

alter table teas enable row level security;

-- Anyone can read the tea catalog (needed for the site to display/quiz against it).
create policy "Public can read teas"
  on teas
  for select
  to anon
  using (true);

grant select on teas to anon;

insert into teas (id, name, emoji, category, caffeine, flavors, goals, times, steep_temp, steep_time, description, ritual)
values
  ('matcha', 'Matcha', '🍵', 'Green Tea', 'high', array['earthy','fresh'], array['energy','wellness'], array['morning'], '175°F (80°C)', 'Whisk 15–30 seconds',
    'A vibrant, stone-ground green tea that delivers steady, jitter-free energy and a wave of antioxidants.',
    'Sift a teaspoon into your bowl, add a splash of hot water, and whisk briskly in a zig-zag until frothy.'),
  ('sencha', 'Sencha', '🌿', 'Green Tea', 'medium', array['fresh','earthy'], array['energy','wellness'], array['morning','afternoon'], '175°F (80°C)', '2 minutes',
    'A grassy, vegetal green tea with a clean finish — bright enough to wake you up without overwhelming you.',
    'Let just-boiled water rest for a minute before pouring, so the delicate leaves don''t turn bitter.'),
  ('dragonwell', 'Dragonwell', '🐉', 'Green Tea', 'medium', array['earthy','fresh'], array['energy','wellness'], array['morning','afternoon'], '175°F (80°C)', '3 minutes',
    'A pan-fired Chinese green tea with a toasty, chestnut-like sweetness and a calm, focused lift.',
    'Use a glass vessel if you can — watching the flat leaves unfurl is half the pleasure.'),
  ('assam', 'Assam Black', '☕', 'Black Tea', 'high', array['earthy','spiced'], array['energy'], array['morning'], '212°F (100°C)', '4 minutes',
    'A bold, malty black tea built for mornings that need a real push out the door.',
    'Steep it strong and add a splash of milk if you like — it can easily carry the weight.'),
  ('earl-grey', 'Earl Grey', '🫖', 'Black Tea', 'medium', array['floral','fruity'], array['energy','relax'], array['morning','afternoon'], '200°F (93°C)', '3–4 minutes',
    'Classic black tea scented with bergamot — bright citrus notes over a smooth, brisk base.',
    'Cover your cup while it steeps to trap the citrus aromatics before your first sip.'),
  ('chai', 'Masala Chai', '🫚', 'Spiced Black Tea', 'medium', array['spiced','earthy'], array['energy','relax'], array['morning','afternoon'], '212°F (100°C)', '5 minutes, simmered',
    'Black tea simmered with warming spices like cardamom, ginger, and cinnamon — cozy and grounding.',
    'Simmer the spices in water first, then add the tea leaves and a milk of your choice.'),
  ('white-peony', 'White Peony', '🌸', 'White Tea', 'low', array['floral','fresh'], array['relax','wellness'], array['afternoon'], '185°F (85°C)', '3–4 minutes',
    'A delicate, subtly sweet white tea with soft floral notes — gentle on the senses and the stomach.',
    'Use more leaf than you think — white tea is forgiving and loves a generous steep.'),
  ('oolong', 'Tie Guan Yin Oolong', '🍂', 'Oolong', 'medium', array['floral','earthy'], array['wellness','relax'], array['afternoon'], '195°F (90°C)', '1 minute, multiple infusions',
    'A partially oxidized tea with an orchid-like aroma and a smooth, evolving flavor across infusions.',
    'Re-steep the same leaves 3–4 times, adding a few seconds to each infusion for a slow afternoon ritual.'),
  ('puerh', 'Pu-erh', '🟤', 'Fermented Tea', 'medium', array['earthy'], array['digestion','wellness'], array['afternoon','evening'], '212°F (100°C)', '30 seconds rinse, then 2–3 minutes',
    'A dark, earthy fermented tea traditionally sipped after meals to settle and support digestion.',
    'Rinse the leaves briefly with hot water first, then discard that rinse before your real steep.'),
  ('peppermint', 'Peppermint', '🌱', 'Herbal', 'none', array['fresh'], array['digestion','relax'], array['afternoon','evening'], '212°F (100°C)', '5–7 minutes',
    'A cooling, caffeine-free herbal infusion known for soothing the stomach and clearing the mind.',
    'Crush a leaf between your fingers before steeping to release extra aroma.'),
  ('ginger', 'Ginger Root', '🫙', 'Herbal', 'none', array['spiced'], array['digestion','wellness'], array['morning','afternoon'], '212°F (100°C)', '8–10 minutes',
    'A warming, spicy-sweet root infusion that supports digestion and wakes up the senses without caffeine.',
    'Add a slice of fresh ginger and a squeeze of lemon for extra brightness.'),
  ('chamomile', 'Chamomile', '🌼', 'Herbal', 'none', array['floral'], array['sleep','relax'], array['evening'], '212°F (100°C)', '5 minutes',
    'A honey-sweet, apple-like floral infusion that''s practically synonymous with winding down.',
    'Steep with the lid on to keep the calming aromatics from escaping.'),
  ('lavender', 'Lavender Herbal', '💜', 'Herbal', 'none', array['floral'], array['sleep','relax'], array['evening'], '212°F (100°C)', '5 minutes',
    'A soft, perfumed infusion that pairs beautifully with chamomile or on its own before bed.',
    'Dim the lights and sip slowly — this one rewards a slow, unhurried pace.'),
  ('rooibos', 'Rooibos', '🟠', 'Herbal', 'none', array['earthy','fruity'], array['relax','wellness'], array['afternoon','evening'], '212°F (100°C)', '5–7 minutes',
    'A naturally sweet, caffeine-free red bush tea from South Africa with a smooth, woody warmth.',
    'It''s nearly impossible to over-steep — let it sit as long as you like.'),
  ('hibiscus', 'Hibiscus', '🌺', 'Herbal', 'none', array['fruity'], array['wellness','relax'], array['afternoon','evening'], '212°F (100°C)', '5 minutes',
    'A tart, ruby-red infusion bursting with fruity brightness — refreshing hot or over ice.',
    'Sweeten lightly with honey to balance the tartness if you''d like.'),
  ('lemon-balm', 'Lemon Balm', '🍋', 'Herbal', 'none', array['fresh','fruity'], array['relax','sleep'], array['evening'], '212°F (100°C)', '6 minutes',
    'A gently lemony herbal infusion long used to quiet a busy mind before rest.',
    'Pair with a few mint leaves for a brighter, more fragrant cup.')
on conflict (id) do nothing;
