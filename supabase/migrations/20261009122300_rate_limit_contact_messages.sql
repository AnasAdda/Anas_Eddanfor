-- Spam protection for the contact form: at most 3 messages per visitor IP per 10 minutes
-- and 50 messages per hour overall. IPs are stored only as SHA-256 hashes.

-- Private schema: not exposed through the Data API.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

alter table public.contact_messages add column ip_hash text;

create or replace function private.contact_messages_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  headers json;
  client_ip text;
  recent_from_ip int;
  recent_total int;
begin
  begin
    headers := current_setting('request.headers', true)::json;
  exception when others then
    headers := null;
  end;
  client_ip := coalesce(
    nullif(trim(split_part(headers ->> 'x-forwarded-for', ',', 1)), ''),
    headers ->> 'cf-connecting-ip',
    'unknown'
  );

  new.ip_hash := encode(extensions.digest(client_ip, 'sha256'), 'hex');
  new.is_read := false;
  new.created_at := now();

  select count(*) into recent_from_ip
  from public.contact_messages
  where ip_hash = new.ip_hash and created_at > now() - interval '10 minutes';

  if recent_from_ip >= 3 then
    raise exception 'Too many messages, please try again later.' using errcode = 'P0001';
  end if;

  select count(*) into recent_total
  from public.contact_messages
  where created_at > now() - interval '1 hour';

  if recent_total >= 50 then
    raise exception 'Too many messages, please try again later.' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function private.contact_messages_guard() from public, anon, authenticated;

create trigger contact_messages_guard
  before insert on public.contact_messages
  for each row execute function private.contact_messages_guard();

create index contact_messages_ip_recent_idx on public.contact_messages (ip_hash, created_at desc);
create index contact_messages_created_idx on public.contact_messages (created_at desc);
