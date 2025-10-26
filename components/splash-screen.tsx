"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeline = gsap.timeline()

    // Animate the splash screen
    timeline
      .to(".splash-logo", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out",
      })
      .to(
        ".splash-text",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4",
      )
      .to(
        ".splash-dots",
        {
          opacity: 1,
          duration: 0.4,
        },
        "-=0.2",
      )
      // Animate dots
      .to(
        ".splash-dot",
        {
          y: -10,
          opacity: 0.3,
          duration: 0.5,
          repeat: 3,
          yoyo: true,
          stagger: 0.1,
        },
        "-=0.2",
      )
      // Fade out and complete
      .to(".splash-container", {
        opacity: 0,
        duration: 0.8,
        delay: 1,
      })
      .call(() => {
        setIsVisible(false)
        onComplete()
      })
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="splash-container fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-[9999]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Logo */}
        <div className="splash-logo scale-0 opacity-0">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-5xl shadow-2xl">
            P
          </div>
        </div>

        {/* Text */}
        <div className="splash-text opacity-0 translate-y-4 text-center">
          <h1 className="text-white text-3xl font-light tracking-widest">PlanOutings</h1>
          <p className="text-gray-400 text-sm mt-2">Plan Together, Seamlessly</p>
        </div>

        {/* Loading Dots */}
        <div className="splash-dots opacity-0 flex gap-2 mt-4">
          <div className="splash-dot w-2 h-2 bg-white rounded-full" />
          <div className="splash-dot w-2 h-2 bg-white rounded-full" />
          <div className="splash-dot w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
    </div>
  )
}
