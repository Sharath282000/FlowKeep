'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { TaskData } from "@/lib/type";
import { CheckCircle2, Redo2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { DueBadge } from "./Duebadge";
import { toast } from 'sonner'

//import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { motion } from 'framer-motion'
import { useTimeAgo } from '@/hooks/useTimeago'
import { updateTaskStatus } from '@/app/actions/updateTaskStatus'
import { STATUS_COLUMNS } from '../server/TasksList'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import { capitalizeWords, getborderclass, getPriorityClass } from '@/lib/utils/functions'

const TaskItem = ({ task, projectId }: { task: TaskData, projectId: string }) => {
    const taskId = task.tid;
    const userId = task.userId;

    const status = task.status

    const [dropdownvalue, setdropdownvalue] = useState<string>(status)

    const [loading,setloading] = useState(false)

    if (!taskId || !userId) return null
    // const router = useRouter()

    const handleMarkComplete = async () => {
        if (task.status === "Completed") {
            toast.info("Task is already completed.");
            return;
        }

        setloading(true);
        const res = await updateTaskStatus(taskId, "Completed", projectId, userId);
        if (res.success) {
            toast.success(`"${task.title}" marked as completed 🎉`);
            //router.refresh();
        } else {
            toast.error("Failed to update status");
        }
        setloading(false);
    };

    const handlereverseComplete = async () => {
        if (task.status === "New") {
            toast.info("Task is already in New!");
            return;
        }

        setloading(true);
        const res = await updateTaskStatus(taskId, "New", projectId, userId);
        if (res.success) {
            toast.success(task.title, {
                description: `Is now moved to New state`,
                duration: 4000
            });
            //router.refresh();
        } else {
            toast.error("Failed to update status");
        }
        setloading(false);
    }

    const handlestatus = async (value: string) => {
        setdropdownvalue(value);
        if (value === task.status) return;

        setloading(true);
        const res = await updateTaskStatus(taskId, value, projectId, userId);
        if (res.success) {
            if (value === "Completed") {
                toast.success(`"${task.title}" marked as completed 🎉`);
            } else {
                toast.success(task.title, {
                    description: `Moved to ${value} state`,
                    duration: 4000
                });
            }
            //router.refresh();
        } else {
            toast.error("Failed to update status");
        }
        setloading(false);
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
        >
            <Card className={`w-full mb-3 max-w-full bg-muted/5 cursor-pointer shadow-sm border border-l-4 ${getborderclass(task.priority)}`}>
                <CardHeader>
                    <div className="w-full flex flex-row items-center justify-between">
                        {task?.createdAt && !task.updatedAt && (

                            <span className="text-xs text-muted-foreground">
                                Created {useTimeAgo(task.createdAt)}
                            </span>

                        )}
                        {task?.updatedAt && (

                            <span className="text-xs text-muted-foreground">
                                Updated {useTimeAgo(task.updatedAt)}
                            </span>

                        )}
                        {/* priority div */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`px-2 rounded-full h-4 w-4 ${getPriorityClass(task.priority)}`}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{task.priority} priority</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <CardTitle className='leading-relaxed'>{capitalizeWords(task.title)}</CardTitle>
                    <div className="w-full flex flew-row gap-1.5">
                        {task.status !== 'Completed' ? <div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" onClick={handleMarkComplete} className="cursor-pointer text-green-500"><CheckCircle2 /></Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mark as Complete</p>
                                </TooltipContent>
                            </Tooltip>
                        </div> : <div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" onClick={handlereverseComplete} className="cursor-pointer text-cyan-800"><Redo2 /></Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Redo Complete</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>}
                        {task.status !== 'Completed' && <div>
                            <EditTask Task={task} projectId={projectId} />
                        </div>}
                        <div>
                            <DeleteTask projectId={projectId} taskId={taskId} title={task.title} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {task.tags && task.tags.length > 0 ? (
                            task.tags.map((tag) => (
                                <Badge variant='outline' className='text-gray-500' key={tag}>
                                    #{capitalizeWords(tag)}
                                </Badge>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        {task.status !== 'Completed' ? <DueBadge dueDate={task?.dueDate ?? null} /> : <span className="text-xs text-muted-foreground">
                            {task?.completedAt && (
                                <span className="text-xs font-bold text-muted-foreground shadow p-1.5 rounded-lg">
                                    Completed -  {useTimeAgo(task.completedAt)}
                                </span>

                            )}
                        </span>}
                        {task.status !== 'Completed' && <div>
                            <Select
                                disabled={loading}
                                value={dropdownvalue}
                                onValueChange={handlestatus}
                            >
                                <SelectTrigger className={`w-full shadow-sm text-xs cursor-pointer`}>
                                    <SelectValue placeholder="Move to" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_COLUMNS.map((t) => (
                                        <SelectItem
                                            key={t.id}
                                            value={t.title}
                                            className={`text-xs cursor-pointer ${t.title === task.status ? "opacity-50" : ""
                                                }`}
                                            disabled={t.title === task.status}
                                        >
                                            {t.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>}

                    </div>

                </CardHeader>
            </Card>
            <Separator className='my-4' />
        </motion.div>

    )
}

export default TaskItem