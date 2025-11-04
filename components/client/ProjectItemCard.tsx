'use client'

import React from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { Project } from "@/lib/type";
import Link from "next/link";
import { useTimeAgo } from "@/hooks/useTimeago";
import { motion } from "framer-motion";
import { useTaskStats } from "@/hooks/useTaskStats";
import { Badge } from '../ui/badge';
import { Clock, LaughIcon } from 'lucide-react';
import { capitalizefirstletter, capitalizeWords, getProgressColor } from '../../lib/utils/functions';

const ProjectItemCard = ({ project, userId }: { project: Project, userId: string | undefined }) => {


    const projecId = project.id

    const formattedDescription = capitalizefirstletter(project.description);

    if (!projecId || !userId) return null

    const { progress, total, completed, duetoday } = useTaskStats(projecId)
    return (
        <Card className="text-center max-w-sm border shadow-2xs flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="text-left font-bold leading-relaxed">
                    {capitalizeWords(project.title)}
                </CardTitle>
                {project?.createdAt && (
                    <CardAction>
                        <span className="text-xs text-muted-foreground">
                            {useTimeAgo(project.createdAt)}
                        </span>
                    </CardAction>
                )}
                <CardDescription className="text-left wrap-break-word line-clamp-4 leading-relaxed text-sm">
                    {project.description.length > 150
                        ? formattedDescription.slice(0, 150) + "..."
                        : formattedDescription}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Smooth animated Progress bar */}
                <motion.div
                    key={progress} // triggers animation when value changes
                    initial={{ opacity: 0, scaleX: 0.95 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="origin-left"
                >
                    <Progress
                        value={progress}
                        className={getProgressColor(progress)}
                        style={{
                            transition: "width 0.6s ease-in-out", // smooth fill motion
                        }}
                    />
                </motion.div>

                <motion.p
                    key={`p-${progress}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm mt-1"
                >
                    {progress}%
                </motion.p>

                <p className="mt-2 text-xs text-muted-foreground">
                    {total === 0
                        ? "No tasks"
                        : progress === 100
                            ? "All tasks completed 🎉"
                            : `${completed}/${total} tasks completed`}
                </p>

                {duetoday !== 0 ? <Badge className='mt-2 text-xs bg-destructive text-muted'>
                    <Clock /> {duetoday} {duetoday > 1 ? "tasks are" : "task is"} due today
                </Badge> : progress !== 100 && total !== 0 && <Badge className='mt-2 text-xs bg-green-700 text-muted'>
                    <LaughIcon /> No due tasks today
                </Badge>}
            </CardContent>

            <CardFooter className="mt-auto flex justify-center">
                <Link
                    href={`/dashboard/user/${userId}/project/${project.id}`}
                    className="w-full text-white bg-primary p-3 cursor-pointer rounded-2xl text-xs md:text-sm"
                >
                    View Project
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ProjectItemCard