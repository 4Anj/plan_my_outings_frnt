"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Zap, MessageSquare, Lightbulb, TrendingUp, Calendar, Award, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import gsap from "gsap"

interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  gradient: string
}

export default function DashboardPage() {
  const [userStats] = useState({
    eventsCreated: 5,
    groupsJoined: 12,
    upcomingEvents: 3,
  })

  useEffect(() => {
    // Animate stats on load
    gsap.fromTo(".stat-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })

    // Animate feature cards
    gsap.fromTo(".feature-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 })
  }, [])

  const features: Feature[] = [
    {
      id: "smart-groups",
      title: "Smart Groups",
      description: "Create and manage groups with AI-powered suggestions",
      icon: <Users className="w-8 h-8" />,
      href: "/smart-groups",
      color: "from-blue-500 to-blue-600",
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      id: "live-polls",
      title: "Live Polls",
      description: "Create polls to decide on events and activities",
      icon: <Zap className="w-8 h-8" />,
      href: "/live-polls",
      color: "from-purple-500 to-purple-600",
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      id: "ai-suggestions",
      title: "AI Suggestions",
      description: "Get smart recommendations for events and venues",
      icon: <Lightbulb className="w-8 h-8" />,
      href: "/ai-suggestions",
      color: "from-yellow-500 to-yellow-600",
      gradient: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      id: "group-chat",
      title: "Group Chat",
      description: "Communicate with your groups in real-time",
      icon: <MessageSquare className="w-8 h-8" />,
      href: "/group-chat",
      color: "from-green-500 to-green-600",
      gradient: "bg-gradient-to-br from-green-50 to-green-100",
    },
  ]

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-12">
            <div data-text-animate>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-gray-300 text-lg">Coordinate your events and activities with friends</p>
            </div>
            <Link href="/profile">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                View Profile
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="stat-card" data-scroll-animate>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Events Created</p>
                      <p className="text-4xl font-bold text-blue-400 mt-2">{userStats.eventsCreated}</p>
                    </div>
                    <Calendar className="w-12 h-12 text-blue-500/30" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="stat-card" data-scroll-animate>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Groups Joined</p>
                      <p className="text-4xl font-bold text-purple-400 mt-2">{userStats.groupsJoined}</p>
                    </div>
                    <Users className="w-12 h-12 text-purple-500/30" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="stat-card" data-scroll-animate>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Upcoming Events</p>
                      <p className="text-4xl font-bold text-green-400 mt-2">{userStats.upcomingEvents}</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-500/30" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8" data-text-animate>
              Explore Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Link key={feature.id} href={feature.href}>
                  <div className="feature-card group h-full" data-scroll-animate>
                    <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                      <CardContent className="pt-6 h-full flex flex-col">
                        <div
                          className={`bg-gradient-to-br ${feature.color} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          {feature.icon}
                        </div>
                        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-400 flex-grow">{feature.description}</p>
                        <div className="mt-4 flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                          <span className="text-sm font-medium">Explore</span>
                          <Sparkles className="w-4 h-4 ml-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Events */}
          <div data-scroll-animate>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Recent Events
                </CardTitle>
                <CardDescription>Your upcoming and past events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Movie Night", date: "Oct 28, 2025", participants: 8, status: "upcoming" },
                    { name: "Dinner Party", date: "Oct 30, 2025", participants: 12, status: "upcoming" },
                    { name: "Weekend Hike", date: "Nov 2, 2025", participants: 6, status: "upcoming" },
                  ].map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800/50 transition-all group"
                    >
                      <div>
                        <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {event.name}
                        </p>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                      <span className="text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                        {event.participants} participants
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
