'use client'
import Image from "next/image";
import Link from "next/link";
import LogoutAlert from "../server/LogoutAlert";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export default function Navbar() {
    const { user, logout, loading } = useAuth()

    if (loading) {
        return (
            <nav className="sticky top-0 z-10 p-4 bg-secondary">
                <div className="flex items-center justify-between">
                    <div className="flex m-5 items-center gap-2">
                        <Link href="/" className=" flex items-center gap-2 cursor-pointer">
                            <Image src='/icon.png' width='25' height='25' alt="logo image" />
                            <p className="text-xl md:text-2xl font-bold">FlowKeep</p>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                        <Skeleton className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                </div>
            </nav>
        );
    }
    return (
        <nav className={`sticky top-0 z-10 p-4 bg-secondary ${user && 'shadow-sm'}`}>
            <div className="flex items-center justify-between">
                <div className="flex m-5 items-center gap-2">
                    <Link href="/" className=" flex items-center gap-2 cursor-pointer">
                        <Image src='/icon.png' width='25' height='25' alt="logo image" />
                        <p className="text-xl md:text-2xl font-bold">FlowKeep</p>
                    </Link>
                </div>
                {user && !loading &&
                    <div className="flex items-center gap-2">
                        <Image className="rounded-full cursor-pointer w-7 md:w-8" src={user?.photoURL || 'https://avatar.iran.liara.run/public'} alt="Avatar" width='35' height='35' />
                        <LogoutAlert logout={logout} />
                    </div>
                }
            </div>
        </nav>
    )
}