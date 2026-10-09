-- Some certificates are known only to the year (e.g. a program still running). date_precision tells the site how to show issued_on.
alter table public.certificates
  add column date_precision text not null default 'month' check (date_precision in ('month', 'year'));

grant select (date_precision) on public.certificates to anon, authenticated;

insert into public.certificates (slug, title, issuer, category, issued_on, date_precision, details, sort_order) values
  ('samsung-innovation-campus-libya', 'Samsung Innovation Campus (SIC) Libya', 'Samsung', 'AI & Data', '2026-01-01', 'year', 'Training program', 5);
