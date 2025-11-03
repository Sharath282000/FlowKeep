"use server";

import { db } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function updateTask(
  taskId: string,
  projectId: string,
  userId: string,
  data: { title?: string; priority?: string; dueDate?: string|null; tags?: string[] }
) {
  if (!taskId || !projectId || !userId) {
    return { success: false, error: "Invalid parameters" };
  }

  try {
    const ref = doc(db, "projects", projectId, "tasks", taskId);
    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    revalidatePath(`/dashboard/user/${userId}/project/${projectId}`);

    return { success: true };
  } catch (e) {
    return { success: false, e };
  }
}
