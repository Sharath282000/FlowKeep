"use client"

import { motion } from "framer-motion";
import React from "react";

interface CircularProgressProps {
  value: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100); // clamp between 0–100
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 100, height: 100 }}
    >
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#0ea5e9"
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <motion.span key={progress} initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1, filter: progress === 100 ? "drop-shadow(0 0 6px #0ea5e9)" : "none", strokeDashoffset: offset }}
        transition={{ duration: 0.3 }}
        className="absolute text-xl font-semibold text-sky-500">
        {Math.round(progress)}%
      </motion.span>
    </div>
  );
};

export default CircularProgress;
