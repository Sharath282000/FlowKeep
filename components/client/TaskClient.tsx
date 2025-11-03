'use client'

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react'

import { STATUS_COLUMNS } from '../server/TasksList';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import TaskItem from './TaskItem';
import { Badge } from '../ui/badge';
import { TaskData } from '@/lib/type';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input';
import { AlertTriangle, CalendarCheck, CalendarIcon, CircleCheckBig, ClipboardList, Flag, FunnelX, OctagonX, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Popover } from '../ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { useAuth } from '@/context/AuthContext';
import { useTaskFilter } from '@/hooks/useTaskFilter';
import { CountBadge } from './CountBadges';
import { useTaskStatus } from '@/hooks/useTaskStatus';


const TaskClient = ({ projectId, tasks }: { projectId: string, tasks: TaskData[] }) => {
    const { user } = useAuth()
    const userId: string | undefined = user?.uid
    useTaskStatus({ projectId, userId });
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTag, setSelectedTag] = useState("All");
    const [status, setstatus] = useState("All")
    const tags: string[] = Array.from(
        new Set(tasks.flatMap(task => task.tags || []))
    );

    const [now, setnow] = useState(new Date());
    const [open, setopen] = useState(false);
    const [activeCardFilter, setActiveCardFilter] = useState<"All" | "High" | "Medium" | "Low" | "Overdue" | "DueToday" | "Completed">("All");

    useEffect(() => {
        const interval = setInterval(() => {
            setnow(new Date())
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    if (!projectId || !userId) return null

    const filterTasks = useTaskFilter({
        tasks,
        searchTerm,
        selectedPriority,
        selectedTag,
        selectedDate,
        status,
        activeCardFilter,
    });

    const priorityCount = selectedPriority === "All" ? '' : filterTasks.filter(t => t.priority === selectedPriority).length
    const statusCount = status === "All" ? '' : filterTasks.filter(t => t.status === status).length
    const tagscount = selectedTag === 'All' ? '' : filterTasks.filter(t => t.tags?.includes(selectedTag)).length

    const searchcount = searchTerm ? filterTasks.length : '';
    const countofduedate = filterTasks.filter(t => {
        if (!t.dueDate || !selectedDate) return false;

        const due = new Date(t.dueDate)
        const selected = new Date(selectedDate);
        due.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0)
        return due.getTime() === selected.getTime();
    }).length

    const columns = useMemo(() => {
        return STATUS_COLUMNS.map((column) => {
            const columnTasks = filterTasks.filter((t) => t.status === column.id);

            return (
                <Card
                    key={column.id}
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-card shadow-xs flex flex-col"
                >
                    <CardHeader className="p-4 border-b">
                        <CardTitle className="text-sm md:text-base font-semibold flex justify-between items-center">
                            {column.title}
                            <Badge variant="default">{columnTasks.length}</Badge>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-3">
                        {columnTasks.length > 0 ? (
                            columnTasks.map((t) => (
                                <TaskItem key={t.tid} task={t} projectId={t.projectId} />
                            ))
                        ) : (
                            <div className="text-center text-sm text-muted-foreground pt-4">
                                You have Empty task here!
                            </div>
                        )}
                    </CardContent>
                </Card>
            );
        });
    }, [filterTasks]);

    return (
        <div className='mx-0 px-0 xl:mx-4'>
            <div className="mt-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 w-full justify-center items-center gap-4 mb-6">
                    {/* total tasks */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("All")}
                        className={`flex flex-col items-center cursor-pointer justify-center w-full p-6 rounded-xl bg-slate-700 text-white shadow-lg shadow-slate-700/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <ClipboardList className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">Total Tasks</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.length}
                        </motion.span>
                    </motion.div>
                    {/* High Priority */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("High")}
                        className={`flex flex-col items-center cursor-pointer ${activeCardFilter === "High" ? "ring-2 ring-black ring-offset-2 ring-offset-red-600" : ""} justify-center w-full p-6 rounded-xl bg-destructive text-white shadow-lg shadow-destructive/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Flag className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">High Priority</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => t.priority === "High" && t.status !== "Completed").length}
                        </motion.span>
                    </motion.div>

                    {/* Medium Priority */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("Medium")}
                        className={`flex flex-col items-center cursor-pointer ${activeCardFilter === 'Medium' ? "right-2 ring-black ring-offset-2 ring-offset-yellow-800" : ""} justify-center w-full p-6 rounded-xl bg-yellow-500 text-white shadow-lg shadow-yellow-500/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">Medium Priority</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => t.priority === "Medium" && t.status !== "Completed").length}
                        </motion.span>
                    </motion.div>

                    {/* Low Priority */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("Low")}
                        className={`flex flex-col items-center cursor-pointer ${activeCardFilter === 'Low' ? "right-2 ring-black ring-offset-2 ring-offset-green-800" : ""} justify-center w-full p-6 rounded-xl bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <CircleCheckBig className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">Low Priority</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => t.priority === "Low" && t.status !== "Completed").length}
                        </motion.span>
                    </motion.div>
                    {/* overdue tasks */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("Overdue")}
                        className={`flex flex-col items-center cursor-pointer ${activeCardFilter === 'Overdue' ? "right-2 ring-black ring-offset-2 ring-offset-red-950" : ""} justify-center w-full p-6 rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <OctagonX className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">Overdue Tasks</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => {
                                if (!t.dueDate || t.status === 'Completed') return false;

                                const due = new Date(t.dueDate);
                                const today = new Date(now);
                                due.setHours(0, 0, 0, 0);
                                today.setHours(0, 0, 0, 0);
                                return due < today;
                            }).length}
                        </motion.span>
                    </motion.div>
                    {/* due today */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("DueToday")}
                        className={`flex flex-col items-center cursor-pointer justify-center ${activeCardFilter === "DueToday" && "right-2 ring-black ring-offset-2 ring-offset-sky-900"} w-full p-6 rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="w-5 h-5  opacity-90" />
                            <h2 className="text-base font-semibold">Due Today</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => {
                                if (!t.dueDate || t.status === 'Completed') return false;

                                const due = new Date(t.dueDate);
                                const today = new Date(now);
                                due.setHours(0, 0, 0, 0);
                                today.setHours(0, 0, 0, 0);
                                return due.getTime() === today.getTime();
                            }).length}
                        </motion.span>
                    </motion.div>
                    {/* Completed */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCardFilter("Completed")}
                        className={`flex flex-col items-center cursor-pointer ${activeCardFilter === 'Completed' ? "ring-2 ring-black ring-offset-2 ring-offset-green-900" : ""} justify-center w-full p-6 rounded-xl bg-green-800 text-white shadow-lg shadow-neutral-500/30 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="w-5 h-5 opacity-90" />
                            <h2 className="text-base font-semibold">Completed</h2>
                        </div>
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
                        >
                            {tasks.filter(t => t.status === "Completed").length}
                        </motion.span>
                    </motion.div>
                </div>
                <div className="bg-muted/20 p-4 rounded-xl shadow-xs border space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Filters</h3>

                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        {/* Search */}
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 text-sm"
                            />
                            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                            {searchcount !== 0 && searchcount && (
                                <CountBadge count={searchcount ? searchcount : 0} />
                            )}
                        </div>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className='relative'>
                                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                                    <SelectTrigger className="text-sm w-full">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectGroup>
                                        <SelectContent>
                                            <SelectLabel>Priority</SelectLabel>
                                            <SelectItem value="All">All</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </SelectGroup>
                                </Select>
                                {selectedPriority !== "All" && (
                                    <CountBadge count={priorityCount ?? 0} />
                                )}
                            </div>


                            {/* Status */}
                            <div className='relative'>
                                <Select value={status} onValueChange={setstatus}>
                                    <SelectTrigger className="text-sm w-full">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectGroup>
                                        <SelectContent>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value='All'>All</SelectItem>
                                            {STATUS_COLUMNS.map((col) => (
                                                <SelectItem key={col.id} value={col.id}>
                                                    {col.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectGroup>

                                </Select>
                                {status !== "All" && (
                                    <CountBadge count={statusCount ?? 0} />
                                )}
                            </div>


                            {/* tags select */}

                            <div className='relative'>
                                <Select value={selectedTag} onValueChange={setSelectedTag}>
                                    <SelectTrigger className="text-sm w-full">
                                        <SelectValue placeholder="Tags" />
                                    </SelectTrigger>
                                    <SelectGroup>
                                        <SelectContent className='max-h-68'>
                                            <SelectLabel>Tags</SelectLabel>
                                            <SelectItem value='All'>All</SelectItem>
                                            {tags.length > 0 ? (
                                                tags.map((tag) => (
                                                    <SelectItem key={tag} value={tag}>
                                                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>
                                                    No Tags
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </SelectGroup>

                                </Select>

                                {selectedTag !== "All" && (
                                    <CountBadge count={tagscount ?? 0} />
                                )}
                            </div>



                            {/* Due Date */}
                            <div className="w-full md:w-40 relative">
                                <Popover open={open} onOpenChange={setopen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => setopen(!open)}
                                            className={`w-full justify-start cursor-pointer text-left font-normal overflow-hidden text-ellipsis whitespace-nowrap ${!selectedDate && "text-muted-foreground"
                                                }`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                            {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Due Date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate ?? undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setSelectedDate(date)
                                                    setopen(false) // 👈 close popover after selecting
                                                }
                                            }}
                                            defaultMonth={new Date()}
                                            className="[&_.rdp-day]:cursor-pointer"
                                        />
                                    </PopoverContent>
                                </Popover>
                                {countofduedate > 0 && (
                                    <CountBadge count={countofduedate ?? 0} />
                                )}
                            </div>


                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='ghost' className='cursor-pointer' onClick={() => {
                                        setSearchTerm('')
                                        setSelectedDate(null);
                                        setSelectedPriority('All')
                                        setSelectedTag('All')
                                        setstatus('All')
                                        setActiveCardFilter("All")
                                    }}>
                                        <FunnelX />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Reset Filters
                                </TooltipContent>
                            </Tooltip>

                        </div>
                        {/* Priority */}

                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {columns}
            </motion.div>
        </div>

    )
}

export default TaskClient