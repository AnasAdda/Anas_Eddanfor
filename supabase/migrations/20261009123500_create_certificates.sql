-- Certificates shown on the portfolio. Public read-only: visitors can select, nobody can write through the API.
create table public.certificates (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  issuer text not null,
  category text not null check (category in ('AI & Data', 'Cloud & Infrastructure', 'Networking', 'Programming', 'Engineering', 'Language')),
  issued_on date not null,
  credential_id text,
  verify_url text check (verify_url is null or verify_url ~ '^https://'),
  file_path text check (file_path is null or file_path ~ '^certificates/[a-z0-9-]+\.(pdf|jpg|png)$'),
  details text,
  parent_slug text references public.certificates (slug) on update cascade on delete cascade,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.certificates is 'Certificates listed on the portfolio website. file_path is relative to the site root.';

alter table public.certificates enable row level security;

create policy "Published certificates are public"
  on public.certificates
  for select
  to anon, authenticated
  using (is_published);

revoke all on public.certificates from anon, authenticated;
grant select on public.certificates to anon, authenticated;

create index certificates_parent_idx on public.certificates (parent_slug);

insert into public.certificates (slug, title, issuer, category, issued_on, credential_id, verify_url, file_path, details, parent_slug, sort_order) values
  ('ec-council-aie', 'Artificial Intelligence Essentials (AI|E)', 'EC-Council', 'AI & Data', '2026-09-12', '526392', null, 'certificates/ec-council-aie.jpg', null, null, 10),
  ('nvidia-ai-agents-multimodal', 'Building AI Agents with Multimodal Models', 'NVIDIA Deep Learning Institute', 'AI & Data', '2026-09-03', 'oJWBKLSUQB6ybqCwGgd9sA', 'https://learn.nvidia.com/certificates?id=oJWBKLSUQB6ybqCwGgd9sA', 'certificates/nvidia-ai-agents-multimodal.pdf', 'Certificate of Competency', null, 20),
  ('cisco-data-science-python', 'Data Science Essentials with Python', 'Cisco Networking Academy', 'AI & Data', '2026-05-16', 'c84a32e1-5f82-4d9d-8bd9-86ab05ebdfc3', null, 'certificates/cisco-data-science-python.pdf', null, null, 30),
  ('cisco-data-analytics', 'Data Analytics Essentials', 'Cisco Networking Academy', 'AI & Data', '2026-05-05', '9141725f-3c2a-4828-a364-52c246837a69', null, 'certificates/cisco-data-analytics.pdf', null, null, 40),
  ('bayan-n8n-workshop', 'AI Workflow Automation with n8n', 'Bayan Academy', 'AI & Data', '2026-03-03', null, null, 'certificates/bayan-n8n-workshop.pdf', 'Workshop · 1 hour', null, 50),
  ('british-council-aptis', 'Aptis General: English B2 (CEFR)', 'British Council', 'Language', '2025-10-04', 'Aptis~0630145', 'https://credentials.britishcouncil.org/8b655ad3-5088-4253-8fa8-00d692069d13?key=3c5068b31b43d1c9c702cdf66434ae99c2a147fa3a868e6cf85d05c9c7092585', 'certificates/british-council-aptis.pdf', 'Score 149/200', null, 60),
  ('huawei-hcia-ai', 'HCIA-AI V4.0 Training', 'Huawei', 'AI & Data', '2025-04-30', 'HUC25OAITHOE0001000028', null, 'certificates/huawei-hcia-ai.jpg', 'Huawei Certified ICT Associate, AI track', null, 70),
  ('lamah-rd-program', 'Research and Development Training Program', 'Lamah Technologies', 'Engineering', '2025-02-27', null, null, 'certificates/lamah-rd-program.pdf', 'Ofoq initiative · 100 hours', null, 80),
  ('vcta-dcv-2023', 'VMware Certified Technical Associate: Data Center Virtualization 2023 (VCTA-DCV)', 'VMware', 'Cloud & Infrastructure', '2023-10-02', 'VMW-03310602K-03237737', null, 'certificates/vcta-dcv-2023.pdf', 'Certification', null, 90),
  ('lati-vmware-bootcamp', 'VMware Cloud Computing Bootcamp', 'Libyan Academy for Telecom and Informatics (LATI)', 'Cloud & Infrastructure', '2023-09-14', null, null, 'certificates/lati-vmware-bootcamp.pdf', '300 hours', null, 100),
  ('vmware-dcv-cts', 'Data Center Virtualization: Core Technical Skills', 'VMware IT Academy', 'Cloud & Infrastructure', '2023-09-12', null, null, 'certificates/vmware-dcv-cts.pdf', '20 hours', null, 110),
  ('python-for-everybody', 'Python for Everybody Specialization', 'University of Michigan · Coursera', 'Programming', '2021-09-21', '7E9LMZRV2PPS', 'https://coursera.org/verify/specialization/7E9LMZRV2PPS', 'certificates/python-for-everybody.pdf', '5 courses', null, 120),
  ('cisco-ccna-itn', 'CCNAv7: Introduction to Networks', 'Cisco Networking Academy', 'Networking', '2021-04-17', null, null, 'certificates/cisco-ccna-itn.pdf', null, null, 130),
  ('coursera-programming-for-everybody', 'Programming for Everybody (Getting Started with Python)', 'University of Michigan · Coursera', 'Programming', '2021-08-22', '4G29JJJ87GJZ', 'https://coursera.org/verify/4G29JJJ87GJZ', 'certificates/coursera-programming-for-everybody.pdf', null, 'python-for-everybody', 121),
  ('coursera-python-data-structures', 'Python Data Structures', 'University of Michigan · Coursera', 'Programming', '2021-08-22', 'WJTHYZLA9GDW', 'https://coursera.org/verify/WJTHYZLA9GDW', 'certificates/coursera-python-data-structures.pdf', null, 'python-for-everybody', 122),
  ('coursera-python-web-data', 'Using Python to Access Web Data', 'University of Michigan · Coursera', 'Programming', '2021-09-03', '3SJZYHD6YBQE', 'https://coursera.org/verify/3SJZYHD6YBQE', 'certificates/coursera-python-web-data.pdf', null, 'python-for-everybody', 123),
  ('coursera-databases-python', 'Using Databases with Python', 'University of Michigan · Coursera', 'Programming', '2021-09-21', 'PPYNZY983X7D', 'https://coursera.org/verify/PPYNZY983X7D', 'certificates/coursera-databases-python.pdf', null, 'python-for-everybody', 124),
  ('coursera-capstone', 'Capstone: Retrieving, Processing, and Visualizing Data with Python', 'University of Michigan · Coursera', 'Programming', '2021-09-21', 'AV7XH7P9FYNA', 'https://coursera.org/verify/AV7XH7P9FYNA', 'certificates/coursera-capstone.pdf', null, 'python-for-everybody', 125);
