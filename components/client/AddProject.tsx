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
import { Textarea } from '../ui/textarea'
import { addProjectAction } from '@/app/actions/addProject'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const AddProject = () => {

    const { user } = useAuth();

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const [title, settile] = useState('');

    const [description, setdescription] = useState('');

    const [open, setOpen] = useState(false)

    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (!open) {
            settile('');
            setdescription('');
        }
    }, [open])

    if (!user) return null;

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
            toast.error("Both title and description are required");
            return;
        }

        setloading(true);
        const toastId = toast.loading(`Adding ${title}...`);
        await new Promise(resolve => setTimeout(resolve, 2500));
        const res = await addProjectAction(user.uid, title, description);
        if (res?.success) {
            startTransition(() => {
                setOpen(false);
                setloading(false);
                settile('');
                setdescription('');
            })
            toast.success('Project Added', {
                description: `${title} was successfully added.`,
                id: toastId
            });
            //router.refresh()
        } else {
            toast.error(`Failed to add ${title}. Try again later.`, { id: toastId });
        }
    }

    if (isDesktop) {

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer rounded-2xl md:rounded text-xs md:text-sm'>
                        <Plus /> New Project
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle className='text-base md:text-xl'>Add Your Project</DialogTitle>
                        <DialogDescription className='text-xs md:text-sm leading-relaxed'>
                            Enter your project name and a brief summary of what you plan to achieve.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlesubmit} autoComplete='off'>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="pname" className='text-sm md:text-base'>Project Name</Label>
                                <Input id="pname" name="pname" value={title} onChange={(e) => {
                                    settile(e.target.value)
                                }} className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' placeholder='Enter your project name' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className='text-sm md:text-base'>Project Description</Label>
                                <Textarea id="description" value={description} onChange={(e) => {
                                    setdescription(e.target.value)
                                }} className='placeholder:text-xs resize-none overflow-y-auto max-h-40 placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' name="description" placeholder='Enter project description' />
                            </div>
                        </div>
                        <DialogFooter className='mt-4'>
                            <DialogClose asChild>
                                <Button className='text-xs md:text-sm cursor-pointer' variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">{loading ? <><Spinner /> Submitting…</> : 'Submit'}</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button className='cursor-pointer rounded-2xl md:rounded text-xs md:text-sm'>
                        <Plus /> New Project
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-5">
                    <DrawerHeader>
                        <DrawerTitle className='text-base md:text-xl'>
                            Add Your Project
                        </DrawerTitle>
                        <DrawerDescription className='text-xs md:text-sm leading-relaxed'>
                            Enter your project name and a brief summary of what you plan to achieve.
                        </DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handlesubmit} autoComplete='off'>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="pname" className='text-sm md:text-base'>Project Name</Label>
                                <Input id="pname" name="pname" value={title} onChange={(e) => {
                                    settile(e.target.value)
                                }} className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' placeholder='Enter your project name' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className='text-sm md:text-base'>Project Description</Label>
                                <Textarea id="description" value={description} onChange={(e) => {
                                    setdescription(e.target.value)
                                }} className='placeholder:text-xs resize-none overflow-y-auto max-h-40 placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' name="description" placeholder='Enter project description' />
                            </div>
                        </div>
                        <DrawerFooter className='mt-4'>
                            <DrawerClose asChild>
                                <Button className='text-xs md:text-sm cursor-pointer' variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">{loading ? <><Spinner /> Submitting…</> : 'Submit'}</Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        )
    }
}

export default AddProject
