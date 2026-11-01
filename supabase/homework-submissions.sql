-- Apply after supabase/teacher-access.sql.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('homework-submissions','homework-submissions',false,20971520,
array['image/jpeg','image/png','image/webp','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public=false, file_size_limit=20971520,
allowed_mime_types=excluded.allowed_mime_types;

create table if not exists public.homework_submissions (
 id uuid primary key default gen_random_uuid(),
 student_id text not null references public.students(id) on delete cascade,
 lesson_date date not null,
 status text not null default 'submitted' check(status in ('submitted','reviewed','revision')),
 teacher_comment text not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(student_id,lesson_date)
);
create table if not exists public.homework_submission_files (
 id uuid primary key default gen_random_uuid(),
 submission_id uuid not null references public.homework_submissions(id) on delete cascade,
 storage_path text not null unique,
 original_name text not null,
 size_bytes bigint not null check(size_bytes > 0 and size_bytes <= 20971520),
 created_at timestamptz not null default now()
);
alter table public.homework_submissions enable row level security;
alter table public.homework_submission_files enable row level security;
grant select,insert,update on public.homework_submissions to authenticated;
grant select,insert on public.homework_submission_files to authenticated;
create policy "homework submissions read" on public.homework_submissions for select to authenticated
using(public.is_teacher() or student_id=public.current_student_id());
create policy "student submit homework" on public.homework_submissions for insert to authenticated
with check(student_id=public.current_student_id() and status='submitted' and teacher_comment='');
create policy "teacher review homework" on public.homework_submissions for update to authenticated
using(public.is_teacher()) with check(public.is_teacher());
create policy "homework files read" on public.homework_submission_files for select to authenticated
using(exists(select 1 from public.homework_submissions s where s.id=submission_id and (public.is_teacher() or s.student_id=public.current_student_id())));
create policy "student add homework files" on public.homework_submission_files for insert to authenticated
with check(exists(select 1 from public.homework_submissions s where s.id=submission_id and s.student_id=public.current_student_id() and s.status='submitted') and storage_path like (public.current_student_id() || '/' || submission_id::text || '/%'));

-- Storage paths: student-id/submission-id/random-filename. Never expose public URLs.
create policy "homework storage read" on storage.objects for select to authenticated
using(bucket_id='homework-submissions' and
(public.is_teacher() or (storage.foldername(name))[1]=public.current_student_id()));
create policy "homework storage student upload" on storage.objects for insert to authenticated
with check(bucket_id='homework-submissions' and (storage.foldername(name))[1]=public.current_student_id()
and exists(select 1 from public.homework_submissions s where s.id::text=(storage.foldername(name))[2] and s.student_id=public.current_student_id() and s.status='submitted'));
