-- Anas received the Samsung Innovation Campus Libya certificate (AI course, 08.08.2026 – 10.10.2026).
update public.certificates
set title = 'Samsung Innovation Campus Libya: Artificial Intelligence Course',
    issued_on = '2026-10-10',
    date_precision = 'month',
    file_path = 'certificates/samsung-innovation-campus-libya.jpg',
    details = 'Certificate of Completion · 2-month course'
where slug = 'samsung-innovation-campus-libya';
