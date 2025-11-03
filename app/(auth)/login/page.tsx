'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinnerpage from "@/components/server/Spinnerpage";

export default function Login() {
    const { user, signingoogle, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push(`/dashboard/user/${user.uid}`)
    }, [user, router])

    if (loading || user){
        return <Spinnerpage/>
    }

    return (
        <div className="flex items-center min-h-screen overflow-hidden justify-center p-5">
            <Card className="w-full max-w-sm border shadow-xl">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center m-3 gap-2">
                            <Link href="/" className=" flex items-center gap-2 cursor-pointer">
                                <Image src='/icon.png' width='25' height='25' alt="logo image" />
                                <p className="text-xl md:text-2xl font-bold">FlowKeep</p>
                            </Link>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Your best work starts here. Link your Google Account and activate peak productivity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={signingoogle} variant="outline" className="w-full cursor-pointer">
                        <Image src='/google.png' width='20' height='20' alt="Google Logo" />

                        <span className="text-sm">
                            Sign in with Google
                        </span>
                    </Button>
                </CardContent>

            </Card>
        </div>
    )
}