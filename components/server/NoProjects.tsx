import { Folder } from "lucide-react"

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

import AddProject from '../client/AddProject'

const NoProjects = () => {
    
    return (
        <div className='w-full flex items-center justify-center'>
            <Empty className='shadow-sm rounded-lg'>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                       <Folder />
                    </EmptyMedia>
                    <EmptyTitle>Every great journey starts with a single project</EmptyTitle>
                    <EmptyDescription>
                        Begin building your focus system - create your first project and start bringing your ideas to life.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <AddProject />
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    )
}

export default NoProjects