

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  taskCount?: number;
  progress?: number;
  completedTaskCount?: number;
};

export interface TaskData {
  tid?: string; // ✅ optional
  title: string;
  createdAt?: string | null;
  completedAt?: string | null;
  updatedAt?: string | null;
  status:
    | "Pending"
    | "In Progress"
    | "Completed"
    | "Backlog"
    | "On Hold"
    | "New";
  priority: "Low" | "Medium" | "High" | "None";
  tags?: string[];
  dueDate?: string | null;
  projectId: string;
  userId: string;
  priorityRank?:number;
}
