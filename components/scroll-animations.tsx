"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  useEffect(() => {
    // Animate cards on scroll
    const cards = document.querySelectorAll("[data-scroll-animate]")
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
          },
        },
      )
    })

    // Animate text on scroll
    const textElements = document.querySelectorAll("[data-text-animate]")
    textElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}
