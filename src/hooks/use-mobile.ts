import React from "react"

const DEFAULT_MOBILE_BREAKPOINT = 768

/**
 * Hook to check if the current viewport is mobile-sized
 * @param breakpoint Optional custom breakpoint (in px). Defaults to 768px.
 * @returns Boolean indicating if the viewport is smaller than the breakpoint
 */
export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < breakpoint)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isMobile
}
