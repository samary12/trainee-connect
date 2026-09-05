import { supabase } from "@/integrations/supabase/client";

export type UploadedFile = { path: string; name: string };

export async function uploadFile(
  bucket: "task-files" | "deliverables",
  userId: string,
  file: File
): Promise<UploadedFile> {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  return { path, name: file.name };
}

export async function openFile(bucket: "task-files" | "deliverables", path: string) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 10, {
    download: false,
  });
  if (error || !data) throw error ?? new Error("Could not open the file");
  window.open(data.signedUrl, "_blank", "noopener");
}
