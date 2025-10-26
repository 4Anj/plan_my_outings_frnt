"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [showPassword, setShowPassword] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1 + 0.5,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        ctx.fillStyle = "rgba(59, 130, 246, 0.6)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            ctx.globalAlpha = 1 - distance / 200
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
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData = {
      email,
      name: isLogin ? email.split("@")[0] : name,
      userType,
      isLoggedIn: true,
    }

    localStorage.setItem("user", JSON.stringify(userData))

    if (userType === "admin") {
      window.location.href = "/admin"
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "radial-gradient(ellipse at center, #0f172a 0%, #000000 100%)" }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      {/* Card */}
      <Card
        ref={cardRef}
        className="w-full max-w-md relative z-10 bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl"
      >
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PlanOutings
            </CardTitle>
          </div>
          <CardDescription className="text-gray-300">Coordinate group events effortlessly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="user" onValueChange={(v) => setUserType(v as "user" | "admin")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                <TabsTrigger value="user" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  User
                </TabsTrigger>
                <TabsTrigger value="admin" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>

            <div className="text-center text-sm text-gray-300">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
