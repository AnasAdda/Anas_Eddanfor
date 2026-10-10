-- Certificate files and thumbnails served to the portfolio. Public bucket = files are readable by URL only.
-- No policies on storage.objects for anon/authenticated, so nobody can list, upload, change or delete through the API.
-- Objects: <slug>.pdf|jpg for certificates, thumbs/<slug>.jpg for 480px thumbnails.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('certificates', 'certificates', true, 5242880, array['application/pdf', 'image/jpeg', 'image/png']);
