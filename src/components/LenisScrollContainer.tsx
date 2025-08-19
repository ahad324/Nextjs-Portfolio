"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

type LenisScrollContainerProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onWheel?: (e: React.WheelEvent) => void
}

export default function LenisScrollContainer({ children, className = "", style, onWheel }: LenisScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create Lenis instance for this specific container
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={style} onWheel={onWheel}>
      <div>{children}</div>
    </div>
  )
}
