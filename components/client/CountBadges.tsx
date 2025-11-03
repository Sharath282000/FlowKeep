'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export const CountBadge = ({ count }: { count: number | string }) => (
    <motion.div
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -top-1 -right-1"
    >
        <Badge
            variant="secondary"
            className="text-xs bg-primary text-white font-bold px-1.5 py-px rounded-full shadow-sm"
        >
            {count ?? 0}
        </Badge>
    </motion.div>
)
