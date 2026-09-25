-- ROBOHUB Store — Supabase schema
-- Paste this whole block into Supabase → SQL Editor → Run.

create table if not exists public.products (
  id text primary key,
  name text not null,
  sku text not null,
  price numeric not null check (price >= 0),
  category text not null default 'Components',
  short_description text not null default '',
  description text not null default '',
  specs jsonb not null default '[]',
  kit_contents jsonb not null default '[]',
  images jsonb not null default '[]',
  image_url text,
  stock_status text not null default 'In Stock',
  featured boolean not null default false,
  rating numeric not null default 4.5,
  created_date date not null default current_date,
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_date date not null default current_date
);
create index if not exists reviews_product_id_idx on public.reviews (product_id);

create table if not exists public.settings (
  id integer primary key check (id = 1),
  tagline text not null,
  announcement text not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security: everyone reads, visitors may post reviews,
-- only a signed-in admin can change products/settings or use Storage.
alter table public.products enable row level security;
alter table public.reviews enable row level security;
alter table public.settings enable row level security;

create policy "public read products" on public.products for select using (true);
create policy "public read reviews"  on public.reviews  for select using (true);
create policy "public read settings" on public.settings for select using (true);
create policy "anyone post reviews"  on public.reviews  for insert with check (true);

create policy "admin write products" on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write settings" on public.settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin moderate reviews" on public.reviews for delete
  using (auth.role() = 'authenticated');

insert into public.settings (id, tagline, announcement)
values (1, 'The Hardware behind the innovation',
        'Free delivery in Accra over GH₵ 200 · WhatsApp orders 7am–9pm')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public read images" on storage.objects for select
  using (bucket_id = 'product-images');
create policy "admin upload images" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images');
create policy "admin replace images" on storage.objects for update to authenticated
  using (bucket_id = 'product-images');
create policy "admin remove images" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images');
