-- rls_auto_enable is an event-trigger function (it turns on RLS for new public tables).
-- Visitors never need to call it, so remove their EXECUTE grant. The trigger keeps working.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
