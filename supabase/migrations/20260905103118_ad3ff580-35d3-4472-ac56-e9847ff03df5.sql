
-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  company text,
  role text NOT NULL DEFAULT 'trainee' CHECK (role IN ('trainee','supervisor')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, company, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, ''),
    NEW.raw_user_meta_data ->> 'company',
    CASE WHEN NEW.raw_user_meta_data ->> 'role' = 'supervisor' THEN 'supervisor' ELSE 'trainee' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- SUPERVISOR <-> TRAINEE LINKS
CREATE TABLE public.supervisor_trainees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supervisor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  trainee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supervisor_id, trainee_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.supervisor_trainees TO authenticated;
GRANT ALL ON public.supervisor_trainees TO service_role;
ALTER TABLE public.supervisor_trainees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "links_select_involved" ON public.supervisor_trainees FOR SELECT TO authenticated
  USING (auth.uid() = supervisor_id OR auth.uid() = trainee_id);
CREATE POLICY "links_insert_supervisor" ON public.supervisor_trainees FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = supervisor_id);
CREATE POLICY "links_delete_supervisor" ON public.supervisor_trainees FOR DELETE TO authenticated
  USING (auth.uid() = supervisor_id);

-- TASKS
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supervisor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  trainee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  instructions text NOT NULL DEFAULT '',
  deadline timestamptz NOT NULL,
  task_file_url text,
  task_file_name text,
  status text NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned','submitted','approved','changes_requested')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tasks_select_involved" ON public.tasks FOR SELECT TO authenticated
  USING (auth.uid() = supervisor_id OR auth.uid() = trainee_id);
CREATE POLICY "tasks_insert_supervisor" ON public.tasks FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = supervisor_id);
CREATE POLICY "tasks_update_involved" ON public.tasks FOR UPDATE TO authenticated
  USING (auth.uid() = supervisor_id OR auth.uid() = trainee_id)
  WITH CHECK (auth.uid() = supervisor_id OR auth.uid() = trainee_id);
CREATE POLICY "tasks_delete_supervisor" ON public.tasks FOR DELETE TO authenticated
  USING (auth.uid() = supervisor_id);

-- SUBMISSIONS
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  trainee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  supervisor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_url text,
  file_name text,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','changes_requested')),
  feedback text NOT NULL DEFAULT '',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "submissions_select_involved" ON public.submissions FOR SELECT TO authenticated
  USING (auth.uid() = supervisor_id OR auth.uid() = trainee_id);
CREATE POLICY "submissions_insert_trainee" ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = trainee_id);
CREATE POLICY "submissions_update_involved" ON public.submissions FOR UPDATE TO authenticated
  USING (auth.uid() = supervisor_id OR auth.uid() = trainee_id)
  WITH CHECK (auth.uid() = supervisor_id OR auth.uid() = trainee_id);

-- STORAGE POLICIES
CREATE POLICY "tms_files_insert_own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('task-files','deliverables') AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "tms_files_select_authenticated" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id IN ('task-files','deliverables'));
CREATE POLICY "tms_files_delete_own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('task-files','deliverables') AND (storage.foldername(name))[1] = auth.uid()::text);
