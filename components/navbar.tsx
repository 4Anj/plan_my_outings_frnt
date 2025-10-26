"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"

interface User {
  email: string
  name: string
  userType: "user" | "admin"
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  if (!user) return null

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user.userType === "admin" ? "/admin" : "/dashboard"} className="font-bold text-xl text-blue-600">
            Plan My Outings
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="text-sm text-gray-600 px-2 py-2">{user.name}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full gap-2 justify-start bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
