"use client"

import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Download } from 'lucide-react'
import { TaskData } from '@/lib/type'
import { formatReadableDate } from '@/lib/utils/functions'
import { toast } from 'sonner'

const DownloadTasks = ({ tasks }: { tasks: TaskData[] }) => {
    const [loading, setloading] = useState(false)

    const handledownlaod = async () => {
        setloading(true);
        if (!tasks.length) return
        try {
            const header = ["Created At", "Title", "Due Date", "Priority", "Status", "Updated At", "Completed At"]
            const rows = tasks.map(task => [
                formatReadableDate(task.createdAt) || "",
                task.title || "",
                formatReadableDate(task.dueDate) || "",
                task.priority || "",
                task.status || "",
                formatReadableDate(task.updatedAt) || "",
                formatReadableDate(task.completedAt) || ""
            ])


            const csvContent = "\uFEFF" + [header, ...rows].map(row => row.map(value => `"${value}"`).join(",")).join("\n")

            const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
            });

            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            const formattedDate = new Date().toISOString().split("T")[0];
            const fileName = `FlowKeep_Tasks_Export_${formattedDate}.csv`;
            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success("Export completed", {
                description: `Your file "${fileName}" has been downloaded successfully.`,
            })

        } catch (e) {
            //console.log(e)
            toast.error("Export Failed", {
                description: `Your tasks export have been failed! Try again later.`,
            })
        } finally {
            setloading(false)
        }
    }
    return (
        <div>
            <Tooltip>
                <TooltipTrigger asChild >
                    <Button variant='default' disabled={loading} onClick={handledownlaod} className='cursor-pointer hover:bg-color-none'>
                        <Download />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Extract All Tasks
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default DownloadTasks