"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Mail, Edit2, Save, X } from "lucide-react"
import gsap from "gsap"

interface GroupMember {
  id: string
  name: string
  email: string
  joinedDate: string
}

interface GroupDetail {
  id: string
  name: string
  description: string
  category: string
  members: GroupMember[]
  createdDate: string
  createdBy: string
}

export default function ViewGroupPage({ params }: { params: { id: string } }) {
  const [group, setGroup] = useState<GroupDetail>({
    id: params.id,
    name: "Movie Enthusiasts",
    description: "For people who love movies and want to plan movie nights together",
    category: "Entertainment",
    members: [
      { id: "1", name: "John Doe", email: "john@example.com", joinedDate: "2025-10-15" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", joinedDate: "2025-10-16" },
      { id: "3", name: "Mike Johnson", email: "mike@example.com", joinedDate: "2025-10-17" },
      { id: "4", name: "Sarah Williams", email: "sarah@example.com", joinedDate: "2025-10-18" },
    ],
    createdDate: "2025-10-15",
    createdBy: "You",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: group.name,
    description: group.description,
  })

  useEffect(() => {
    gsap.fromTo(".member-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 })
  }, [group])

  const handleSaveEdit = () => {
    setGroup({
      ...group,
      name: editData.name,
      description: editData.description,
    })
    setIsEditing(false)
  }

  const handleRemoveMember = (memberId: string) => {
    setGroup({
      ...group,
      members: group.members.filter((m) => m.id !== memberId),
    })
  }

  const categoryColors: Record<string, string> = {
    Entertainment: "from-purple-500 to-purple-600",
    "Food & Dining": "from-orange-500 to-orange-600",
    "Sports & Outdoors": "from-green-500 to-green-600",
    Travel: "from-blue-500 to-blue-600",
    Gaming: "from-pink-500 to-pink-600",
    Music: "from-red-500 to-red-600",
    "Art & Culture": "from-indigo-500 to-indigo-600",
  }

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/smart-groups"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Groups
          </Link>

          {/* Group Header */}
          <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-gray-300">
                          Group Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-desc" className="text-gray-300">
                          Description
                        </Label>
                        <textarea
                          id="edit-desc"
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          className="w-full p-3 border border-slate-600 rounded-md bg-slate-700/50 text-white"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="border-slate-600 text-gray-300 hover:bg-slate-700"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`bg-gradient-to-br ${categoryColors[group.category] || "from-blue-500 to-blue-600"} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                        >
                          {group.category}
                        </div>
                        <Button
                          onClick={() => setIsEditing(true)}
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-3xl text-white">{group.name}</CardTitle>
                      <p className="text-gray-400 mt-3">{group.description}</p>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 border-t border-slate-700 pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Members</p>
                  <p className="text-2xl font-bold text-white">{group.members.length}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Created</p>
                  <p className="text-white font-semibold">{group.createdDate}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Created By</p>
                  <p className="text-white font-semibold">{group.createdBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Group Members
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.members.map((member) => (
                <div key={member.id} className="member-card" data-scroll-animate>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                          <p className="text-gray-400 text-sm">Joined {member.joinedDate}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
