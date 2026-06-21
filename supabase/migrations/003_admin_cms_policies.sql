-- Admin CMS: server-enforced access for authenticated admins.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and role in ('super_admin', 'admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and role = 'super_admin'
  );
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_super_admin() to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'memory-media', 'memory-media', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
on conflict (id) do update set public = true;

create policy "Public can read approved memories" on public.memories for select using (status = 'approved');
create policy "Admins manage memories" on public.memories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read approved teachings" on public.teachings for select using (status = 'approved');
create policy "Admins manage teachings" on public.teachings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read approved messages" on public.messages for select using (status = 'approved');
create policy "Admins manage messages" on public.messages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read enabled terminal commands" on public.terminal_commands for select using (enabled = true);
create policy "Admins manage terminal commands" on public.terminal_commands for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can read profiles" on public.profiles for select to authenticated using (public.is_admin());
create policy "Super admins can update profiles" on public.profiles for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
create policy "Admins manage memory uploads" on storage.objects for all to authenticated using (bucket_id = 'memory-media' and public.is_admin()) with check (bucket_id = 'memory-media' and public.is_admin());
