"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Users, MessageCircle } from "lucide-react"
import gsap from "gsap"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: string
  avatar: string
}

interface Group {
  id: string
  name: string
  members: number
  messages: Message[]
}

export default function GroupChatPage() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Movie Night Planning",
      members: 8,
      messages: [
        {
          id: "1",
          sender: "John Doe",
          text: "Hey everyone! Should we watch a horror or comedy movie?",
          timestamp: "10:30 AM",
          avatar: "JD",
        },
        {
          id: "2",
          sender: "Jane Smith",
          text: "I vote for comedy! Something light and fun.",
          timestamp: "10:32 AM",
          avatar: "JS",
        },
        {
          id: "3",
          sender: "Mike Johnson",
          text: "Comedy sounds good to me too!",
          timestamp: "10:35 AM",
          avatar: "MJ",
        },
        {
          id: "4",
          sender: "Sarah Wilson",
          text: "Let's go with that new comedy that just came out!",
          timestamp: "10:38 AM",
          avatar: "SW",
        },
      ],
    },
    {
      id: "2",
      name: "Weekend Hiking Group",
      members: 12,
      messages: [
        {
          id: "1",
          sender: "Sarah Wilson",
          text: "Who's ready for the hike this Saturday?",
          timestamp: "2:15 PM",
          avatar: "SW",
        },
        {
          id: "2",
          sender: "Tom Brown",
          text: "Count me in! What time should we meet?",
          timestamp: "2:18 PM",
          avatar: "TB",
        },
        {
          id: "3",
          sender: "Alex Chen",
          text: "I'm in! Let's meet at 8 AM at the trailhead.",
          timestamp: "2:20 PM",
          avatar: "AC",
        },
      ],
    },
    {
      id: "3",
      name: "Foodies United",
      members: 15,
      messages: [
        {
          id: "1",
          sender: "Alex Chen",
          text: "Found an amazing new sushi place downtown!",
          timestamp: "5:45 PM",
          avatar: "AC",
        },
        {
          id: "2",
          sender: "Emma Davis",
          text: "Ooh, let's go there next week!",
          timestamp: "5:47 PM",
          avatar: "ED",
        },
        {
          id: "3",
          sender: "David Lee",
          text: "I'm definitely interested! What's the address?",
          timestamp: "5:50 PM",
          avatar: "DL",
        },
      ],
    },
  ])

  const [selectedGroupId, setSelectedGroupId] = useState(groups[0].id)
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedGroup = groups.find((g) => g.id === selectedGroupId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    gsap.fromTo(".message-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 })
  }, [selectedGroup?.messages])

  const handleSendMessage = () => {
    if (messageText.trim() && selectedGroup) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "You",
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "YO",
      }

      setGroups(groups.map((g) => (g.id === selectedGroupId ? { ...g, messages: [...g.messages, newMessage] } : g)))
      setMessageText("")
    }
  }

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white" data-text-animate>
              Group Chat
            </h1>
            <p className="text-gray-400 mt-2">Communicate with your groups in real-time</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
            {/* Groups List */}
            <Card
              className="lg:col-span-1 overflow-hidden flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
              data-scroll-animate
            >
              <CardHeader className="pb-3 border-b border-slate-700">
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-2 px-6 py-4">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroupId(group.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedGroupId === group.id
                          ? "bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border border-green-500/30"
                          : "hover:bg-slate-700/50 text-gray-300 border border-transparent"
                      }`}
                    >
                      <p className="font-semibold text-sm">{group.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        {group.members} members
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            {selectedGroup && (
              <Card
                className="lg:col-span-3 overflow-hidden flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
                data-scroll-animate
              >
                <CardHeader className="pb-3 border-b border-slate-700">
                  <CardTitle className="text-white">{selectedGroup.name}</CardTitle>
                  <CardDescription>{selectedGroup.members} members in this group</CardDescription>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedGroup.messages.map((message) => (
                    <div key={message.id} className="message-item flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {message.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-white">{message.sender}</p>
                          <p className="text-xs text-gray-500">{message.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-300 mt-1 bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-slate-700 p-4 bg-slate-900/50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
