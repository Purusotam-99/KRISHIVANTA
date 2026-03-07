import { useState } from "react"
import { Search, Filter, MapPin, Leaf, FileText, CheckCircle2, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const STATES = [
  "All States",
  "Central Government",
  "Uttar Pradesh",
  "Punjab",
  "Madhya Pradesh",
  "West Bengal",
  "Odisha"
]

const CROP_TYPES = [
  "All Crops",
  "Cereals",
  "Pulses",
  "Horticulture",
  "Cash Crops",
  "Oilseeds"
]

const MOCK_SCHEMES = [
  {
    id: 1,
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    provider: "Central Government",
    type: "Financial Assistance",
    amount: "₹6,000 per year",
    description: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    eligibility: "All landholding farmers subject to certain exclusion criteria.",
    crops: ["All Crops"],
    state: "Central Government",
    deadline: "Ongoing",
    link: "#"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    provider: "Central Government",
    type: "Crop Insurance",
    amount: "Varies",
    description: "Comprehensive crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
    eligibility: "Farmers growing notified crops in notified areas.",
    crops: ["Cereals", "Pulses", "Oilseeds", "Horticulture"],
    state: "Central Government",
    deadline: "Before sowing season",
    link: "#"
  },
  {
    id: 3,
    title: "Krishi Bhagya Scheme",
    provider: "Uttar Pradesh State Government",
    type: "Subsidy",
    amount: "Up to 90% subsidy",
    description: "Subsidy for constructing Krishi Hondas (farm ponds) to harvest rainwater and improve irrigation.",
    eligibility: "Farmers in rain-fed agricultural areas of Uttar Pradesh.",
    crops: ["All Crops"],
    state: "Uttar Pradesh",
    deadline: "March 31, 2026",
    link: "#"
  },
  {
    id: 4,
    title: "Mahatma Jyotirao Phule Shetkari Karjmukti Yojana",
    provider: "Madhya Pradesh State Government",
    type: "Loan Waiver",
    amount: "Up to ₹2 Lakhs",
    description: "Debt relief scheme for farmers who have outstanding crop loans.",
    eligibility: "Farmers with outstanding crop loans up to ₹2 lakhs.",
    crops: ["All Crops"],
    state: "Madhya Pradesh",
    deadline: "Ongoing",
    link: "#"
  },
  {
    id: 5,
    title: "National Horticulture Mission (NHM)",
    provider: "Central Government",
    type: "Subsidy",
    amount: "Up to 50% of cost",
    description: "Financial assistance for setting up greenhouses, shade net houses, and planting material for horticulture crops.",
    eligibility: "Farmers cultivating fruits, vegetables, root & tuber crops, mushrooms, spices, flowers, aromatic plants, coconut, cashew, cocoa and bamboo.",
    crops: ["Horticulture"],
    state: "Central Government",
    deadline: "Ongoing",
    link: "#"
  },
  {
    id: 6,
    title: "Mukhya Mantri Krishi Ashirwad Yojana",
    provider: "West Bengal State Government",
    type: "Financial Assistance",
    amount: "₹5,000 per acre",
    description: "Financial assistance to farmers for purchasing seeds, fertilizers, and other agricultural inputs.",
    eligibility: "Small and marginal farmers in West Bengal.",
    crops: ["All Crops"],
    state: "West Bengal",
    deadline: "Ongoing",
    link: "#"
  }
]

export default function Schemes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedCrop, setSelectedCrop] = useState("All Crops")

  const filteredSchemes = MOCK_SCHEMES.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "All States" || scheme.state === selectedState || scheme.state === "Central Government";
    const matchesCrop = selectedCrop === "All Crops" || scheme.crops.includes("All Crops") || scheme.crops.includes(selectedCrop);
    
    return matchesSearch && matchesState && matchesCrop;
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Schemes & Subsidies</h1>
          <p className="text-[#4CAF50]">Find financial assistance, loan waivers, and government schemes.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4CAF50]" />
          <Input 
            placeholder="Search schemes, subsidies..." 
            className="h-14 rounded-2xl text-lg pl-10 border-[#C8E6C9] focus-visible:ring-[#2E7D32]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1 md:flex-none md:w-48">
            <div className="flex items-center gap-2 bg-white border border-[#C8E6C9] rounded-2xl px-3 h-14 cursor-pointer" onClick={() => {
              const select = document.getElementById('state-filter');
              if (select) select.focus();
            }}>
              <MapPin className="h-5 w-5 text-[#4CAF50] shrink-0" />
              <select 
                id="state-filter"
                className="h-full w-full bg-transparent text-sm font-medium text-[#1B5E20] focus:outline-none cursor-pointer appearance-none pr-6 relative z-10"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4CAF50] pointer-events-none z-0" />
            </div>
          </div>
          
          <div className="relative flex-1 md:flex-none md:w-48">
            <div className="flex items-center gap-2 bg-white border border-[#C8E6C9] rounded-2xl px-3 h-14 cursor-pointer" onClick={() => {
              const select = document.getElementById('crop-filter');
              if (select) select.focus();
            }}>
              <Leaf className="h-5 w-5 text-[#4CAF50] shrink-0" />
              <select 
                id="crop-filter"
                className="h-full w-full bg-transparent text-sm font-medium text-[#1B5E20] focus:outline-none cursor-pointer appearance-none pr-6 relative z-10"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                {CROP_TYPES.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4CAF50] pointer-events-none z-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm font-medium text-[#2E7D32]">
        Showing {filteredSchemes.length} schemes
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map(scheme => (
          <Card key={scheme.id} className="border-[#C8E6C9] shadow-sm hover:border-[#4CAF50] transition-all flex flex-col h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-4 mb-2">
                <Badge variant={scheme.provider === "Central Government" ? "default" : "secondary"} className={scheme.provider === "Central Government" ? "bg-[#1B5E20]" : "bg-[#FFF8E1] text-[#FFB300]"}>
                  {scheme.provider}
                </Badge>
                <Badge variant="outline" className="border-[#4CAF50] text-[#2E7D32] bg-[#E8F5E9]">
                  {scheme.type}
                </Badge>
              </div>
              <CardTitle className="text-xl text-[#1B5E20] leading-tight">{scheme.title}</CardTitle>
              <p className="text-[#2E7D32] font-semibold text-lg mt-1">
                {scheme.amount}
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <p className="text-[#4CAF50] text-sm leading-relaxed flex-1">
                {scheme.description}
              </p>
              
              <div className="space-y-2 bg-[#F9FBE7] p-3 rounded-xl border border-[#E8F5E9]">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span className="text-[#2E7D32]"><span className="font-semibold">Eligibility:</span> {scheme.eligibility}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Leaf className="h-4 w-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span className="text-[#2E7D32]"><span className="font-semibold">Applicable Crops:</span> {scheme.crops.join(", ")}</span>
                </div>
              </div>
              
              <div className="pt-2 flex items-center justify-between border-t border-[#E8F5E9] mt-auto">
                <div className="text-xs text-[#81C784] font-medium">
                  Deadline: {scheme.deadline}
                </div>
                <Button variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9]">
                  <FileText className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredSchemes.length === 0 && (
          <div className="col-span-full py-12 text-center text-[#4CAF50] bg-white rounded-2xl border border-[#C8E6C9]">
            <FileText className="mx-auto h-12 w-12 opacity-50 mb-4" />
            <p className="text-lg font-medium">No schemes found matching your criteria.</p>
            <Button 
              variant="ghost" 
              className="text-[#2E7D32] mt-2 underline"
              onClick={() => {
                setSearchQuery("");
                setSelectedState("All States");
                setSelectedCrop("All Crops");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
