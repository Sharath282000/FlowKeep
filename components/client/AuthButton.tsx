'use client'

import { LayoutDashboardIcon, LogIn } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/context/AuthContext'

import { Skeleton } from '../ui/skeleton'

const AuthButton = () => {
    const { user, loading } = useAuth();
    //const [showSkeleton, setShowSkeleton] = useState(true);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">

                {/* Button Skeleton */}
                <div className="w-full md:w-75 py-2.5 flex items-center justify-center bg-gray-200 gap-2 rounded-2xl">
                    <Skeleton className="h-5 w-[100px] rounded-md bg-gray-200" /> {/* Text placeholder */}
                </div>

                {/* Subtitle Skeleton */}
                <Skeleton className="h-4 w-[250px] bg-gray-200 rounded-md mt-4" />
            </div>
        )
    }
    if (user) {
        return (
            <div className="flex flex-col items-center justify-center">
                <Link
                    href={`/dashboard/user/${user.uid}`}
                    className="w-full text-sm md:text-base md:w-75 py-2.5  text-white bg-primary rounded-2xl font-bold"
                >
                    <span className="flex items-center justify-center gap-2"><LayoutDashboardIcon />Dashboard</span>
                </Link>
                <p className="text-slate-500 text-sm md:text-base mt-4">
                    See your tasks and keep building momentum!
                </p>
                <div className="mt-3">
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-xl"
                    >
                        📘 Read Docs
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <Link
                href="/login"
                className="w-full text-sm md:text-base md:w-75 py-2.5  text-white bg-primary rounded-2xl font-bold"
            >
                <span className="flex items-center justify-center gap-2"><LogIn /> Login</span>
            </Link>
            <p className="text-slate-500 text-sm md:text-base mt-4">
                Be part of a growing community of focused achievers!
            </p>
            <div className="mt-3">
                <Link
                    href="/docs"
                    className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-xl"
                >
                    📘 Read Docs
                </Link>
            </div>
        </div>
    )
}

export default AuthButton