import React from 'react'

const Footer = () => {
    const today = new Date()
    return (
        <div className=' w-full flex items-center flex-col justify-center text-center mt-auto py-5'>
            <p className='text-xs md:text-sm text-muted-foreground'>© FlowKeep {today.getFullYear()}. LyFn Technologies.</p>
            <p className='text-xs md:text-sm text-muted-foreground'>Developed and Owned by Sharath</p>
        </div>
    )
}

export default Footer