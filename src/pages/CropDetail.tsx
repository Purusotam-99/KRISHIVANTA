import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Droplets, Bug, Sprout, Sun, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_CROP_DATA = {
  tomato: {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    description: "A versatile and widely grown vegetable crop, requiring warm weather and well-drained soil.",
    seasonality: "Kharif (Jun-Jul), Rabi (Oct-Nov), Summer (Jan-Feb)",
    soil: "Well-drained sandy loam to clay loam with pH 6.0-7.0",
    irrigation: "Drip irrigation recommended. Water every 3-4 days during summer, 10-15 days in winter.",
    pests: ["Fruit Borer", "Whitefly", "Leaf Miner"],
    fertilizer: "NPK 120:80:80 kg/ha. Apply half N and full P & K as basal dose.",
    temperature: "21°C to 24°C ideal for growth.",
  },
  onion: {
    name: "Onion",
    scientificName: "Allium cepa",
    description: "A widely cultivated vegetable crop known for its pungent bulbs, used globally as a staple ingredient.",
    seasonality: "Kharif (May-Jul), Late Kharif (Aug-Sep), Rabi (Oct-Nov)",
    soil: "Well-drained sandy loam to clay loam with pH 6.5-7.5",
    irrigation: "Requires frequent light irrigation. Stop watering 10-15 days before harvesting.",
    pests: ["Thrips", "Onion Maggot", "Cutworms"],
    fertilizer: "NPK 100:50:50 kg/ha. Apply half N and full P & K before transplanting.",
    temperature: "13°C to 24°C ideal for vegetative growth, higher for bulb development.",
  },
  wheat: {
    name: "Wheat",
    scientificName: "Triticum aestivum",
    description: "A major cereal crop grown worldwide, primarily cultivated during the winter season in India.",
    seasonality: "Rabi (Oct-Nov to Mar-Apr)",
    soil: "Well-drained clay loam to loam soils with good water holding capacity.",
    irrigation: "4-6 irrigations required at critical growth stages like crown root initiation, tillering, and flowering.",
    pests: ["Termites", "Aphids", "Brown Plant Hopper"],
    fertilizer: "NPK 120:60:40 kg/ha. Apply half N and full P & K at sowing.",
    temperature: "15°C to 25°C ideal for growth.",
  },
  rice: {
    name: "Paddy (Rice)",
    scientificName: "Oryza sativa",
    description: "A staple food crop for a large part of the world's human population, especially in Asia.",
    seasonality: "Kharif (Jun-Jul to Nov-Dec)",
    soil: "Heavy clay soils with high water holding capacity are ideal.",
    irrigation: "Requires continuous standing water (2-5 cm) during most of the vegetative stage.",
    pests: ["Stem Borer", "Leaf Folder", "Brown Plant Hopper"],
    fertilizer: "NPK 100:50:50 kg/ha. Apply N in 3 split doses.",
    temperature: "20°C to 35°C ideal for growth.",
  },
  mango: {
    name: "Mango",
    scientificName: "Mangifera indica",
    description: "Known as the 'King of Fruits', mango is a tropical fruit tree cultivated in many parts of India.",
    seasonality: "Summer (Flowering in Dec-Jan, Harvesting in Apr-Jul)",
    soil: "Deep, well-drained, loamy soils with pH 5.5-7.5.",
    irrigation: "Irrigate every 10-15 days during fruit development. Stop irrigation 2-3 weeks before harvesting.",
    pests: ["Mango Hopper", "Mealybug", "Fruit Fly"],
    fertilizer: "Varies by age. For a 10-year-old tree: NPK 1000:500:1000 g/tree/year.",
    temperature: "24°C to 27°C ideal for growth.",
  },
  cotton: {
    name: "Cotton",
    scientificName: "Gossypium spp.",
    description: "A major cash crop grown for its fiber, requiring a long frost-free period and plenty of sunshine.",
    seasonality: "Kharif (May-Jul to Oct-Dec)",
    soil: "Deep black soils (Regur) are ideal, but can be grown in well-drained alluvial soils.",
    irrigation: "Requires 3-4 irrigations depending on rainfall. Critical stages are flowering and boll formation.",
    pests: ["Bollworm", "Whitefly", "Aphids", "Jassids"],
    fertilizer: "NPK 120:60:60 kg/ha. Apply N in split doses.",
    temperature: "21°C to 30°C ideal for growth.",
  },
  potato: {
    name: "Potato",
    scientificName: "Solanum tuberosum",
    description: "A starchy root vegetable native to the Americas that is consumed as a staple food in many parts of the world.",
    seasonality: "Rabi (Oct-Nov to Feb-Mar)",
    soil: "Well-drained, loose, friable sandy loam or silt loam soils with pH 5.5-6.5.",
    irrigation: "Requires frequent light irrigations. Maintain uniform soil moisture for good tuber development.",
    pests: ["Aphids", "Potato Tuber Moth", "White Grubs"],
    fertilizer: "NPK 150:100:120 kg/ha. Apply full P & K and half N at planting.",
    temperature: "15°C to 20°C ideal for tuber growth.",
  },
  sugarcane: {
    name: "Sugarcane",
    scientificName: "Saccharum officinarum",
    description: "A tall perennial grass used primarily for sugar production, requiring a long, warm growing season.",
    seasonality: "Kharif (Eksali: Jan-Feb, Adsali: Jul-Aug)",
    soil: "Deep, well-drained, rich loamy soils with pH 6.5-7.5.",
    irrigation: "High water requirement. Irrigate every 10-15 days during summer and 20-25 days during winter.",
    pests: ["Early Shoot Borer", "Internode Borer", "Termites"],
    fertilizer: "NPK 250:100:100 kg/ha. Apply N in 3-4 split doses.",
    temperature: "28°C to 32°C ideal for growth.",
  }
}

export default function CropDetail() {
  const { id } = useParams<{ id: string }>()
  const crop = MOCK_CROP_DATA[id as keyof typeof MOCK_CROP_DATA]

  if (!crop) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-[#1B5E20]">Crop not found</h2>
        <Link to="/crops"><Button>Back to Library</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/crops">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">{crop.name}</h1>
          <p className="text-[#4CAF50] italic">{crop.scientificName}</p>
        </div>
      </div>

      <p className="text-lg text-[#2E7D32] leading-relaxed">{crop.description}</p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Calendar className="h-5 w-5 text-[#4CAF50]" /> Seasonality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E7D32]">{crop.seasonality}</p>
          </CardContent>
        </Card>

        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Thermometer className="h-5 w-5 text-[#FFC107]" /> Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E7D32]">{crop.temperature}</p>
          </CardContent>
        </Card>

        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Sprout className="h-5 w-5 text-[#8D6E63]" /> Soil Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E7D32]">{crop.soil}</p>
          </CardContent>
        </Card>

        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Droplets className="h-5 w-5 text-blue-500" /> Irrigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E7D32]">{crop.irrigation}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pests & Fertilizers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1B5E20] mt-8">Management</h2>
        
        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Bug className="h-5 w-5 text-red-500" /> Common Pests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {crop.pests.map(pest => (
                <Badge key={pest} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
                  {pest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#C8E6C9] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
              <Sun className="h-5 w-5 text-[#FFC107]" /> Fertilizer Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2E7D32]">{crop.fertilizer}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Ask Community CTA */}
      <div className="mt-8 bg-[#E8F5E9] rounded-2xl p-6 text-center border border-[#C8E6C9]">
        <h3 className="text-xl font-bold text-[#1B5E20] mb-2">Have a specific question?</h3>
        <p className="text-[#4CAF50] mb-4">Ask our community of experts and fellow farmers.</p>
        <Link to="/community" className="w-full sm:w-auto block sm:inline-block">
          <Button size="lg" className="w-full">Ask the Community</Button>
        </Link>
      </div>
    </div>
  )
}
