"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Helper function (same as yours)
function calcDaysLeft(dueDate: string) {
    const due = new Date(dueDate);
    const today = new Date();

    // Reset both to midnight
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMs = due.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}


const formatDaysLabel = (days: number) => {
    const absoluteDays = Math.abs(days);

    // Get the positive number of days

    if (absoluteDays === 1) {
        return '1 day';
    }
    return `${absoluteDays} days`;
};


export function DueBadge({ dueDate }: { dueDate: string | null }) {

    if (!dueDate) {
        return (
            <Badge className="bg-muted text-muted-foreground">
                <CalendarDays size={14} className="mr-1 opacity-70" />
                No due date
            </Badge>
        );
    }

    // Initial state calculation
    const [daysLeft, setDaysLeft] = useState(() => calcDaysLeft(dueDate));

    // Update interval
    useEffect(() => {
        setDaysLeft(calcDaysLeft(dueDate));
        const interval = setInterval(() => {
            setDaysLeft(calcDaysLeft(dueDate));
        }, 60000); // update every minute
        return () => clearInterval(interval);
    }, [dueDate]);

    // Variant colors
    let variantClass = "bg-secondary text-secondary-foreground";
    if (daysLeft < 0) variantClass = "bg-destructive text-white";
    else if (daysLeft <= 1) variantClass = "bg-yellow-500/20 text-black";

    // Label logic using the corrected helper function
    const label =
        daysLeft < 0
            ? `Overdue by ${formatDaysLabel(daysLeft)}`
            : daysLeft === 0
                ? "Due today"
                : `Due in ${formatDaysLabel(daysLeft)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Badge
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-medium shadow-sm ${variantClass}`}
            >
                <CalendarDays size={14} className="opacity-70" />
                {label}
            </Badge>
        </motion.div>
    );
}