"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Hook לזיהוי האם המשתמש גולש ממכשיר נייד.
 * משתמש ב-MatchMedia כדי להגיב לשינויי גודל מסך בזמן אמת.
 */
export function useIsMobile(): boolean {
  // הגדרת ה-State כבוליאני בלבד (בלי undefined)
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // יצירת שאילתת המדיה
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // פונקציית עדכון
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // האזנה לשינויים (למשל סיבוב המסך או שינוי גודל חלון הדפדפן)
    mql.addEventListener("change", onChange)
    
    // בדיקה ראשונית מיד עם טעינת הקומפוננטה
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // ניקוי המאזין כשהקומפוננטה יוצאת מהזיכרון
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}