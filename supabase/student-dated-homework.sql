-- Apply in Supabase SQL Editor before enabling the student homework editor.
create table if not exists public.student_homework_entries (
  student_id text not null references public.students(id) on delete cascade,
  lesson_date date not null,
  workbook text not null default '',
  textbook text not null default '',
  extra_task text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  primary key (student_id, lesson_date)
);
alter table public.student_homework_entries enable row level security;
grant select, insert, update on public.student_homework_entries to authenticated;

drop policy if exists "homework read permitted rows" on public.student_homework_entries;
create policy "homework read permitted rows"
on public.student_homework_entries for select to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "student inserts own homework" on public.student_homework_entries;
create policy "student inserts own homework"
on public.student_homework_entries for insert to authenticated
with check (student_id = public.current_student_id() and updated_by = auth.uid());

drop policy if exists "student updates own homework" on public.student_homework_entries;
create policy "student updates own homework"
on public.student_homework_entries for update to authenticated
using (student_id = public.current_student_id())
with check (student_id = public.current_student_id() and updated_by = auth.uid());

-- Teacher reads entries but cannot replace students' own entries via these policies.
