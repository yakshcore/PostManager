"use client";

import { useEffect } from "react";
import { startAnalytics } from "@/lib/firebase/client";

export function FirebaseAnalytics() {
  useEffect(() => {
    startAnalytics().catch(() => {});
  }, []);
  return null;
}
