"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Zap, Trash2, TrendingUp } from "lucide-react"
import gsap from "gsap"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  createdBy: string
  createdDate: string
  status: "active" | "closed"
}

export default function LivePollsPage() {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "Where should we go for dinner?",
      options: [
        { id: "1", text: "Italian Restaurant", votes: 12 },
        { id: "2", text: "Japanese Sushi", votes: 18 },
        { id: "3", text: "Mexican Tacos", votes: 8 },
        { id: "4", text: "Indian Curry", votes: 14 },
      ],
      totalVotes: 52,
      createdBy: "John Doe",
      createdDate: "2025-10-25",
      status: "active",
    },
    {
      id: "2",
      question: "What time should we meet?",
      options: [
        { id: "1", text: "6:00 PM", votes: 15 },
        { id: "2", text: "7:00 PM", votes: 22 },
        { id: "3", text: "8:00 PM", votes: 10 },
      ],
      totalVotes: 47,
      createdBy: "Jane Smith",
      createdDate: "2025-10-24",
      status: "active",
    },
    {
      id: "3",
      question: "Which movie genre do you prefer?",
      options: [
        { id: "1", text: "Action", votes: 28 },
        { id: "2", text: "Comedy", votes: 35 },
        { id: "3", text: "Drama", votes: 18 },
        { id: "4", text: "Horror", votes: 12 },
      ],
      totalVotes: 93,
      createdBy: "Mike Johnson",
      createdDate: "2025-10-23",
      status: "active",
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
  })
  const [userVotes, setUserVotes] = useState<Record<string, string>>({})

  useEffect(() => {
    gsap.fromTo(".poll-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
  }, [polls])

  const handleAddOption = () => {
    setNewPoll({
      ...newPoll,
      options: [...newPoll.options, ""],
    })
  }

  const handleRemoveOption = (index: number) => {
    setNewPoll({
      ...newPoll,
      options: newPoll.options.filter((_, i) => i !== index),
    })
  }

  const handleCreatePoll = () => {
    if (newPoll.question && newPoll.options.filter((o) => o.trim()).length >= 2) {
      const poll: Poll = {
        id: Date.now().toString(),
        question: newPoll.question,
        options: newPoll.options
          .filter((o) => o.trim())
          .map((text, idx) => ({
            id: idx.toString(),
            text,
            votes: 0,
          })),
        totalVotes: 0,
        createdBy: "Current User",
        createdDate: new Date().toISOString().split("T")[0],
        status: "active",
      }
      setPolls([poll, ...polls])
      setNewPoll({ question: "", options: ["", ""] })
      setShowCreateForm(false)
    }
  }

  const handleVote = (pollId: string, optionId: string) => {
    setUserVotes({ ...userVotes, [pollId]: optionId })

    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map((opt) => ({
              ...opt,
              votes: opt.id === optionId ? opt.votes + 1 : opt.votes,
            })),
            totalVotes: poll.totalVotes + 1,
          }
        }
        return poll
      }),
    )
  }

  const handleDeletePoll = (id: string) => {
    setPolls(polls.filter((p) => p.id !== id))
  }

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex justify-between items-center mb-12">
            <div data-text-animate>
              <h1 className="text-4xl font-bold text-white">Live Polls</h1>
              <p className="text-gray-400 mt-2">Create polls to decide on events and activities</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
            >
              <Plus className="w-4 h-4" />
              Create Poll
            </Button>
          </div>

          {/* Create Poll Form */}
          {showCreateForm && (
            <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
              <CardHeader>
                <CardTitle className="text-white">Create New Poll</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="poll-question" className="text-gray-300">
                    Poll Question
                  </Label>
                  <Input
                    id="poll-question"
                    placeholder="What is your poll question?"
                    value={newPoll.question}
                    onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300">Options</Label>
                  {newPoll.options.map((option, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newPoll.options]
                          newOptions[idx] = e.target.value
                          setNewPoll({ ...newPoll, options: newOptions })
                        }}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                      />
                      {newPoll.options.length > 2 && (
                        <Button
                          onClick={() => handleRemoveOption(idx)}
                          variant="outline"
                          className="border-slate-600 text-gray-300 hover:bg-slate-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={handleAddOption}
                    variant="outline"
                    className="w-full border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                  >
                    Add Option
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCreatePoll}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                  >
                    Create Poll
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

          {/* Polls List */}
          <div className="space-y-6">
            {polls.map((poll) => {
              const maxVotes = Math.max(...poll.options.map((o) => o.votes), 1)

              return (
                <div key={poll.id} className="poll-card" data-scroll-animate>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            {poll.question}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Created by {poll.createdBy} on {poll.createdDate}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              poll.status === "active"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                            }`}
                          >
                            {poll.status === "active" ? "Active" : "Closed"}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => handleDeletePoll(poll.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {poll.options.map((option) => {
                        const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                        const isUserVote = userVotes[poll.id] === option.id

                        return (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-white">{option.text}</span>
                              <span className="text-sm text-gray-400">{option.votes} votes</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full transition-all ${isUserVote ? "bg-gradient-to-r from-yellow-500 to-orange-600" : "bg-gradient-to-r from-yellow-400 to-orange-500"}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            {poll.status === "active" && (
                              <Button
                                onClick={() => handleVote(poll.id, option.id)}
                                className={`w-full text-sm ${
                                  isUserVote
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                                    : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                                }`}
                              >
                                {isUserVote ? "Your Vote" : "Vote"}
                              </Button>
                            )}
                          </div>
                        )
                      })}

                      <div className="pt-4 border-t border-slate-700 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Total votes: {poll.totalVotes}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {polls.length === 0 && !showCreateForm && (
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="pt-12 text-center">
                <Zap className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No polls yet. Create your first poll to get started!</p>
                <Button onClick={() => setShowCreateForm(true)} className="bg-yellow-500 hover:bg-yellow-600">
                  Create Your First Poll
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
