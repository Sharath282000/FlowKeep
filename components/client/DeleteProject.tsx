'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Project } from '@/lib/type'
import { Trash2 } from 'lucide-react'
import { deleteProject } from '@/app/actions/deleteProject'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { startTransition, useState } from "react"
import { Spinner } from "../ui/spinner"

const DeleteProject = ({ project, userId }: { project: Project, userId: string | undefined }) => {
    if (!userId) return null;

    const projectId = project.id;
    const router = useRouter();

    const [loading, setloading] = useState(false);
    const [open, setopen] = useState(false);

    const handledelete = async () => {
        try {
            setloading(true);
            const toastId = toast.loading(`Deleting ${project.title}...`);
            await new Promise(resolve => setTimeout(resolve, 2500));
            const res = await deleteProject(projectId, userId);
            if (res?.success) {
                startTransition(() => {
                    setopen(false);
                    setloading(false);
                })
                toast.success('Project Deleted', {
                    description: `${project.title} was successfully deleted.`,
                    id: toastId,
                });
                router.push(`/dashboard/user/${userId}`);
            } else {
                toast.error('Something went wrong, please try again', { id: toastId })
            }
        } catch (e) {
            toast.error('Something went wrong, please try again')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setopen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-destructive cursor-pointer" />
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Project</p>
                </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='leading-relaxed'>Are you absolutely sure to delete {project.title}</AlertDialogTitle>
                    <AlertDialogDescription className='leading-relaxed'>
                        This action cannot be undone. The project and all its associated data will be permanently removed from our database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.preventDefault()
                        handledelete()
                    }} disabled={loading} className='bg-destructive cursor-pointer'>{loading ? <><Spinner />Deleting...</> : "Yes, Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProject