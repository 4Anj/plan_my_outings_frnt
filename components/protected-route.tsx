"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push("/")
      return
    }

    const user = JSON.parse(userData)

    if (requiredRole && user.userType !== requiredRole) {
      router.push("/")
      return
    }

    setIsAuthorized(true)
  }, [router, requiredRole])

  if (!isAuthorized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <>{children}</>
}
