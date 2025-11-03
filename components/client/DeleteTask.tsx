'use client'

import { useState } from 'react'

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

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteTask } from '@/app/actions/deleteTask'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'

const DeleteTask = ({ taskId, projectId, title }: { taskId: string, projectId: string, title: string }) => {


    if (!projectId || !taskId) return null;
    const router = useRouter();

    const [loading, setloading] = useState(false)

    const handledeletetask = async () => {
        setloading(true);
        const toastId = toast.loading(`Deleting ${title}...`)
        const res = await deleteTask(projectId, taskId)
        if (res.success == true) {
            setloading(false);
            toast.success('Task Deleted', {
                description: `${title} is deleted successfully`,
                id: toastId
            })
            router.refresh()
        } else {
            toast.error('Task Deletion is failed! Try again later.')
        }
    }
    return (
        <AlertDialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" disabled={loading} className="cursor-pointer text-destructive"><Trash2 /></Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete Task </p>
                </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='leading-relaxed'>Are you sure you want to delete this task?</AlertDialogTitle>
                    <AlertDialogDescription className='leading-relaxed'>
                        This action cannot be undone and the task will be permanently removed from the project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handledeletetask} className='bg-destructive cursor-pointer'>Yes, Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTask