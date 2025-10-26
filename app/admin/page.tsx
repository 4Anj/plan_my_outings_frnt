"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MessageSquare, TrendingUp, Trash2, CheckCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import gsap from "gsap"

interface Event {
  id: string
  name: string
  organizer: string
  participants: number
  status: "pending" | "approved" | "rejected"
  date: string
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Movie Night",
      organizer: "John Doe",
      participants: 12,
      status: "approved",
      date: "2025-10-28",
    },
    {
      id: "2",
      name: "Weekend Hiking",
      organizer: "Jane Smith",
      participants: 8,
      status: "pending",
      date: "2025-10-29",
    },
    {
      id: "3",
      name: "Dinner Party",
      organizer: "Mike Johnson",
      participants: 15,
      status: "approved",
      date: "2025-10-30",
    },
    {
      id: "4",
      name: "Gaming Tournament",
      organizer: "Alex Chen",
      participants: 20,
      status: "pending",
      date: "2025-11-01",
    },
    {
      id: "5",
      name: "Beach Cleanup",
      organizer: "Sarah Wilson",
      participants: 25,
      status: "approved",
      date: "2025-11-05",
    },
  ])

  useEffect(() => {
    gsap.fromTo(".stat-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
  }, [])

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Active Events", value: "45", icon: Calendar, color: "from-purple-500 to-purple-600" },
    { label: "Total Groups", value: "89", icon: MessageSquare, color: "from-pink-500 to-pink-600" },
    { label: "Engagement Rate", value: "78%", icon: TrendingUp, color: "from-green-500 to-green-600" },
  ]

  const handleApprove = (id: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "approved" } : e)))
  }

  const handleReject = (id: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "rejected" } : e)))
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white" data-text-animate>
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Manage events, users, and platform activity</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="stat-card" data-scroll-animate>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                        </div>
                        <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Events Management */}
          <div data-scroll-animate>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Event Moderation</CardTitle>
                <CardDescription>Review and manage user-created events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Event Name</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Organizer</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Participants</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Date</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Status</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-4 px-4 text-white">{event.name}</td>
                          <td className="py-4 px-4 text-gray-300">{event.organizer}</td>
                          <td className="py-4 px-4 text-gray-300">{event.participants}</td>
                          <td className="py-4 px-4 text-gray-300">{event.date}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                                event.status === "approved"
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : event.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                              }`}
                            >
                              {event.status === "approved" && <CheckCircle className="w-4 h-4" />}
                              {event.status === "rejected" && <XCircle className="w-4 h-4" />}
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4 space-x-2 flex">
                            {event.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                                  onClick={() => handleApprove(event.id)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                                  onClick={() => handleReject(event.id)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-red-400"
                              onClick={() => handleDelete(event.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
