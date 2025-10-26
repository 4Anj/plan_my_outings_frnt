"use client"

import { useEffect } from "react"
import gsap from "gsap"

export function CustomCursor() {
  useEffect(() => {
    const ball = document.createElement("div")
    ball.id = "cursor-ball"
    ball.style.cssText = `
      position: fixed;
      width: 30px;
      height: 30px;
      background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2));
      border: 2px solid rgba(59, 130, 246, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      display: none;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3);
      backdrop-filter: blur(10px);
    `
    document.body.appendChild(ball)

    let mouseX = 0
    let mouseY = 0
    const ballX = 0
    const ballY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (ball.style.display === "none") {
        ball.style.display = "block"
      }

      // Smooth ball following with easing
      gsap.to(ball, {
        left: mouseX - 15,
        top: mouseY - 15,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const handleMouseLeave = () => {
      ball.style.display = "none"
    }

    const handleMouseEnter = () => {
      ball.style.display = "block"
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      ball.remove()
      document.body.style.cursor = "auto"
    }
  }, [])

  return null
}
