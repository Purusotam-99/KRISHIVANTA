import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BookOpen, Users, TrendingUp, Truck, ThermometerSun, ChevronDown, FileText, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import WeatherWidget from "@/components/WeatherWidget"

const DISTRICTS = [
  "Uttar Pradesh",
  "Punjab",
  "Madhya Pradesh",
  "West Bengal",
  "Odisha"
]

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0])
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    // Update alerts immediately when the selected district changes
    setAlerts([
      {
        id: Date.now(),
        type: "info",
        title: `Weather Update: ${selectedDistrict}`,
        message: `Favorable conditions expected in ${selectedDistrict} this evening. Good time for field preparation.`,
        time: "Just now",
        icon: Info,
        color: "text-[#1976D2]",
        bg: "bg-[#E3F2FD]",
        border: "border-l-[#2196F3]"
      },
      {
        id: Date.now() + 1,
        type: "warning",
        title: "Heatwave Warning",
        message: "Temperatures expected to rise above 38°C tomorrow. Ensure adequate irrigation for your crops.",
        time: "1 hour ago",
        icon: ThermometerSun,
        color: "text-[#FFB300]",
        bg: "bg-[#FFF8E1]",
        border: "border-l-[#FFC107]"
      },
      {
        id: Date.now() + 2,
        type: "success",
        title: "Price Surge: Onion",
        message: `Onion prices in ${selectedDistrict} local Mandi have increased by ₹200/quintal today.`,
        time: "2 hours ago",
        icon: TrendingUp,
        color: "text-[#2E7D32]",
        bg: "bg-[#E8F5E9]",
        border: "border-l-[#2E7D32]",
        action: { label: "View Rates", link: "/mandi" }
      }
    ]);
  }, [selectedDistrict]);

  return (
    <div className="space-y-6">
      {/* Welcome & Weather Widget */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Namaskara, Farmer!</h1>
          <p className="text-[#4CAF50] mt-1">Here's your farm summary for today.</p>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-[#2E7D32]">Select District:</span>
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-[#C8E6C9] rounded-lg py-1.5 pl-3 pr-8 text-sm font-medium text-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] cursor-pointer"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {DISTRICTS.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4CAF50] pointer-events-none" />
            </div>
          </div>
        </div>
        
        <WeatherWidget districtName={selectedDistrict} />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Link to="/crops" className="group">
          <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="rounded-2xl bg-[#E8F5E9] p-4 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B5E20]">Crop Library</h3>
                <p className="text-xs text-[#4CAF50] mt-1">Guides & Info</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/community" className="group">
          <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="rounded-2xl bg-[#FFF8E1] p-4 text-[#FFB300] group-hover:bg-[#FFB300] group-hover:text-white transition-colors">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B5E20]">Community</h3>
                <p className="text-xs text-[#4CAF50] mt-1">Ask Experts</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/mandi" className="group">
          <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="rounded-2xl bg-[#EFEBE9] p-4 text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-colors">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B5E20]">Mandi Rates</h3>
                <p className="text-xs text-[#4CAF50] mt-1">Live Prices</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/logistics" className="group">
          <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="rounded-2xl bg-[#E3F2FD] p-4 text-[#1976D2] group-hover:bg-[#1976D2] group-hover:text-white transition-colors">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B5E20]">Logistics</h3>
                <p className="text-xs text-[#4CAF50] mt-1">Book Pickup</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/schemes" className="group col-span-2 md:col-span-1">
          <Card className="h-full transition-all hover:border-[#4CAF50] hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="rounded-2xl bg-[#F3E5F5] p-4 text-[#8E24AA] group-hover:bg-[#8E24AA] group-hover:text-white transition-colors">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B5E20]">Schemes</h3>
                <p className="text-xs text-[#4CAF50] mt-1">Subsidies & Loans</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity / Alerts */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-[#1B5E20] mb-4">Important Alerts</h2>
        <div className="space-y-3">
          {alerts.map(alert => (
            <Card key={alert.id} className={`border-l-4 ${alert.border} transition-all duration-500 animate-in fade-in slide-in-from-top-4`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`rounded-full ${alert.bg} p-2 ${alert.color} shrink-0 mt-1`}>
                  <alert.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-[#1B5E20]">{alert.title}</h4>
                    <span className="text-xs text-[#81C784]">{alert.time}</span>
                  </div>
                  <p className="text-sm text-[#4CAF50] mt-1">{alert.message}</p>
                  {alert.action && (
                    <Link to={alert.action.link}>
                      <Button variant="outline" size="sm" className="mt-2 h-8">{alert.action.label}</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
