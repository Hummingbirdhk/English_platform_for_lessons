-- Run this after the base tables have been created.
-- It adds application roles and Row Level Security policies.

create table if not exists public.app_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('teacher', 'student')),
  student_id text references public.students(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (
    (role = 'teacher' and student_id is null)
    or (role = 'student' and student_id is not null)
  )
);

alter table public.app_users enable row level security;

create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users
    where user_id = auth.uid()
      and role = 'teacher'
  );
$$;

create or replace function public.current_student_id()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select student_id
  from public.app_users
  where user_id = auth.uid()
    and role = 'student'
  limit 1;
$$;

revoke all on function public.is_teacher() from public;
revoke all on function public.current_student_id() from public;
grant execute on function public.is_teacher() to authenticated;
grant execute on function public.current_student_id() to authenticated;

drop policy if exists "app users read own row" on public.app_users;
create policy "app users read own row"
on public.app_users for select
to authenticated
using (user_id = auth.uid());

-- Students
drop policy if exists "students read permitted rows" on public.students;
create policy "students read permitted rows"
on public.students for select
to authenticated
using (public.is_teacher() or id = public.current_student_id());

drop policy if exists "teachers manage students" on public.students;
create policy "teachers manage students"
on public.students for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Public-facing student profile state
drop policy if exists "profile state read permitted rows" on public.student_profile_state;
create policy "profile state read permitted rows"
on public.student_profile_state for select
to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "teachers manage profile state" on public.student_profile_state;
create policy "teachers manage profile state"
on public.student_profile_state for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Private teacher notes
drop policy if exists "teachers manage notes" on public.teacher_notes;
create policy "teachers manage notes"
on public.teacher_notes for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Assigned materials
drop policy if exists "assigned materials read permitted rows" on public.assigned_materials;
create policy "assigned materials read permitted rows"
on public.assigned_materials for select
to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "teachers manage assigned materials" on public.assigned_materials;
create policy "teachers manage assigned materials"
on public.assigned_materials for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Assigned lessons
drop policy if exists "assigned lessons read permitted rows" on public.assigned_lessons;
create policy "assigned lessons read permitted rows"
on public.assigned_lessons for select
to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "teachers manage assigned lessons" on public.assigned_lessons;
create policy "teachers manage assigned lessons"
on public.assigned_lessons for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Lesson preparation is private teacher workspace
drop policy if exists "teachers manage preparation" on public.lesson_preparation;
create policy "teachers manage preparation"
on public.lesson_preparation for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Lesson history
drop policy if exists "lesson history read permitted rows" on public.lesson_history;
create policy "lesson history read permitted rows"
on public.lesson_history for select
to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "teachers manage lesson history" on public.lesson_history;
create policy "teachers manage lesson history"
on public.lesson_history for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Attendance
drop policy if exists "attendance read permitted rows" on public.attendance;
create policy "attendance read permitted rows"
on public.attendance for select
to authenticated
using (public.is_teacher() or student_id = public.current_student_id());

drop policy if exists "teachers manage attendance" on public.attendance;
create policy "teachers manage attendance"
on public.attendance for all
to authenticated
using (public.is_teacher())
with check (public.is_teacher());

-- Keep account creation closed in the app. Add role rows manually in SQL Editor:
-- insert into public.app_users (user_id, role) values ('AUTH_USER_UUID', 'teacher');
-- insert into public.app_users (user_id, role, student_id)
-- values ('AUTH_USER_UUID', 'student', 'student-zlata');
