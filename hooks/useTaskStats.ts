"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useTaskStats(projectId: string) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    progress: 0,
    duetoday: 0,
  });

  useEffect(() => {
    if (!projectId) return;

    const tasksRef = collection(db, "projects", projectId, "tasks");

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => doc.data());
      const total = tasks.length;
      const completed = tasks.filter((t) => t.status === "Completed").length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const duetoday = tasks.filter((t) => {
        if (!t.dueDate || t.status === "Completed") return false;
        const due = new Date(t.dueDate);
        due.setHours(0, 0, 0, 0);
        return due.getTime() === today.getTime();
      }).length;

      setStats({ total, completed, progress, duetoday });
    });

    return () => unsubscribe();
  }, [projectId]);

  return stats;
}
