# Backend Setup Guide 🛠️

This document contains the source of truth for the Supabase backend configuration.

## 1. SQL Schema

Execute this in the [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql):

```sql
-- Create Products Table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  category text check (category in ('sweet', 'supermarket', 'freezing', 'cheese_milk')),
  image_url text,
  is_available boolean default true,
  unit text check (unit in ('kg', 'g', 'piece', 'pack')),
  min_order numeric default 1,
  step numeric default 1,
  created_at timestamp with time zone default now()
);

-- Create Orders Table
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text,
  whatsapp_number text,
  items jsonb,
  total_price numeric,
  status text default 'pending',
  created_at timestamp with time zone default now()
);
```

## 2. Row Level Security (RLS)

### Products Table
```sql
alter table products enable row level security;

-- Allow anyone to view products
create policy "Allow public read access" on products
  for select using (true);

-- Allow insertions (useful for seeding, disable for production)
create policy "Allow public insert access" on products
  for insert with check (true);
```

### Orders Table
```sql
alter table orders enable row level security;

-- Allow any customer to create an order
create policy "Allow internal insert access" on orders
  for insert with check (true);
```

## 3. Storage Configuration

1. **Bucket Name**: `product-images`
2. **Access**: Public
3. **Policy**: Give public read access to all users.
