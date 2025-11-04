import React from 'react'
import { Button } from '../ui/button'
import { RotateCcwIcon } from 'lucide-react'

const NoProject = ({ click }: { click: () => void }) => {
    return (
        <div className='flex items-center justify-center flex-col'>

            <img src="/Not-found.png" alt="" className='w-30 md:w-50' />
            <div className='flex items-center flex-col gap-2'>
                <p className='text-center font-bold text-lg text-muted-foreground'>No Results found!</p>
                <p className='text-xs md:text-sm text-muted-foreground'>We can't find any projects matching your search.</p>
                <Button onClick={click} className='bg-gray-500 mt-3 hover:bg-color-none cursor-pointer'>Reset filters <RotateCcwIcon /> </Button>
            </div>
        </div>
    )
}

export default NoProject