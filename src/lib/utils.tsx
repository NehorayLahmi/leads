import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * פונקציה למיזוג קלאסים של Tailwind בצורה חכמה
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * בדיקה האם האפליקציה רצה בתוך Iframe
 * כולל הגנה מפני קריסה ב-Server Side Rendering
 */
export const isIframe = typeof window !== "undefined" && window.self !== window.top;