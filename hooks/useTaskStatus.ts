"use client";

import { getTasks } from "@/app/actions/getTask";
import { updateTaskStatus } from "@/app/actions/updateTaskStatus";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useTaskStatus({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string | undefined;
}) {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!projectId || !userId) return;
    if (hasRun.current) return;
    hasRun.current = true;

    const correctedDate = (d?: string | Date | null): Date => {
      if (!d) return new Date(0);
      const date = typeof d === "string" ? new Date(d) : d;
      // Normalize to local midnight (not UTC)
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();


    const moveTasks = async () => {
      try {
        const res = await getTasks(userId, projectId);
        if (!res.success || !res.tasks) return;

        const now = correctedDate(new Date());

        // --- Move overdue to backlog ---
        const overdue = res.tasks.filter((t) => {
          if (!t.dueDate) return false;
          const due = correctedDate(t.dueDate);

          const updated = t.updatedAt ? correctedDate(t.updatedAt) : null;

          if (updated && isSameDay(updated, now)) return false;

          return (
            due < now && t.status !== "Completed" && t.status !== "Backlog"
          );
        });
        // --- Move today's tasks to Pending ---
        const pending = res.tasks.filter((t) => {
          if (!t.dueDate) return false;
          const due = correctedDate(t.dueDate);

          const updated = t.updatedAt ? correctedDate(t.updatedAt) : null;

          if (updated && isSameDay(updated, now)) return false;

          return (
            isSameDay(due, now) &&
            t.status !== "Completed" &&
            t.status !== "Pending"
          );
        });

        if (overdue.length > 0) {
          await Promise.all(
            overdue.map((task) =>
              task.tid
                ? updateTaskStatus(task.tid, "Backlog", projectId, userId)
                : null
            )
          );
          toast.success(
            `📦 Moved ${overdue.length} overdue task${
              overdue.length > 1 ? "s" : ""
            } to Backlog`,
            { id: "overdue-toast" }
          );
        }

         if (overdue.length > 0 && pending.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 4000));
        }

        if (pending.length > 0) {
          await Promise.all(
            pending.map((task) =>
              task.tid
                ? updateTaskStatus(task.tid, "Pending", projectId, userId)
                : null
            )
          );
          toast.success(
            `📦 Moved ${pending.length} task${
              pending.length > 1 ? "s" : ""
            } to Pending`,
            { id: "pending-toast" }
          );
        }

        if (overdue.length > 0 || pending.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          toast.message("✅ Daily task status check complete.", {
            description: "Overdue → Backlog • Due today → Pending",
            duration: 13000,
          });
        }
      } catch (err) {
        toast.error("⚠️ Something went wrong while updating task statuses.");
      }
    };

    // Run immediately on mount
    moveTasks();

    // Schedule next run exactly at midnight

    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      moveTasks();
      setInterval(moveTasks, 24 * 60 * 60 * 1000); // Every 24 hours
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [projectId, userId]);
}
