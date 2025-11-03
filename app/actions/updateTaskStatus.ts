"use server";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function updateTaskStatus(
  taskId: string,
  newStatus: string,
  projectId: string,
  userId: string
) {
  try {
    const taskRef = doc(db, "projects", projectId, "tasks", taskId);

    const updateData: any = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    // ✅ Handle completedAt timestamp
    if (newStatus === "Completed") {
      updateData.completedAt = new Date().toISOString();
    } else {
      updateData.completedAt = null;
    }

    await updateDoc(taskRef, updateData);

    revalidatePath(`/dashboard/user/${userId}/project/${projectId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating task status:", error);
    return { success: false, error: "Failed to update task status" };
  }
}
