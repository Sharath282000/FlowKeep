"use server";


import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteTask(projectId: string, taskId: string) {
  try {
    const ref = doc(db, "projects", projectId, "tasks", taskId);
    await deleteDoc(ref);
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error };
  }
}
