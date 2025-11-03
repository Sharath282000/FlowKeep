'use client'

import { createContext, ReactNode, useState, useEffect, useContext } from "react";

import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null,
    loading: boolean,
    signingoogle: () => Promise<void>,
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setuser] = useState<User | null>(null)
    const [loading, setloading] = useState(true)
    const router = useRouter();

    googleProvider.setCustomParameters({
        prompt: 'select_account'
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setuser(currentuser);
            setloading(false);
        });

        return () => unsubscribe();
    }, []);

    const signingoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    const logout = async () => {
        await signOut(auth)
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, loading, signingoogle, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};