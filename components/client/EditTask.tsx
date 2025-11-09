"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2Icon, Save, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TaskData } from "@/lib/type";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { updateTask } from "@/app/actions/updateTask";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Spinner } from "../ui/spinner";

const EditTask = ({ Task, projectId }: { Task: TaskData; projectId: string }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(Task.title);
    const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "None">(Task.priority || "None");
    const [dueDate, setDueDate] = useState<Date | undefined>(
        Task.dueDate ? new Date(Task.dueDate) : undefined
    );
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>(Task.tags || []);

    if (!user || !Task || !projectId) return null;

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const newTag = tagInput.trim()
        if (!newTag) return;

        if (tags.some(t => t.toLowerCase() === newTag.toLowerCase())) {
            toast.info("Tag already added");
            return;
        }

        setTags([...tags, newTag]);
        setTagInput("");
    };


    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title cannot be empty");
            return;
        }

        setLoading(true);

        const data = {
            title,
            priority,
            dueDate: dueDate ? dueDate.toISOString() : null,
            tags,
        };
        await new Promise(resolve => setTimeout(resolve, 500));

        const res = await updateTask(Task.tid!, projectId, user.uid, data);

        if (res?.success) {
            toast.success("Task updated successfully!");
            startTransition(() => {
                setOpen(false);
                setLoading(false);
                router.refresh();
            });
        } else {
            toast.error("Failed to update task. Try again later.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" className="cursor-pointer text-sky-500">
                                <Edit2Icon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Task</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] max-h-[85%] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="text-base md:text-xl">
                        Edit Task: {Task.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm leading-relaxed">
                        Update your task details like title, priority, due date, and tags.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="grid gap-4">
                        {/* Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title" className='text-sm md:text-base'>Task Title</Label>
                            <Input
                                className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base'
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                                tabIndex={-1}
                            />
                        </div>

                        {/* Priority */}
                        <div className="grid gap-2">
                            <Label className='text-sm md:text-base'>Priority</Label>
                            <RadioGroup
                                value={priority}
                                onValueChange={(value) => setPriority(value as "Low" | "Medium" | "High" | "None")}
                                className="flex gap-4"
                                tabIndex={-1}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="High" id="high" />
                                    <Label className='text-sm md:text-base' htmlFor="high">High</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Medium" id="medium" />
                                    <Label className='text-sm md:text-base' htmlFor="medium">Medium</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Low" id="low" />
                                    <Label className='text-sm md:text-base' htmlFor="low">Low</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Due Date */}
                        <div className="grid gap-2">
                            <Label className='text-sm md:text-base'>Due Date</Label>
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={setDueDate}
                                className="rounded-md border text-sm w-full"
                            />
                            {dueDate && (
                                <p className="text-xs text-gray-500">
                                    Selected: {format(dueDate, "PPP")}
                                </p>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="grid gap-2">
                            <Label className='text-sm md:text-base'>Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base'
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Press Enter to add tag"
                                    tabIndex={-1}
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(tag => (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-xs font-medium"
                                    >
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button className='text-xs md:text-sm cursor-pointer' variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">
                            {loading ? <><Spinner />Saving...</> : <><Save size={10} className="mr-1" /> Save</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTask;
