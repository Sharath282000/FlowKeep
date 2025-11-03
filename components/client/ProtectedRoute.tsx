'use client'

import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import Spinnerpage from "../server/Spinnerpage";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { user, loading } = useAuth();
    const params = useParams();
    const userId = params.uid as string | undefined
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                setRedirecting(true);
                router.replace('/');
                return;
            } else if (userId && user.uid !== userId) {
                setRedirecting(true);
                router.replace(`/dashboard/user/${user.uid}`);
                return;
            }
        }
    }, [user, loading, userId, router])


    if (loading || redirecting) {
        return <Spinnerpage />;
    }

    return <>{children}</>
}