"use client";

import { TaskData } from "@/lib/type";
import { useMemo } from "react";

export function useTaskFilter({
  tasks,
  searchTerm,
  selectedPriority,
  selectedTag,
  selectedDate,
  status,
  activeCardFilter,
}: {
  tasks: TaskData[];
  searchTerm: string;
  selectedPriority: string;
  selectedTag: string;
  selectedDate: Date | null;
  status: string;
  activeCardFilter: string;
}) {
  // --- Convert date to local YYYY-MM-DD format ---
  function toLocalYMD(d: Date | string | undefined | null): string | null {
    if (!d) return null;
    const dt = typeof d === "string" ? new Date(d) : d;
    // use local components (avoid toISOString)
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  const selectedYMD = selectedDate ? toLocalYMD(selectedDate) : null;

  // --- Main Filtering Logic ---

  const filterTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter

      const matchsearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase());

      // Priority filter

      const matchpriority =
        selectedPriority === "All" || task.priority == selectedPriority;

      // Tag filter

      const matchtag = selectedTag == "All" || task.tags?.includes(selectedTag);

      // Date filter

      const taskYMD = toLocalYMD(task.dueDate); // if task.dueDate is a string Date, helper covers it
      const matchesDate = !selectedYMD || taskYMD === selectedYMD;

      // 📋 Status filter
      const matchstatus = status === "All" || task.status === status;

      // Active card filter (special quick filters)
      let matchards = true;

      if (activeCardFilter === "High") {
        matchards = task.priority === "High" && task.status !== "Completed";
      } else if (activeCardFilter === "Medium") {
        matchards = task.priority === "Medium" && task.status !== "Completed";
      } else if (activeCardFilter === "Low") {
        matchards = task.priority === "Low" && task.status !== "Completed";
      } else if (activeCardFilter === "Completed") {
        matchards = task.status === "Completed";
      } else if (activeCardFilter === "DueToday") {
        if (!task.dueDate) {
          return false;
        } else {
          const due = new Date(task.dueDate);
          const now = new Date();

          due.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);
          return due.getTime() === now.getTime() && task.status !== "Completed";
        }
      } else if (activeCardFilter === "Overdue") {
        if (!task.dueDate) {
          return false;
        } else {
          const due = new Date(task.dueDate);
          const now = new Date();

          due.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);

          return due.getTime() < now.getTime() && task.status !== "Completed";
        }
      }

      return (
        matchsearch &&
        matchpriority &&
        matchtag &&
        matchesDate &&
        matchstatus &&
        matchards
      );
    });
  }, [
    tasks,
    searchTerm,
    selectedPriority,
    selectedTag,
    selectedDate,
    status,
    activeCardFilter,
  ]);
  return filterTasks;
}
