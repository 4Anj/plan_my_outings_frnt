"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Users, Trash2, Edit2 } from "lucide-react"
import gsap from "gsap"

interface Group {
  id: string
  name: string
  description: string
  members: number
  category: string
  createdDate: string
}

export default function SmartGroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Movie Enthusiasts",
      description: "For people who love movies and want to plan movie nights",
      members: 24,
      category: "Entertainment",
      createdDate: "2025-10-15",
    },
    {
      id: "2",
      name: "Foodies United",
      description: "Discover new restaurants and plan dining experiences",
      members: 18,
      category: "Food & Dining",
      createdDate: "2025-10-10",
    },
    {
      id: "3",
      name: "Adventure Seekers",
      description: "For outdoor activities and adventure planning",
      members: 32,
      category: "Sports & Outdoors",
      createdDate: "2025-09-28",
    },
    {
      id: "4",
      name: "Gaming Squad",
      description: "Organize gaming sessions and tournaments",
      members: 28,
      category: "Gaming",
      createdDate: "2025-09-20",
    },
    {
      id: "5",
      name: "Music Lovers",
      description: "Share music recommendations and plan concert trips",
      members: 15,
      category: "Music",
      createdDate: "2025-09-15",
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    category: "",
  })

  useEffect(() => {
    gsap.fromTo(".group-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 })
  }, [groups])

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      const group: Group = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        members: 1,
        category: newGroup.category || "General",
        createdDate: new Date().toISOString().split("T")[0],
      }
      setGroups([...groups, group])
      setNewGroup({ name: "", description: "", category: "" })
      setShowCreateForm(false)
    }
  }

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id))
  }

  const handleViewGroup = (groupId: string) => {
    router.push(`/smart-groups/${groupId}`)
  }

  const handleEditGroup = (groupId: string) => {
    router.push(`/smart-groups/${groupId}?edit=true`)
  }

  const categories = [
    "Entertainment",
    "Food & Dining",
    "Sports & Outdoors",
    "Travel",
    "Gaming",
    "Music",
    "Art & Culture",
  ]

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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex justify-between items-center mb-12">
            <div data-text-animate>
              <h1 className="text-4xl font-bold text-white">Smart Groups</h1>
              <p className="text-gray-400 mt-2">Create and manage groups with AI-powered suggestions</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </Button>
          </div>

          {/* Create Group Form */}
          {showCreateForm && (
            <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
              <CardHeader>
                <CardTitle className="text-white">Create New Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name" className="text-gray-300">
                    Group Name
                  </Label>
                  <Input
                    id="group-name"
                    placeholder="Enter group name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-desc" className="text-gray-300">
                    Description
                  </Label>
                  <textarea
                    id="group-desc"
                    placeholder="Describe your group..."
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="w-full p-3 border border-slate-600 rounded-md bg-slate-700/50 text-white placeholder-gray-500"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={newGroup.category}
                    onChange={(e) => setNewGroup({ ...newGroup, category: e.target.value })}
                    className="w-full p-2 border border-slate-600 rounded-md bg-slate-700/50 text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateGroup} className="flex-1 bg-green-500 hover:bg-green-600">
                    Create Group
                  </Button>
                  <Button
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                    className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="group-card" data-scroll-animate>
                <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div
                          className={`inline-block bg-gradient-to-br ${categoryColors[group.category] || "from-blue-500 to-blue-600"} text-white px-3 py-1 rounded-full text-xs font-semibold mb-2`}
                        >
                          {group.category}
                        </div>
                        <CardTitle className="text-white">{group.name}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-blue-400 cursor-pointer"
                          onClick={() => handleEditGroup(group.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-red-400 cursor-pointer"
                          onClick={() => handleDeleteGroup(group.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-400">{group.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        {group.members} members
                      </div>
                      <span className="text-xs text-gray-500">Created {group.createdDate}</span>
                    </div>

                    <Button
                      onClick={() => handleViewGroup(group.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer"
                    >
                      View Group
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {groups.length === 0 && !showCreateForm && (
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="pt-12 text-center">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No groups yet. Create your first group to get started!</p>
                <Button onClick={() => setShowCreateForm(true)} className="bg-blue-500 hover:bg-blue-600">
                  Create Your First Group
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
