import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Sprout, Wheat, Leaf, Apple } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_CROPS = [
  { id: "tomato", name: "Tomato", category: "Vegetable", season: "Kharif, Rabi", icon: Leaf, color: "text-red-500", bg: "bg-red-50" },
  { id: "onion", name: "Onion", category: "Vegetable", season: "Rabi", icon: Leaf, color: "text-purple-500", bg: "bg-purple-50" },
  { id: "wheat", name: "Wheat", category: "Cereal", season: "Rabi", icon: Wheat, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "rice", name: "Paddy (Rice)", category: "Cereal", season: "Kharif", icon: Sprout, color: "text-green-500", bg: "bg-green-50" },
  { id: "mango", name: "Mango", category: "Fruit", season: "Summer", icon: Apple, color: "text-yellow-500", bg: "bg-yellow-50" },
  { id: "cotton", name: "Cotton", category: "Cash Crop", season: "Kharif", icon: Sprout, color: "text-slate-500", bg: "bg-slate-50" },
  { id: "potato", name: "Potato", category: "Vegetable", season: "Rabi", icon: Leaf, color: "text-amber-700", bg: "bg-amber-100" },
  { id: "sugarcane", name: "Sugarcane", category: "Cash Crop", season: "Kharif", icon: Sprout, color: "text-green-600", bg: "bg-green-100" },
]

export default function CropLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Vegetable", "Cereal", "Fruit", "Cash Crop"]

  const filteredCrops = MOCK_CROPS.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || crop.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Crop Library</h1>
        <p className="text-[#4CAF50]">Explore detailed guides for your crops.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#81C784]" />
          <Input 
            placeholder="Search crops (e.g., Tomato, Wheat)..." 
            className="pl-10 h-14 rounded-2xl text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="lg" className="shrink-0 h-14 rounded-2xl gap-2">
          <Filter className="h-5 w-5" /> Filters
        </Button>
      </div>

      {/* Categories Scrollable Row */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="rounded-full whitespace-nowrap"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCrops.map(crop => (
          <Link key={crop.id} to={`/crops/${crop.id}`}>
            <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`rounded-2xl ${crop.bg} p-4 ${crop.color}`}>
                  <crop.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1B5E20]">{crop.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32]">{crop.category}</Badge>
                    <span className="text-xs text-[#81C784]">{crop.season}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredCrops.length === 0 && (
          <div className="col-span-full py-12 text-center text-[#4CAF50]">
            <Sprout className="mx-auto h-12 w-12 opacity-50 mb-4" />
            <p className="text-lg font-medium">No crops found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
