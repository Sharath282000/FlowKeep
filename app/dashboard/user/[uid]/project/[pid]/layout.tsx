import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Project Details",
    description: "Track your tasks, build better habits with Flowkeep — your minimal productivity dashboard.",
    keywords: [
        "task tracker",
        "productivity app",
        "habit tracker",
        "Next.js Firebase app",
        "Flowkeep",
        "Flowkeep tasks"
    ],
    authors: [{ name: "Flowkeep" }],
    icons: {
        icon: '/icon.png',
        apple: "/apple-touch-icon.png",
    },

};

export default function ProjectLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}