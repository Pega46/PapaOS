create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  role text not null check (role in ('super_admin', 'admin', 'collaborator', 'visitor')),
  avatar_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table media_files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  public_url text,
  file_name text not null,
  mime_type text not null,
  file_size bigint not null,
  media_type text not null check (media_type in ('image', 'video')),
  alt_text text,
  uploaded_by uuid references profiles(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  created_at timestamptz default now()
);

create table memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  date_label text,
  category text,
  author_name text,
  author_relation text,
  media_id uuid references media_files(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  order_index int default 0,
  featured boolean default false,
  created_by uuid references profiles(id) on delete set null,
  approved_by uuid references profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table teachings (
  id uuid primary key default gen_random_uuid(),
  branch text not null,
  title text not null,
  body text not null,
  author_name text,
  author_relation text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  order_index int default 0,
  created_by uuid references profiles(id) on delete set null,
  approved_by uuid references profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_relation text,
  body text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  featured boolean default false,
  created_by uuid references profiles(id) on delete set null,
  approved_by uuid references profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table terminal_commands (
  id uuid primary key default gen_random_uuid(),
  command text unique not null,
  description text not null,
  response text,
  action_type text not null
    check (action_type in ('navigate', 'message', 'clear', 'system', 'list')),
  action_target text,
  enabled boolean default true,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table app_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_by uuid references profiles(id) on delete set null,
  updated_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table media_files enable row level security;
alter table memories enable row level security;
alter table teachings enable row level security;
alter table messages enable row level security;
alter table terminal_commands enable row level security;
alter table app_settings enable row level security;
alter table audit_logs enable row level security;
