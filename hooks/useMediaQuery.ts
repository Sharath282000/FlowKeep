"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setmatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = () => setmatches(media.matches);

    setmatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
