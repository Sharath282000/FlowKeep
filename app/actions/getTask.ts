"use server";

import { db } from "@/lib/firebase";
import { TaskData } from "@/lib/type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getTasks(
  userId: string,
  projectId: string
): Promise<{ success: boolean; tasks: TaskData[] | null }> {
  if (!projectId || !userId) return { success: false, tasks: null };

  try {
    const q = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy("priorityRank", "asc"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const convertDate = (val: any) => {
      if (!val) return null;
      if (typeof val === "string") return val;
      if (val?.toDate) return val.toDate().toISOString();
      if (val?.seconds) return new Date(val.seconds * 1000).toISOString();
      return String(val);
    };

    let tasks: TaskData[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        tid: doc.id,
        title: data.title ?? "",
        description: data.description ?? "",
        status: data.status ?? "To Do",
        priority: data.priority ?? "Low",
        tags: Array.isArray(data.tags) ? data.tags : [],
        dueDate: convertDate(data.dueDate),
        createdAt: convertDate(data.createdAt),
        completedAt: convertDate(data.completedAt),
        updatedAt: convertDate(data.updatedAt),
        userId: data.userId ?? "",
        projectId,
        priorityRank: data.priorityRank ?? 4,
      } as TaskData;
    });

    return { success: true, tasks };
  } catch (error) {
   
    return { success: false, tasks: null };
  }
}
