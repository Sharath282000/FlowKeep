"use server";

import { db } from "@/lib/firebase";
import { randomUUID } from "crypto";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function addProjectAction(
  userId: string,
  title: string,
  description: string
) {
  const id = randomUUID();
  try {
    await setDoc(doc(db, "projects", id), {
      title,
      description,
      userId,
      createdAt: serverTimestamp(),
    });
    revalidatePath(`/dashboard/user/${userId}`);
    return { success: true };
  } catch (e) {
    return { success: false, e };
  }
}
