"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ArrowRight, Zap, Users, Brain, MessageSquare, TrendingUp, Sparkles } from "lucide-react"
import SplashScreen from "@/components/splash-screen"

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Network animation
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []
    const particleCount = 50

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      })
    }

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.globalAlpha = 1 - distance / 150
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    if (showSplash) return

    const tl = gsap.timeline()

    tl.from(".landing-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
    })
      .from(
        ".landing-title",
        {
          opacity: 0,
          y: 40,
          duration: 1,
        },
        "-=0.5",
      )
      .from(
        ".landing-description",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.5",
      )
      .from(
        ".landing-buttons",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.5",
      )

    // Hover animations for buttons
    const buttons = document.querySelectorAll(".landing-btn")
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3 })
      })
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.3 })
      })
    })

    // Animate feature cards on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll(".feature-card").forEach((card) => {
      gsap.set(card, { opacity: 0, y: 30 })
      observer.observe(card)
    })

    return () => {
      observer.disconnect()
    }
  }, [showSplash])

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div ref={containerRef} className="relative w-full bg-black">
        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full"
          style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 md:p-8 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-black text-lg">
                P
              </div>
              <span className="text-white font-semibold text-lg hidden sm:inline">PlanOutings</span>
            </div>
            <div className="flex gap-4">
              <Link href="/auth" className="text-white hover:text-gray-300 transition-colors font-medium">
                Log in
              </Link>
              <Link
                href="/auth"
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Sign up
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <p className="landing-subtitle text-gray-400 text-sm md:text-base tracking-widest uppercase mb-6">
                Knowing by doing
              </p>

              <h1 className="landing-title text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                Plan <br /> Together
              </h1>

              <p className="landing-description text-gray-300 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                Stop endless group chats. Coordinate your next outing with smart suggestions, instant polls, and
                seamless collaboration.
              </p>

              {/* CTA Buttons */}
              <div className="landing-buttons flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth"
                  className="landing-btn px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="landing-btn px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all font-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Powerful Features</h2>
                <p className="text-gray-400 text-lg">Everything you need to plan the perfect outing</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Smart Groups */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Groups</h3>
                  <p className="text-gray-400">
                    Create and manage groups with intelligent member suggestions based on interests and availability.
                  </p>
                </div>

                {/* Live Polls */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Live Polls</h3>
                  <p className="text-gray-400">
                    Make decisions instantly with real-time polls. Vote on venues, activities, and timing in seconds.
                  </p>
                </div>

                {/* AI Suggestions */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Suggestions</h3>
                  <p className="text-gray-400">
                    Get personalized recommendations for restaurants, activities, and venues based on group preferences.
                  </p>
                </div>

                {/* Group Chat */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Group Chat</h3>
                  <p className="text-gray-400">
                    Collaborate seamlessly with built-in group messaging and real-time notifications.
                  </p>
                </div>

                {/* Event Management */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Event Management</h3>
                  <p className="text-gray-400">
                    Track RSVPs, manage schedules, and keep everyone updated with automatic notifications.
                  </p>
                </div>

                {/* Analytics */}
                <div className="feature-card p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 hover:border-white/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
                  <p className="text-gray-400">
                    View insights about your group's preferences and past events to improve future planning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Ready to Plan Together?</h2>
              <p className="text-gray-400 text-lg mb-8">
                Join thousands of groups already coordinating their perfect outings.
              </p>
              <Link
                href="/auth"
                className="inline-block px-10 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg group"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto text-center text-gray-400">
              <p>&copy; 2025 PlanOutings. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
