import Navbar from "@/components/client/Navbar";
import ProtectedRoute from "@/components/client/ProtectedRoute";
import DashboardContent from "@/components/client/DashboardContent";
import { getProjects } from "@/app/actions/getProjects";
import { getTasks } from "@/app/actions/getTask";

interface DashboardPageProps {
    params: Promise<{ uid: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const { uid } = await params
    const projects = await getProjects(uid);
    const projectsWithTaskCount = await Promise.all(
        projects.map(async (project) => {
            const res = await getTasks(uid, project.id);
            const taskCount = res.tasks?.length || 0;
            return { ...project, taskCount };
        })
    );

    const sortedProjects = projectsWithTaskCount.sort((a, b) => b.taskCount - a.taskCount);

    return (
        <ProtectedRoute>
            <div>
                <Navbar />
                <DashboardContent initialProjects={sortedProjects} />
            </div>
        </ProtectedRoute>
    )
}