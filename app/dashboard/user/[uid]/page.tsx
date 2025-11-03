import Navbar from "@/components/client/Navbar";
import ProtectedRoute from "@/components/client/ProtectedRoute";
import DashboardContent from "@/components/client/DashboardContent";
import { getProjects } from "@/app/actions/getProjects";

interface DashboardPageProps {
    params: Promise<{ uid: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const { uid } = await params
    const projects = await getProjects(uid);

    
    return (
        <ProtectedRoute>
            <div>
                <Navbar />
                <DashboardContent initialProjects={projects} />
            </div>
        </ProtectedRoute>
    )
}