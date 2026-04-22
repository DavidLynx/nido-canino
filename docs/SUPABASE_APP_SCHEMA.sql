-- Nido Canino app schema v1
-- Run this in the Supabase SQL editor after reviewing it.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    phone text,
    city text default 'Bogota',
    zone text,
    housing_type text,
    has_other_pets boolean default false,
    experience_level text,
    preferred_services text[] default '{}',
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.pets (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    species text not null default 'dog',
    breed text,
    breed_custom text,
    sex text,
    birth_date date,
    age_text text,
    weight_kg numeric(5, 2),
    is_neutered boolean default false,
    energy_level text,
    size_category text,
    temperament text,
    vaccines_up_to_date boolean default false,
    deworming_up_to_date boolean default false,
    medical_notes text,
    medications text,
    behavior_notes text,
    feeding_notes text,
    care_notes text,
    special_care_notes text,
    photo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.pets add column if not exists breed_custom text;
alter table public.pets add column if not exists birth_date date;
alter table public.pets add column if not exists size_category text;
alter table public.pets add column if not exists vaccines_up_to_date boolean default false;
alter table public.pets add column if not exists deworming_up_to_date boolean default false;
alter table public.pets add column if not exists medications text;
alter table public.pets add column if not exists special_care_notes text;

create table if not exists public.service_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    pet_id uuid references public.pets(id) on delete set null,
    service_type text not null,
    date_start date,
    date_end date,
    duration_label text,
    need_description text,
    status text not null default 'pending',
    admin_notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint service_requests_status_check check (
        status in ('pending', 'contacted', 'confirmed', 'cancelled')
    )
);

create index if not exists pets_user_id_idx on public.pets(user_id);
create index if not exists service_requests_user_id_idx on public.service_requests(user_id);
create index if not exists service_requests_pet_id_idx on public.service_requests(pet_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_pets_updated_at on public.pets;
create trigger set_pets_updated_at
before update on public.pets
for each row execute function public.set_updated_at();

drop trigger if exists set_service_requests_updated_at on public.service_requests;
create trigger set_service_requests_updated_at
before update on public.service_requests
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.service_requests enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own pets" on public.pets;
create policy "Users can view own pets"
on public.pets for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own pets" on public.pets;
create policy "Users can insert own pets"
on public.pets for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own pets" on public.pets;
create policy "Users can update own pets"
on public.pets for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own pets" on public.pets;
create policy "Users can delete own pets"
on public.pets for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view own service requests" on public.service_requests;
create policy "Users can view own service requests"
on public.service_requests for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own service requests" on public.service_requests;
create policy "Users can insert own service requests"
on public.service_requests for insert
to authenticated
with check (
    auth.uid() = user_id
    and (
        pet_id is null
        or exists (
            select 1
            from public.pets
            where pets.id = service_requests.pet_id
            and pets.user_id = auth.uid()
        )
    )
);

drop policy if exists "Users can update own service requests" on public.service_requests;
