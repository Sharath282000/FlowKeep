import { getProject } from "@/app/actions/getProjects";
import { getTasks } from "@/app/actions/getTask";
import Navbar from "@/components/client/Navbar";
import ProjectClientView from "@/components/server/ProjectView";
import ProtectedRoute from "@/components/client/ProtectedRoute";
import { notFound } from "next/navigation";

interface ProjectDetailsProps {
  params: { uid: string; pid: string };
}

export default async function ProjectPage({ params }: ProjectDetailsProps) {
  const { uid, pid } = await params;
  const project = await getProject(pid, uid);
  const res = await getTasks(uid, pid);
  const tasks = res.tasks ?? [];

  if (!project) return notFound();

  // ✅ Calculate task count and progress
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const progress = total > 0 ? (completed / total) * 100 : 0;
 

  return (
    <ProtectedRoute>
      <Navbar />
      <ProjectClientView
        project={project}
        userId={uid}
        tasks={tasks}
        progress={progress}
      />
    </ProtectedRoute>
  );
}
