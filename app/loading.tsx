"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function LoadingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = dotsRef.current
    if (!dots) return

    const dotElements = dots.querySelectorAll(".loading-dot")

    // Staggered animation for dots
    gsap.to(dotElements, {
      y: -20,
      opacity: 0.3,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "sine.inOut",
    })

    // Rotating circle animation
    gsap.to(".loading-circle", {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "none",
    })

    // Pulsing text animation
    gsap.to(".loading-text", {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Rotating Circle */}
        <div className="relative w-24 h-24">
          <div className="loading-circle absolute inset-0 border-4 border-transparent border-t-white border-r-blue-500 rounded-full" />
          <div
            className="absolute inset-2 border-4 border-transparent border-b-purple-500 border-l-white rounded-full animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-black text-xl">
              P
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="loading-text text-white text-2xl font-light tracking-widest">Preparing Your Experience</h2>
          <p className="text-gray-400 text-sm mt-2">Connecting you with your friends...</p>
        </div>

        {/* Animated Dots */}
        <div ref={dotsRef} className="flex gap-2">
          <div className="loading-dot w-2 h-2 bg-white rounded-full" />
          <div className="loading-dot w-2 h-2 bg-white rounded-full" />
          <div className="loading-dot w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
            style={{
              animation: "progress 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}
