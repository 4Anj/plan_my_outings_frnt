"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lightbulb, MapPin, Clock, Star, Loader, Sparkles } from "lucide-react"
import gsap from "gsap"

interface Suggestion {
  id: string
  type: "restaurant" | "activity" | "venue" | "movie"
  title: string
  description: string
  rating: number
  price: string
  location: string
  bestFor: string[]
  image: string
}

export default function AISuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "restaurant",
      title: "Sakura Japanese Restaurant",
      description: "Authentic Japanese cuisine with a modern twist. Perfect for group dining.",
      rating: 4.8,
      price: "$$",
      location: "Downtown",
      bestFor: ["Groups", "Dinner", "Special Occasions"],
      image: "/japanese-restaurant.png",
    },
    {
      id: "2",
      type: "activity",
      title: "Escape Room Adventure",
      description: "Team-based puzzle solving experience. Great for bonding with friends.",
      rating: 4.6,
      price: "$",
      location: "City Center",
      bestFor: ["Groups", "Fun", "Team Building"],
      image: "/escape-room.jpg",
    },
    {
      id: "3",
      type: "venue",
      title: "Rooftop Bar & Lounge",
      description: "Stunning city views with craft cocktails. Ideal for casual hangouts.",
      rating: 4.7,
      price: "$$",
      location: "Uptown",
      bestFor: ["Casual", "Drinks", "Socializing"],
      image: "/rooftop-bar.png",
    },
    {
      id: "4",
      type: "movie",
      title: "The Adventure Chronicles",
      description: "Epic adventure film with stunning visuals. Perfect for movie night.",
      rating: 4.5,
      price: "$",
      location: "Cinema Plaza",
      bestFor: ["Movies", "Entertainment", "Groups"],
      image: "/classic-movie-theater.png",
    },
    {
      id: "5",
      type: "restaurant",
      title: "Bella Italia Pizzeria",
      description: "Authentic Italian pizza and pasta in a cozy atmosphere.",
      rating: 4.9,
      price: "$$",
      location: "Midtown",
      bestFor: ["Casual", "Dinner", "Families"],
      image: "/placeholder.svg",
    },
    {
      id: "6",
      type: "activity",
      title: "Outdoor Adventure Park",
      description: "Zip-lining, rock climbing, and outdoor activities for thrill-seekers.",
      rating: 4.7,
      price: "$$",
      location: "Suburbs",
      bestFor: ["Adventure", "Sports", "Groups"],
      image: "/placeholder.svg",
    },
  ])

  const [preferences, setPreferences] = useState({
    mood: "casual",
    budget: "medium",
    groupSize: "5-10",
    interests: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    gsap.fromTo(".suggestion-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 })
  }, [suggestions])

  const handleGetSuggestions = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const moods = ["Casual", "Adventurous", "Romantic", "Chill", "Energetic"]
  const budgets = ["Budget", "Medium", "Premium"]
  const groupSizes = ["2-4", "5-10", "10+"]

  return (
    <ProtectedRoute requiredRole="user">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white" data-text-animate>
              AI Suggestions
            </h1>
            <p className="text-gray-400 mt-2">Get smart recommendations for events and venues</p>
          </div>

          {/* Preferences Card */}
          <Card className="mb-12 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Tell Us Your Preferences
              </CardTitle>
              <CardDescription>We'll use AI to find the perfect suggestions for your group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mood" className="text-gray-300">
                    Mood
                  </Label>
                  <select
                    id="mood"
                    value={preferences.mood}
                    onChange={(e) => setPreferences({ ...preferences, mood: e.target.value })}
                    className="w-full p-2 border border-slate-600 rounded-md bg-slate-700/50 text-white"
                  >
                    {moods.map((m) => (
                      <option key={m} value={m.toLowerCase()}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-300">
                    Budget
                  </Label>
                  <select
                    id="budget"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                    className="w-full p-2 border border-slate-600 rounded-md bg-slate-700/50 text-white"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b.toLowerCase()}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSize" className="text-gray-300">
                    Group Size
                  </Label>
                  <select
                    id="groupSize"
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences({ ...preferences, groupSize: e.target.value })}
                    className="w-full p-2 border border-slate-600 rounded-md bg-slate-700/50 text-white"
                  >
                    {groupSizes.map((s) => (
                      <option key={s} value={s}>
                        {s} people
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests" className="text-gray-300">
                    Interests
                  </Label>
                  <Input
                    id="interests"
                    placeholder="e.g., food, movies, sports"
                    value={preferences.interests}
                    onChange={(e) => setPreferences({ ...preferences, interests: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <Button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="w-full gap-2 bg-gradient-to-r from-yellow-500 to-green-600 hover:from-yellow-600 hover:to-green-700 text-white border-0"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Getting AI Suggestions...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    Get AI Suggestions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="suggestion-card" data-scroll-animate>
                <Card className="overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all hover:shadow-2xl hover:shadow-yellow-500/20">
                  <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                    <img
                      src={suggestion.image || "/placeholder.svg"}
                      alt={suggestion.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-white">{suggestion.title}</h3>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded border border-yellow-500/30">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-300">{suggestion.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{suggestion.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {suggestion.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4 text-purple-400" />
                        Price: {suggestion.price}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {suggestion.bestFor.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-green-600 hover:from-yellow-600 hover:to-green-700">
                      Save Suggestion
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {suggestions.length === 0 && (
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="pt-12 text-center">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No suggestions yet. Set your preferences and get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
