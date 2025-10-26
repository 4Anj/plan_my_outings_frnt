"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, FileText, Sparkles } from "lucide-react"
import gsap from "gsap"

interface UserProfile {
  email: string
  name: string
  bio: string
  phone: string
  location: string
  interests: string[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    name: "",
    bio: "",
    phone: "",
    location: "",
    interests: [],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newInterest, setNewInterest] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setProfile((prev) => ({
        ...prev,
        email: user.email,
        name: user.name,
      }))
    }

    gsap.fromTo(".profile-section", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
  }, [])

  const handleSave = () => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      user.name = profile.name
      localStorage.setItem("user", JSON.stringify(user))
    }
    setIsEditing(false)
  }

  const addInterest = () => {
    if (newInterest.trim()) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }))
  }

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Profile Header */}
          <div className="profile-section mb-8" data-scroll-animate>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">{profile.name || "User"}</h1>
                <p className="text-gray-400 mt-1">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="profile-section" data-scroll-animate>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      User Profile
                    </CardTitle>
                    <CardDescription>Manage your profile information</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`${
                      isEditing
                        ? "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    }`}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Basic Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-slate-700/50 border-slate-600 text-gray-400 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+1 (555) 000-0000"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-gray-300 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      className="w-full p-3 border border-slate-600 rounded-md bg-slate-700/50 text-white placeholder-gray-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4 border-t border-slate-700 pt-8">
                  <h3 className="font-semibold text-lg text-white">Interests</h3>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add an interest..."
                        onKeyPress={(e) => e.key === "Enter" && addInterest()}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                      />
                      <Button onClick={addInterest} className="bg-blue-500 hover:bg-blue-600">
                        Add
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full flex items-center gap-2 border border-blue-500/30"
                      >
                        {interest}
                        {isEditing && (
                          <button
                            onClick={() => removeInterest(idx)}
                            className="text-blue-400 hover:text-blue-200 font-bold ml-1"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2 border-t border-slate-700 pt-8">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
