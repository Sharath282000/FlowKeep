'use client'

import React, { useEffect, useState, useTransition } from 'react'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import CalendarInput from './CalendarInput'
import { Priority, PrioritySelect } from '../server/PrioritySelect'
import { TagInput } from '../server/TagInput'
import { toast } from 'sonner'
import { addTask } from '@/app/actions/addTask'

const AddTask = ({ projectId, projectTitle }: { projectId: string, projectTitle: string }) => {

    const { user } = useAuth();

    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const [title, settile] = useState('');

    // const [description, setdescription] = useState('');

    const [dueDate, setDueDate] = useState<Date | undefined>(new Date())

    const [priority, setPriority] = useState<Priority>("Low")

    const [tags, setTags] = useState<string[]>([])

    const [open, setOpen] = useState(false)

    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (!open) {
            settile("")
            //setdescription("")
            setPriority("Low")
            setTags([])
            setDueDate(new Date())
        }
    }, [open])

    if (!user) return null;

    //const maxchar = 150;

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error("Task Title is required!");
            return;
        }
        setloading(false);
        const toastId = toast.loading(`Adding ${title}...`);
        const res = await addTask({
            title,
            projectId,
            userId: user.uid,
            priority,
            status: "New",
            dueDate: dueDate?.toDateString(),
            tags,
        })
        if (res?.success) {
            startTransition(() => {
                setOpen(false)
            })
            toast.success('Task Added', {
                description: `${title} was successfully added.`,
                id: toastId
            });
            router.refresh()
        } else {
            toast.error(`Failed to add ${title}. Try again later.`, { id: toastId });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='cursor-pointer mb-3 rounded-2xl md:rounded text-xs md:text-sm'>
                    <Plus /> New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[85%] md:max-h-full md:overflow-hidden overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className='text-base md:text-xl'>Add Your Task</DialogTitle>
                    <DialogDescription className='text-xs md:text-sm leading-relaxed'>
                        What's the next step? Add a clear action item to your board - <strong className='leading-relaxed'>{projectTitle}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlesubmit} autoComplete='off'>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="tname" className='text-sm md:text-base'>Task Title</Label>
                            <Input id="tname" name="tname" value={title} onChange={(e) => {
                                settile(e.target.value)
                            }} className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' placeholder='Enter Task Title' />
                        </div>

                        <CalendarInput date={dueDate} setDate={setDueDate} />
                        <PrioritySelect priority={priority} setPriority={setPriority} />
                        <TagInput tags={tags} setTags={setTags} />
                    </div>
                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <Button className='text-xs md:text-sm cursor-pointer' variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask