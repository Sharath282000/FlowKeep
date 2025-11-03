"use client";

import { useEffect, useState } from "react";

function formatTimeago(dateInput: any) {
  if (!dateInput) return "Just now";

  // 🔧 Handle Firestore Timestamps or other date objects
  let date: Date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "object" && dateInput.seconds) {
    date = new Date(dateInput.seconds * 1000);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return "Just now"; // 🧩 prevent NaN yr ago

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} d${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} yr${years > 1 ? "s" : ""} ago`;
}

export function useTimeAgo(dateString: string) {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeago(dateString));

  useEffect(() => {
    setTimeAgo(formatTimeago(dateString));
    const interval = setInterval(() => {
      setTimeAgo(formatTimeago(dateString));
    }, 60000); // update every 1 minute

    return () => clearInterval(interval);
  }, [dateString]);

  return timeAgo;
}
