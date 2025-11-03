

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

const LogoutAlert = ({ logout }: { logout: () => Promise<void> }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="cursor-pointer shadow-none rounded-none md:shadow md:rounded-full">
                    <LogOut />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Time to take a break?</AlertDialogTitle>
                    <AlertDialogDescription>
                         You’ll be logged out, but your productivity awaits next time!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='cursor-pointer' onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutAlert