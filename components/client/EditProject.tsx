'use client'

import React, { useState, useTransition } from 'react'

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
import { Edit2, Save } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Project } from '@/lib/type'
import { toast } from 'sonner'
import { updateProject } from '@/app/actions/updateProject'
import { TooltipTrigger, Tooltip, TooltipContent } from '../ui/tooltip'
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

const EditProject = ({ project }: { project: Project }) => {

    const { user } = useAuth();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [isPending, startTransition] = useTransition()

    const [title, settile] = useState(project.title);

    const [description, setdescription] = useState(project.description);

    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);

    if (!user) return null;

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
            toast.error("Both title and description are required");
            return;
        }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const res = await updateProject(project.id, user.uid, { title, description })

        if (res?.success) {
            startTransition(() => {
                setOpen(false);
                setLoading(false);
            })
            toast.success('Project updated', {
                description: `${title} was successfully updated.`,
            });
        } else {
            toast.error(`Failed to update ${title}. Try again later.`);
        }
    };

    if (isDesktop) {

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <Tooltip>
                    <DialogTrigger asChild>
                        <div>
                            <TooltipTrigger asChild>
                                <Edit2 className="h-4 w-4 md:h-5 md:w-5 text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Project</p>
                            </TooltipContent>
                        </div>
                    </DialogTrigger>
                </Tooltip>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-base md:text-xl'>Edit {project.title}</DialogTitle>
                        <DialogDescription className='text-xs md:text-sm leading-relaxed'>
                            Review your project details. Ensure the title is correct and the description accurately captures the current objective.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlesubmit} autoComplete='off'>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="pname" className='text-sm md:text-base'>Project Name</Label>
                                <Input id="pname" tabIndex={-1} name="pname" defaultValue={project.title} onChange={(e) => {
                                    settile(e.target.value)
                                }} className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' placeholder='Enter your project name' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className='text-sm md:text-base'>Project Description</Label>
                                <Textarea id="description" tabIndex={-1} defaultValue={project.description} onChange={(e) => {
                                    setdescription(e.target.value)
                                }} className='placeholder:text-xs resize-none overflow-y-auto max-h-40 placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' name="description" placeholder='Enter project description' />
                            </div>
                        </div>
                        <DialogFooter className='mt-4'>
                            <DialogClose asChild>
                                <Button className='text-xs md:text-sm cursor-pointer' variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">{loading ? <><Spinner />Saving...</> : <><Save size={10} className="mr-1" /> Save</>}</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <Tooltip>
                    <DrawerTrigger asChild>
                        <div>
                            <TooltipTrigger asChild>
                                <Edit2 className="h-4 w-4 md:h-5 md:w-5 text-primary cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Project</p>
                            </TooltipContent>
                        </div>
                    </DrawerTrigger>
                </Tooltip>
                <DrawerContent className="px-4" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
                    <div className="max-h-[70vh] overflow-y-auto pr-1">
                        <DrawerHeader>
                            <DrawerTitle className='text-base md:text-xl'>Edit {project.title}
                            </DrawerTitle>
                            <DrawerDescription className='text-xs md:text-sm leading-relaxed'>
                                Review your project details. Ensure the title is correct and the description accurately captures the current objective.
                            </DrawerDescription>
                        </DrawerHeader>
                        <form onSubmit={handlesubmit} autoComplete='off'>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="pname" className='text-sm md:text-base'>Project Name</Label>
                                    <Input id="pname" tabIndex={-1} name="pname" defaultValue={project.title} onChange={(e) => {
                                        settile(e.target.value)
                                    }} className='placeholder:text-xs placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' placeholder='Enter your project name' />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description" className='text-sm md:text-base'>Project Description</Label>
                                    <Textarea id="description" tabIndex={-1} defaultValue={project.description} onChange={(e) => {
                                        setdescription(e.target.value)
                                    }} className='placeholder:text-xs resize-none overflow-y-auto max-h-40 placeholder:text-gray-400 md:placeholder:text-sm text-sm md:text-base' name="description" placeholder='Enter project description' />
                                </div>
                            </div>
                            <DrawerFooter className='mt-4'>
                                <DrawerClose asChild>
                                    <Button className='text-xs md:text-sm cursor-pointer' variant="outline">Cancel</Button>
                                </DrawerClose>
                                <Button className='text-xs md:text-sm cursor-pointer' disabled={loading} type="submit">{loading ? <><Spinner />Saving...</> : <><Save size={10} className="mr-1" /> Save</>}</Button>
                            </DrawerFooter>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }
}

export default EditProject