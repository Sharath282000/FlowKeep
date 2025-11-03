"use server";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function updateProject(
  projectId: string,
  userId: string,
  data: { title?: string; description?: string }
) {
  if (!projectId || !userId) return null;

  try {
    const ref = doc(db, "projects", projectId);
    await updateDoc(ref, data);

    revalidatePath(`/dashboard/user/${userId}`);
    revalidatePath(`/dashboard/user/${userId}/project/${projectId}`);

    return { success: true };
  } catch (e) {
    return { success: false, e };
  }
}
