"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lightbulb, MapPin, Clock, Star, Loader, Sparkles, Search } from "lucide-react"
import gsap from "gsap"
import Script from "next/script";

interface Suggestion {
  id: string
  type: "monument" | "restaurant" | "activity" | "beach"
  title: string
  description: string
  rating: number
  price: string
  location: string
  address: string
  bestFor: string[]
  distance: string
}

const locationData: Record<string, Suggestion[]> = {
  jodhpur: [
    {
      id: "j1",
      type: "monument",
      title: "Mehrangarh Fort",
      description: "Majestic 15th-century fort with stunning architecture and panoramic city views",
      rating: 4.9,
      price: "$",
      location: "Jodhpur",
      address: "Mehrangarh Fort, Jodhpur, Rajasthan",
      bestFor: ["Sightseeing", "Photography", "History"],
      distance: "5 km",
    },
    {
      id: "j2",
      type: "monument",
      title: "Umaid Bhawan Palace",
      description: "Stunning Art Deco palace with museum and heritage hotel facilities",
      rating: 4.8,
      price: "$$",
      location: "Jodhpur",
      address: "Umaid Bhawan Palace, Jodhpur",
      bestFor: ["Architecture", "Photography", "Heritage"],
      distance: "8 km",
    },
    {
      id: "j3",
      type: "monument",
      title: "Jaswant Thada",
      description: "Beautiful marble cenotaph with intricate carvings and peaceful gardens",
      rating: 4.7,
      price: "$",
      location: "Jodhpur",
      address: "Jaswant Thada, Jodhpur",
      bestFor: ["Sightseeing", "Photography", "Peaceful"],
      distance: "6 km",
    },
    {
      id: "j4",
      type: "restaurant",
      title: "Indique Restaurant",
      description: "Authentic Rajasthani cuisine with traditional recipes and local flavors",
      rating: 4.7,
      price: "$$",
      location: "Jodhpur",
      address: "Nai Sarak, Jodhpur, Rajasthan",
      bestFor: ["Groups", "Dinner", "Local Cuisine"],
      distance: "2.5 km",
    },
    {
      id: "j5",
      type: "restaurant",
      title: "Jharokha Cafe",
      description: "Rooftop cafe with panoramic fort views and fusion cuisine",
      rating: 4.5,
      price: "$$",
      location: "Jodhpur",
      address: "Old City, Jodhpur",
      bestFor: ["Casual", "Drinks", "Views"],
      distance: "3 km",
    },
    {
      id: "j6",
      type: "restaurant",
      title: "On The Rocks",
      description: "Multi-cuisine restaurant with rooftop seating and sunset views",
      rating: 4.6,
      price: "$$",
      location: "Jodhpur",
      address: "High Court Road, Jodhpur",
      bestFor: ["Dinner", "Groups", "Views"],
      distance: "4 km",
    },
    {
      id: "j7",
      type: "activity",
      title: "Camel Safari Adventure",
      description: "Desert camel safari experience with traditional Rajasthani hospitality",
      rating: 4.6,
      price: "$$",
      location: "Jodhpur",
      address: "Khimsar Desert, Jodhpur",
      bestFor: ["Adventure", "Groups", "Experience"],
      distance: "15 km",
    },
    {
      id: "j8",
      type: "activity",
      title: "Blue City Walking Tour",
      description: "Guided tour through the famous blue-painted streets of old Jodhpur",
      rating: 4.7,
      price: "$",
      location: "Jodhpur",
      address: "Old City, Jodhpur",
      bestFor: ["Culture", "Photography", "History"],
      distance: "2 km",
    },
  ],
  delhi: [
    {
      id: "d1",
      type: "monument",
      title: "India Gate",
      description: "Iconic war memorial and popular gathering spot for locals and tourists",
      rating: 4.7,
      price: "$",
      location: "Delhi",
      address: "Rajpath, New Delhi",
      bestFor: ["Sightseeing", "Picnic", "Groups"],
      distance: "6 km",
    },
    {
      id: "d2",
      type: "monument",
      title: "Red Fort",
      description: "Historic 17th-century fort with stunning Mughal architecture",
      rating: 4.8,
      price: "$",
      location: "Delhi",
      address: "Netaji Subhash Marg, Old Delhi",
      bestFor: ["History", "Photography", "Culture"],
      distance: "5 km",
    },
    {
      id: "d3",
      type: "monument",
      title: "Jama Masjid",
      description: "One of India's largest mosques with beautiful architecture and courtyard",
      rating: 4.6,
      price: "$",
      location: "Delhi",
      address: "Jama Masjid, Old Delhi",
      bestFor: ["Architecture", "Culture", "Photography"],
      distance: "4 km",
    },
    {
      id: "d4",
      type: "monument",
      title: "Qutub Minar",
      description: "UNESCO World Heritage Site with ancient tower and archaeological park",
      rating: 4.7,
      price: "$",
      location: "Delhi",
      address: "Qutub Minar, South Delhi",
      bestFor: ["History", "Photography", "Heritage"],
      distance: "12 km",
    },
    {
      id: "d5",
      type: "restaurant",
      title: "Bukhara Restaurant",
      description: "Premium North Indian and Afghan cuisine in luxury setting",
      rating: 4.8,
      price: "$$$",
      location: "Delhi",
      address: "ITC Maurya, New Delhi",
      bestFor: ["Fine Dining", "Groups", "Special Occasions"],
      distance: "8 km",
    },
    {
      id: "d6",
      type: "restaurant",
      title: "Karim's",
      description: "Legendary Mughlai restaurant serving authentic recipes since 1913",
      rating: 4.6,
      price: "$",
      location: "Delhi",
      address: "Jama Masjid, Old Delhi",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "5 km",
    },
    {
      id: "d7",
      type: "restaurant",
      title: "Dum Pukht",
      description: "Authentic Awadhi cuisine with slow-cooked specialties",
      rating: 4.7,
      price: "$$",
      location: "Delhi",
      address: "ITC Maurya, New Delhi",
      bestFor: ["Fine Dining", "Dinner", "Cuisine"],
      distance: "8 km",
    },
    {
      id: "d8",
      type: "activity",
      title: "Delhi Heritage Walk",
      description: "Guided tour through Old Delhi's historic lanes and bazaars",
      rating: 4.6,
      price: "$$",
      location: "Delhi",
      address: "Chandni Chowk, Old Delhi",
      bestFor: ["Culture", "History", "Groups"],
      distance: "4 km",
    },
    {
      id: "d9",
      type: "activity",
      title: "Chandni Chowk Street Food Tour",
      description: "Culinary adventure through Delhi's most famous street food market",
      rating: 4.7,
      price: "$",
      location: "Delhi",
      address: "Chandni Chowk, Old Delhi",
      bestFor: ["Food", "Culture", "Adventure"],
      distance: "3 km",
    },
  ],
  mumbai: [
    {
      id: "m1",
      type: "monument",
      title: "Gateway of India",
      description: "Iconic monument overlooking the Arabian Sea with vibrant atmosphere",
      rating: 4.7,
      price: "$",
      location: "Mumbai",
      address: "Apollo Bunder, Mumbai",
      bestFor: ["Sightseeing", "Socializing", "Groups"],
      distance: "3 km",
    },
    {
      id: "m2",
      type: "monument",
      title: "Taj Mahal Palace Hotel",
      description: "Historic luxury hotel with stunning architecture and heritage value",
      rating: 4.8,
      price: "$$$",
      location: "Mumbai",
      address: "Colaba, Mumbai",
      bestFor: ["Architecture", "Photography", "Heritage"],
      distance: "2 km",
    },
    {
      id: "m3",
      type: "monument",
      title: "Haji Ali Dargah",
      description: "Sacred Islamic shrine on an island with stunning sea views",
      rating: 4.6,
      price: "$",
      location: "Mumbai",
      address: "Haji Ali, Mumbai",
      bestFor: ["Spiritual", "Photography", "Culture"],
      distance: "5 km",
    },
    {
      id: "m4",
      type: "restaurant",
      title: "Mahesh Lunch Home",
      description: "Premium seafood restaurant with coastal Indian cuisine",
      rating: 4.8,
      price: "$$$",
      location: "Mumbai",
      address: "Colaba, Mumbai",
      bestFor: ["Fine Dining", "Seafood", "Groups"],
      distance: "2 km",
    },
    {
      id: "m5",
      type: "restaurant",
      title: "Trishna",
      description: "Historic Parsi restaurant with authentic coastal cuisine",
      rating: 4.7,
      price: "$$",
      location: "Mumbai",
      address: "Fort, Mumbai",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "3.5 km",
    },
    {
      id: "m6",
      type: "restaurant",
      title: "Ippanema",
      description: "Brazilian steakhouse with premium cuts and wine selection",
      rating: 4.6,
      price: "$$$",
      location: "Mumbai",
      address: "Bandra, Mumbai",
      bestFor: ["Fine Dining", "Groups", "Celebration"],
      distance: "8 km",
    },
    {
      id: "m7",
      type: "activity",
      title: "Marine Drive Sunset Walk",
      description: "Scenic coastal walk with stunning sunset views and sea breeze",
      rating: 4.6,
      price: "$",
      location: "Mumbai",
      address: "Marine Drive, Mumbai",
      bestFor: ["Casual", "Romantic", "Groups"],
      distance: "4 km",
    },
    {
      id: "m8",
      type: "activity",
      title: "Dharavi Slum Tour",
      description: "Authentic cultural experience exploring Mumbai's vibrant community",
      rating: 4.5,
      price: "$",
      location: "Mumbai",
      address: "Dharavi, Mumbai",
      bestFor: ["Culture", "Experience", "Photography"],
      distance: "6 km",
    },
  ],
  agra: [
    {
      id: "a1",
      type: "monument",
      title: "Taj Mahal",
      description: "UNESCO World Heritage Site - one of the world's most beautiful monuments",
      rating: 4.9,
      price: "$",
      location: "Agra",
      address: "Taj Mahal, Agra, Uttar Pradesh",
      bestFor: ["Sightseeing", "Photography", "Heritage"],
      distance: "4 km",
    },
    {
      id: "a2",
      type: "monument",
      title: "Agra Fort",
      description: "Historic Mughal fort with stunning red sandstone architecture",
      rating: 4.7,
      price: "$",
      location: "Agra",
      address: "Agra Fort, Agra",
      bestFor: ["History", "Photography", "Culture"],
      distance: "2 km",
    },
    {
      id: "a3",
      type: "restaurant",
      title: "Pind Balluchi",
      description: "Authentic Punjabi cuisine with traditional recipes",
      rating: 4.6,
      price: "$$",
      location: "Agra",
      address: "Taj Road, Agra",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "3 km",
    },
    {
      id: "a4",
      type: "activity",
      title: "Taj Mahal Sunrise Tour",
      description: "Early morning tour to witness the magical sunrise at Taj Mahal",
      rating: 4.8,
      price: "$$",
      location: "Agra",
      address: "Taj Mahal, Agra",
      bestFor: ["Photography", "Experience", "Groups"],
      distance: "4 km",
    },
  ],
  jaipur: [
    {
      id: "jp1",
      type: "monument",
      title: "City Palace",
      description: "Magnificent palace blending Mughal and Rajasthani architecture",
      rating: 4.7,
      price: "$",
      location: "Jaipur",
      address: "City Palace, Jaipur",
      bestFor: ["Architecture", "Photography", "Heritage"],
      distance: "3 km",
    },
    {
      id: "jp2",
      type: "monument",
      title: "Hawa Mahal",
      description: "Iconic pink sandstone structure with 953 small windows",
      rating: 4.8,
      price: "$",
      location: "Jaipur",
      address: "Hawa Mahal, Jaipur",
      bestFor: ["Photography", "Sightseeing", "Culture"],
      distance: "2 km",
    },
    {
      id: "jp3",
      type: "restaurant",
      title: "Niros",
      description: "Legendary restaurant serving authentic Rajasthani and Indian cuisine",
      rating: 4.7,
      price: "$$",
      location: "Jaipur",
      address: "M.I. Road, Jaipur",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "4 km",
    },
    {
      id: "jp4",
      type: "activity",
      title: "Jaipur City Tour",
      description: "Comprehensive guided tour of Jaipur's major attractions",
      rating: 4.6,
      price: "$$",
      location: "Jaipur",
      address: "Jaipur City",
      bestFor: ["Culture", "History", "Groups"],
      distance: "5 km",
    },
  ],
  goa: [
    {
      id: "g1",
      type: "beach",
      title: "Baga Beach",
      description: "Popular beach with water sports, shacks, and vibrant nightlife",
      rating: 4.6,
      price: "$$",
      location: "Goa",
      address: "Baga Beach, North Goa",
      bestFor: ["Beach", "Water Sports", "Nightlife"],
      distance: "2 km",
    },
    {
      id: "g2",
      type: "beach",
      title: "Palolem Beach",
      description: "Scenic crescent-shaped beach with calm waters and coconut palms",
      rating: 4.7,
      price: "$$",
      location: "Goa",
      address: "Palolem Beach, South Goa",
      bestFor: ["Beach", "Relaxation", "Scenic"],
      distance: "5 km",
    },
    {
      id: "g3",
      type: "restaurant",
      title: "Fisherman's Wharf",
      description: "Beachfront seafood restaurant with fresh catch and sea views",
      rating: 4.7,
      price: "$$",
      location: "Goa",
      address: "Panjim, Goa",
      bestFor: ["Seafood", "Casual", "Views"],
      distance: "3 km",
    },
    {
      id: "g4",
      type: "activity",
      title: "Scuba Diving Adventure",
      description: "Underwater exploration with certified instructors and marine life",
      rating: 4.8,
      price: "$$$",
      location: "Goa",
      address: "Goa Waters",
      bestFor: ["Adventure", "Water Sports", "Experience"],
      distance: "8 km",
    },
  ],
  bangalore: [
    {
      id: "b1",
      type: "monument",
      title: "Vidhana Soudha",
      description: "Impressive neo-Dravidian architecture housing the state legislature",
      rating: 4.6,
      price: "$",
      location: "Bangalore",
      address: "Vidhana Soudha, Bangalore",
      bestFor: ["Architecture", "Photography", "Culture"],
      distance: "4 km",
    },
    {
      id: "b2",
      type: "restaurant",
      title: "Karavalli",
      description: "Coastal Indian cuisine with authentic recipes from Kerala and Karnataka",
      rating: 4.7,
      price: "$$",
      location: "Bangalore",
      address: "Bangalore",
      bestFor: ["Casual", "Dinner", "Cuisine"],
      distance: "5 km",
    },
    {
      id: "b3",
      type: "activity",
      title: "Bangalore Tech Park Tour",
      description: "Explore the IT hub and modern infrastructure of Bangalore",
      rating: 4.5,
      price: "$",
      location: "Bangalore",
      address: "Whitefield, Bangalore",
      bestFor: ["Technology", "Culture", "Groups"],
      distance: "10 km",
    },
  ],
  hyderabad: [
    {
      id: "h1",
      type: "monument",
      title: "Charminar",
      description: "Iconic 16th-century monument with four minarets and historic bazaar",
      rating: 4.7,
      price: "$",
      location: "Hyderabad",
      address: "Charminar, Hyderabad",
      bestFor: ["Photography", "History", "Culture"],
      distance: "3 km",
    },
    {
      id: "h2",
      type: "restaurant",
      title: "Haleem House",
      description: "Authentic Hyderabadi biryani and haleem specialties",
      rating: 4.8,
      price: "$$",
      location: "Hyderabad",
      address: "Old City, Hyderabad",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "2 km",
    },
    {
      id: "h3",
      type: "activity",
      title: "Old City Heritage Walk",
      description: "Guided tour through Hyderabad's historic old city and bazaars",
      rating: 4.6,
      price: "$",
      location: "Hyderabad",
      address: "Old City, Hyderabad",
      bestFor: ["Culture", "History", "Groups"],
      distance: "2 km",
    },
  ],
  kolkata: [
    {
      id: "k1",
      type: "monument",
      title: "Victoria Memorial",
      description: "Grand marble monument dedicated to Queen Victoria with museum",
      rating: 4.7,
      price: "$",
      location: "Kolkata",
      address: "Victoria Memorial, Kolkata",
      bestFor: ["Architecture", "Photography", "Heritage"],
      distance: "4 km",
    },
    {
      id: "k2",
      type: "restaurant",
      title: "Flury's",
      description: "Historic bakery and restaurant serving Bengali and European cuisine",
      rating: 4.6,
      price: "$$",
      location: "Kolkata",
      address: "Park Street, Kolkata",
      bestFor: ["Casual", "Breakfast", "Heritage"],
      distance: "3 km",
    },
    {
      id: "k3",
      type: "activity",
      title: "Kolkata Heritage Walk",
      description: "Explore colonial architecture and cultural landmarks of Kolkata",
      rating: 4.6,
      price: "$",
      location: "Kolkata",
      address: "Kolkata City",
      bestFor: ["Culture", "History", "Groups"],
      distance: "5 km",
    },
  ],
  varanasi: [
    {
      id: "v1",
      type: "monument",
      title: "Kashi Vishwanath Temple",
      description: "Sacred Hindu temple dedicated to Lord Shiva on the Ganges",
      rating: 4.8,
      price: "$",
      location: "Varanasi",
      address: "Kashi Vishwanath Temple, Varanasi",
      bestFor: ["Spiritual", "Culture", "Photography"],
      distance: "2 km",
    },
    {
      id: "v2",
      type: "activity",
      title: "Ganges Boat Ride",
      description: "Spiritual boat ride on the sacred Ganges River at sunrise or sunset",
      rating: 4.7,
      price: "$",
      location: "Varanasi",
      address: "Ganges River, Varanasi",
      bestFor: ["Spiritual", "Experience", "Photography"],
      distance: "1 km",
    },
    {
      id: "v3",
      type: "restaurant",
      title: "Brown Bread Bakery",
      description: "Vegetarian cafe with organic food and spiritual ambiance",
      rating: 4.5,
      price: "$",
      location: "Varanasi",
      address: "Varanasi",
      bestFor: ["Casual", "Vegetarian", "Spiritual"],
      distance: "3 km",
    },
  ],
  udaipur: [
    {
      id: "u1",
      type: "monument",
      title: "City Palace",
      description: "Stunning lakeside palace with Rajasthani and Mughal architecture",
      rating: 4.8,
      price: "$$",
      location: "Udaipur",
      address: "City Palace, Udaipur",
      bestFor: ["Architecture", "Photography", "Heritage"],
      distance: "3 km",
    },
    {
      id: "u2",
      type: "monument",
      title: "Lake Pichola",
      description: "Scenic artificial lake surrounded by palaces and temples",
      rating: 4.7,
      price: "$",
      location: "Udaipur",
      address: "Lake Pichola, Udaipur",
      bestFor: ["Scenic", "Photography", "Relaxation"],
      distance: "2 km",
    },
    {
      id: "u3",
      type: "restaurant",
      title: "Ambrai",
      description: "Lakeside restaurant with traditional Rajasthani cuisine and views",
      rating: 4.7,
      price: "$$",
      location: "Udaipur",
      address: "Lake Pichola, Udaipur",
      bestFor: ["Casual", "Dinner", "Views"],
      distance: "2 km",
    },
    {
      id: "u4",
      type: "activity",
      title: "Lake Pichola Boat Ride",
      description: "Scenic boat ride with sunset views and palace photography",
      rating: 4.8,
      price: "$$",
      location: "Udaipur",
      address: "Lake Pichola, Udaipur",
      bestFor: ["Scenic", "Photography", "Romantic"],
      distance: "2 km",
    },
  ],
  kochi: [
    {
      id: "kc1",
      type: "monument",
      title: "Chinese Fishing Nets",
      description: "Iconic cantilevered fishing nets with historic significance",
      rating: 4.7,
      price: "$",
      location: "Kochi",
      address: "Fort Kochi, Kochi",
      bestFor: ["Photography", "Culture", "Experience"],
      distance: "2 km",
    },
    {
      id: "kc2",
      type: "beach",
      title: "Fort Kochi Beach",
      description: "Scenic beach with colonial architecture and backwater views",
      rating: 4.6,
      price: "$",
      location: "Kochi",
      address: "Fort Kochi, Kochi",
      bestFor: ["Beach", "Relaxation", "Photography"],
      distance: "1 km",
    },
    {
      id: "kc3",
      type: "restaurant",
      title: "Teapot Cafe",
      description: "Cozy cafe with Kerala cuisine and backwater views",
      rating: 4.6,
      price: "$$",
      location: "Kochi",
      address: "Fort Kochi, Kochi",
      bestFor: ["Casual", "Breakfast", "Views"],
      distance: "2 km",
    },
    {
      id: "kc4",
      type: "activity",
      title: "Backwater Cruise",
      description: "Scenic cruise through Kerala's famous backwaters and lagoons",
      rating: 4.7,
      price: "$$",
      location: "Kochi",
      address: "Kochi Backwaters",
      bestFor: ["Scenic", "Relaxation", "Photography"],
      distance: "5 km",
    },
  ],
  amritsar: [
    {
      id: "am1",
      type: "monument",
      title: "Golden Temple",
      description: "Sacred Sikh shrine with stunning golden dome and spiritual significance",
      rating: 4.9,
      price: "$",
      location: "Amritsar",
      address: "Golden Temple, Amritsar",
      bestFor: ["Spiritual", "Culture", "Photography"],
      distance: "2 km",
    },
    {
      id: "am2",
      type: "restaurant",
      title: "Kesar Da Dhaba",
      description: "Legendary restaurant serving authentic Punjabi cuisine",
      rating: 4.7,
      price: "$",
      location: "Amritsar",
      address: "Hall Bazaar, Amritsar",
      bestFor: ["Casual", "Dinner", "Local Food"],
      distance: "3 km",
    },
    {
      id: "am3",
      type: "activity",
      title: "Wagah Border Ceremony",
      description: "Witness the famous border closing ceremony between India and Pakistan",
      rating: 4.8,
      price: "$",
      location: "Amritsar",
      address: "Wagah Border, Amritsar",
      bestFor: ["Culture", "Experience", "Groups"],
      distance: "30 km",
    },
  ],
  pune: [
    {
      id: "p1",
      type: "monument",
      title: "Aga Khan Palace",
      description: "Historic palace with museum and beautiful gardens",
      rating: 4.6,
      price: "$",
      location: "Pune",
      address: "Aga Khan Palace, Pune",
      bestFor: ["History", "Photography", "Heritage"],
      distance: "5 km",
    },
    {
      id: "p2",
      type: "restaurant",
      title: "Vohuman Cafe",
      description: "Traditional Parsi restaurant with authentic recipes",
      rating: 4.6,
      price: "$$",
      location: "Pune",
      address: "Pune",
      bestFor: ["Casual", "Dinner", "Cuisine"],
      distance: "4 km",
    },
    {
      id: "p3",
      type: "activity",
      title: "Pune City Tour",
      description: "Comprehensive tour of Pune's cultural and historical sites",
      rating: 4.5,
      price: "$",
      location: "Pune",
      address: "Pune City",
      bestFor: ["Culture", "History", "Groups"],
      distance: "5 km",
    },
  ],
  chennai: [
    {
      id: "c1",
      type: "monument",
      title: "Kapaleeshwarar Temple",
      description: "Ancient Hindu temple with intricate Dravidian architecture",
      rating: 4.7,
      price: "$",
      location: "Chennai",
      address: "Kapaleeshwarar Temple, Chennai",
      bestFor: ["Spiritual", "Architecture", "Culture"],
      distance: "3 km",
    },
    {
      id: "c2",
      type: "beach",
      title: "Marina Beach",
      description: "One of the longest urban beaches with scenic promenade",
      rating: 4.6,
      price: "$",
      location: "Chennai",
      address: "Marina Beach, Chennai",
      bestFor: ["Beach", "Relaxation", "Scenic"],
      distance: "2 km",
    },
    {
      id: "c3",
      type: "restaurant",
      title: "Saravana Bhavan",
      description: "Popular South Indian vegetarian restaurant chain",
      rating: 4.6,
      price: "$",
      location: "Chennai",
      address: "Chennai",
      bestFor: ["Casual", "Vegetarian", "Local Food"],
      distance: "3 km",
    },
  ],
}

export default function AISuggestionsPage() {
  const [location, setLocation] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [savedSuggestions, setSavedSuggestions] = useState<Suggestion[]>([])

  const [preferences, setPreferences] = useState({
    mood: "casual",
    budget: "medium",
    groupSize: "5-10",
    interests: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("savedSuggestions")
    if (saved) {
      setSavedSuggestions(JSON.parse(saved))
    }
  }, [])

  const handleLocationSearch = async () => {
    if (!location.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const locationKey = location.toLowerCase().trim()
    const results = locationData[locationKey] || []
    const sorted = results.sort((a, b) => {
      const typeOrder = { monument: 0, restaurant: 1, activity: 2, beach: 3 }
      return (typeOrder[a.type] || 4) - (typeOrder[b.type] || 4)
    })

    setSuggestions(sorted)
    setSearchPerformed(true)
    setIsLoading(false)
  }

  const handleSaveSuggestion = (suggestion: Suggestion) => {
    const isAlreadySaved = savedSuggestions.some((s) => s.id === suggestion.id)

    if (isAlreadySaved) {
      const updated = savedSuggestions.filter((s) => s.id !== suggestion.id)
      setSavedSuggestions(updated)
      localStorage.setItem("savedSuggestions", JSON.stringify(updated))
    } else {
      const updated = [...savedSuggestions, suggestion]
      setSavedSuggestions(updated)
      localStorage.setItem("savedSuggestions", JSON.stringify(updated))
    }
  }

  useEffect(() => {
    gsap.fromTo(".suggestion-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 })
  }, [suggestions])

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
            <p className="text-gray-400 mt-2">Get smart recommendations for events and venues based on location</p>
          </div>

          {/* Location Search Card */}
          <Card className="mb-12 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                Search by Location
              </CardTitle>
              <CardDescription>Enter a city name to discover amazing places and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Jodhpur, Delhi, Mumbai, Agra, Jaipur, Goa..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                />
                <Button
                  onClick={handleLocationSearch}
                  disabled={isLoading || !location.trim()}
                  className="gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Try: Jodhpur, Delhi, Mumbai, Agra, Jaipur, Goa, Bangalore, Hyderabad, Kolkata, Varanasi, Udaipur, Kochi,
                Amritsar, Pune, Chennai
              </p>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="mb-12 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" data-scroll-animate>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Refine Your Preferences
              </CardTitle>
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
                    placeholder="e.g., food, culture, adventure"
                    value={preferences.interests}
                    onChange={(e) => setPreferences({ ...preferences, interests: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions Grid */}
          {searchPerformed && suggestions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Places in {location.charAt(0).toUpperCase() + location.slice(1)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="suggestion-card" data-scroll-animate>
                    <Card className="overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all hover:shadow-2xl hover:shadow-yellow-500/20">
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
                            <span>{suggestion.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4 text-purple-400" />
                            {suggestion.distance} away • {suggestion.price}
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

                        <Button
                          onClick={() => handleSaveSuggestion(suggestion)}
                          className={`w-full ${
                            savedSuggestions.some((s) => s.id === suggestion.id)
                              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                              : "bg-gradient-to-r from-yellow-500 to-green-600 hover:from-yellow-600 hover:to-green-700"
                          }`}
                        >
                          {savedSuggestions.some((s) => s.id === suggestion.id) ? "✓ Saved" : "Save Suggestion"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchPerformed && suggestions.length === 0 && (
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="pt-12 text-center">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No suggestions found for "{location}"</p>
                <p className="text-gray-500 text-sm">
                  Try searching for: Jodhpur, Delhi, Mumbai, Agra, Jaipur, Goa, Bangalore, Hyderabad, Kolkata, Varanasi,
                  Udaipur, Kochi, Amritsar, Pune, or Chennai
                </p>
              </CardContent>
            </Card>
          )}

          {!searchPerformed && (
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="pt-12 text-center">
                <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Enter a location to discover amazing places</p>
                <p className="text-gray-500 text-sm">Search by city name to get personalized recommendations</p>
              </CardContent>
            </Card>
          )}
          <AITravelSuggestions />
          </div>
        </div>
        
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div
      className="elfsight-app-eb8c7c29-2151-4dcf-972f-8a1421346872"
      data-elfsight-app-lazy="true"
      ></div>
    </ProtectedRoute>
  )
}

function AITravelSuggestions() {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuggestions([
        `🌄 Visit scenic viewpoints around ${location}`,
        `🍽️ Try local cafes near ${location}`,
        `🎭 Attend cultural events or night markets in ${location}`,
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-700 text-white border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="text-yellow-300" /> AI Travel Recommender
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="location" className="text-white">
              Enter your location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Bangalore"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl transition-transform transform hover:scale-105"
          >
            {loading ? "✨ Thinking..." : "Get Smart Suggestions"}
          </Button>
        </form>

        {suggestions.length > 0 && (
          <ul className="mt-6 space-y-2 animate-fadeIn">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
