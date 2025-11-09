import { Spinner } from "@/components/ui/spinner"

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden'>
        <Spinner className='size-8' />
    </div>
  )
}

export default Loading