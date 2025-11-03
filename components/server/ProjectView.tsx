import ProjectDetails from "./ProjectDetails";
import TasksList from "./TasksList";
import { Project, TaskData } from "@/lib/type";
import NoTasks from "./NoTasks";

export default function ProjectClientView({
  project,
  userId,
  tasks,
  progress,
}: {
  project: Project;
  userId: string | undefined;
  tasks: TaskData[];
  progress: number;
}) {

  return (
    <>
      <ProjectDetails
        project={project}
        userId={userId}
        progress={progress} // ✅ renamed prop
      />
      {
        tasks.length > 0 ? <TasksList
          projectId={project.id}
          tasks={tasks}
        /> : <NoTasks />
      }
    </>
  );
}
