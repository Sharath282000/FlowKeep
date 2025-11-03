"use server";

import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { randomUUID } from "crypto";
import { TaskData } from "@/lib/type";

export async function addTask(
  task: TaskData
): Promise<{ success: boolean; tid: string }> {
  if (!task?.projectId) throw new Error("Missing projectId in task data");

  if (!task?.userId) throw new Error("Missing userId in task data");

  const tid = randomUUID();
  const ref = doc(db, "projects", task.projectId, "tasks", tid);

  //const now = new Date().toISOString();

  const priorityRankMap = {
    High: 1,
    Medium: 2,
    Low: 3,
    None: 4,
  };

  const priorityRank =
    task.priority && priorityRankMap[task.priority]
      ? priorityRankMap[task.priority]
      : 4;

  await setDoc(ref, {
    ...task,
    tid,
    createdAt: serverTimestamp(),
    priorityRank: priorityRank,
  });

  return { success: true, tid };
}
