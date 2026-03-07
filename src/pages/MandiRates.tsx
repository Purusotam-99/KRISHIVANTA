import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, MapPin, Search, Filter, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const INITIAL_RATES = [
  { id: 1, crop: "Tomato", market: "Agra, Uttar Pradesh", price: 2400, unit: "Quintal", trend: "up", change: "+₹150" },
  { id: 2, crop: "Onion", market: "Nashik, Maharashtra", price: 1850, unit: "Quintal", trend: "down", change: "-₹50" },
  { id: 3, crop: "Wheat", market: "Khanna, Punjab", price: 2275, unit: "Quintal", trend: "stable", change: "₹0" },
  { id: 4, crop: "Cotton", market: "Rajkot, Gujarat", price: 7100, unit: "Quintal", trend: "up", change: "+₹300" },
  { id: 5, crop: "Paddy", market: "Karnal, Haryana", price: 3100, unit: "Quintal", trend: "up", change: "+₹50" },
]

export default function MandiRates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [rates, setRates] = useState(INITIAL_RATES)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchRates = async () => {
    setIsRefreshing(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate real-time price fluctuations
    const updatedRates = rates.map(rate => {
      const fluctuation = Math.floor(Math.random() * 100) - 50 // Random change between -50 and +50
      const newPrice = rate.price + fluctuation
      
      let newTrend = "stable"
      let newChange = "₹0"
      
      if (fluctuation > 0) {
        newTrend = "up"
        newChange = `+₹${fluctuation}`
      } else if (fluctuation < 0) {
        newTrend = "down"
        newChange = `-₹${Math.abs(fluctuation)}`
      }

      return {
        ...rate,
        price: newPrice,
        trend: newTrend,
        change: newChange
      }
    })

    setRates(updatedRates)
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  useEffect(() => {
    // Fetch new data every 30 minutes (30 * 60 * 1000 ms)
    const interval = setInterval(() => {
      fetchRates()
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [rates]) // Re-bind interval with latest rates

  const filteredRates = rates.filter(rate => 
    rate.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rate.market.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Live Mandi Rates</h1>
          <p className="text-[#4CAF50]">Real-time crop prices across major markets.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#2E7D32] bg-[#E8F5E9] px-4 py-2 rounded-full w-fit">
          <span>Last updated: {formatTime(lastUpdated)}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-[#C8E6C9]"
            onClick={fetchRates}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#81C784]" />
          <Input 
            placeholder="Search by crop or market..." 
            className="pl-10 h-14 rounded-2xl text-lg border-[#C8E6C9] focus-visible:ring-[#2E7D32]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="lg" className="shrink-0 h-14 rounded-2xl gap-2 border-[#C8E6C9] text-[#2E7D32] hover:bg-[#E8F5E9]">
          <Filter className="h-5 w-5" /> Filter by District
        </Button>
      </div>

      {/* Rates List */}
      <div className="space-y-4">
        {filteredRates.map(rate => (
          <Card key={rate.id} className="border-[#C8E6C9] shadow-sm hover:border-[#4CAF50] transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#E8F5E9] p-4 text-[#2E7D32]">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1B5E20]">{rate.crop}</h3>
                  <div className="flex items-center gap-1 text-[#4CAF50] mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{rate.market}</span>
                  </div>
                  <p className="text-xs text-[#81C784] mt-2">Updated: Today, {formatTime(lastUpdated)}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-[#E8F5E9] pt-4 md:pt-0 mt-2 md:mt-0">
                <div className="text-2xl font-bold text-[#1B5E20]">
                  ₹{rate.price.toLocaleString('en-IN')} <span className="text-sm font-normal text-[#4CAF50]">/ {rate.unit}</span>
                </div>
                
                <div className={`flex items-center gap-1 font-medium mt-1 ${
                  rate.trend === 'up' ? 'text-green-600' : 
                  rate.trend === 'down' ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {rate.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                  {rate.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                  {rate.trend === 'stable' && <span className="text-lg leading-none">-</span>}
                  {rate.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRates.length === 0 && (
          <div className="py-12 text-center text-[#4CAF50] bg-white rounded-2xl border border-[#C8E6C9]">
            <Search className="mx-auto h-12 w-12 opacity-50 mb-4" />
            <p className="text-lg font-medium">No rates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
