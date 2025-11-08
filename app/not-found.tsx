'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-900 to-gray-800 text-white px-4 text-center">
      
      {/* Animated 404 number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl sm:text-8xl font-extrabold mb-4 flex items-center justify-center gap-3"
      >
        4
        <AlertTriangle className="w-16 h-16 text-red-500 animate-bounce" />
        4
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl sm:text-2xl font-semibold mb-6"
      >
        Oops! The page could not be found.
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-muted-foreground max-w-md mb-8"
      >
        The page you are looking for doesn’t exist or has been moved. 
        Don’t worry — you can get back on track with the options below.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href="/" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition">
          Go to Home
        </Link>
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" /> Refresh Page
        </button>
      </motion.div>

      {/* Optional footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-10 text-sm text-gray-400"
      >
        © {new Date().getFullYear()} LyFn - FlowTask. All rights reserved.
      </motion.p>
    </div>
  )
}
