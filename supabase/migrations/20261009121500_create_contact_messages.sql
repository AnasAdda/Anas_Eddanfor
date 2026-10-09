-- Applied to the Anas_Eddanfor Supabase project on 2026-10-09.
create table public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message text not null check (char_length(message) between 1 and 5000),
  is_read boolean not null default false
);

comment on table public.contact_messages is 'Messages sent from the portfolio website contact form.';

alter table public.contact_messages enable row level security;

-- Visitors may only submit new messages; nobody can read, edit or delete through the public API.
create policy "Anyone can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (is_read = false);

revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, message) on public.contact_messages to anon, authenticated;
