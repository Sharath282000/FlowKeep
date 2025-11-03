"use server";

import { db } from "@/lib/firebase";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: string, userId: string) {
  
  if (!projectId || !userId) return;

  try {
    const taskref = collection(db, "projects", projectId, "tasks");

    const tasksnapshot = await getDocs(taskref);

    const deletePromise = tasksnapshot.docs.map((t) => deleteDoc(t.ref));

    await Promise.all(deletePromise);

    const projectRef = doc(db, "projects", projectId);

    await deleteDoc(projectRef);

    revalidatePath(`/dashboard/user/${userId}`);

    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
}
