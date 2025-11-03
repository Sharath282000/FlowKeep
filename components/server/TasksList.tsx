import { TaskData } from "@/lib/type";
import TaskClient from "../client/TaskClient";

export const STATUS_COLUMNS = [
  { id: 'New', title: 'New', color: 'border-l-gray-500' },
  { id: 'In Progress', title: 'In Progress', color: 'border-l-secondary' },
  { id: 'Pending', title: 'Pending', color: 'border-l-red-500' },
  { id: 'Backlog', title: 'Backlog', color: 'border-1-black' },
  { id: 'On Hold', title: 'On Hold', color: 'border-l-yellow-500' },
  { id: 'Completed', title: 'Completed', color: 'border-l-green-500' },
];

export default function ProjectTasksPage({ projectId, tasks }: { projectId: string, tasks: TaskData[] }) {

  return (
    <div className="mt-5">
      <div className="mx-4 mb-10 xl:mx-auto xl:max-w-7xl">
        <TaskClient projectId={projectId} tasks={tasks} />
      </div>
    </div>
  );
}