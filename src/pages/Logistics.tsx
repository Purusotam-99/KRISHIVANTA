import * as React from "react"
import { useState } from "react"
import { Truck, MapPin, Calendar, Scale, Package, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Logistics() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    cropType: "",
    volume: "",
    pickupLocation: "",
    date: "",
  })

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3))
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4) // Success step
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Request Pickup</h1>
        <p className="text-[#4CAF50]">Book a truck to transport your harvest to the mandi.</p>
      </div>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 h-1 w-full bg-[#E8F5E9] -z-10 -translate-y-1/2"></div>
          <div 
            className="absolute left-0 top-1/2 h-1 bg-[#2E7D32] -z-10 -translate-y-1/2 transition-all duration-300" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white font-bold transition-colors ${
                step >= s ? 'bg-[#2E7D32] text-white' : 'bg-[#C8E6C9] text-[#1B5E20]'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Form Steps */}
      <Card className="border-[#C8E6C9] shadow-md">
        <CardContent className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] flex items-center gap-2">
                <Package className="h-6 w-6 text-[#4CAF50]" /> What are you shipping?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#2E7D32] mb-1.5 block">Crop Type</label>
                  <Input 
                    placeholder="e.g., Tomato, Onion, Wheat" 
                    value={formData.cropType}
                    onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#2E7D32] mb-1.5 block flex items-center gap-1">
                    <Scale className="h-4 w-4" /> Volume / Weight
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      placeholder="Amount" 
                      className="flex-1"
                      value={formData.volume}
                      onChange={(e) => setFormData({...formData, volume: e.target.value})}
                    />
                    <select className="h-12 rounded-xl border border-[#C8E6C9] bg-white px-4 text-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]">
                      <option>Quintals</option>
                      <option>Tons</option>
                      <option>Kg</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-14 text-lg rounded-2xl mt-8" 
                onClick={handleNext}
                disabled={!formData.cropType || !formData.volume}
              >
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] flex items-center gap-2">
                <MapPin className="h-6 w-6 text-[#4CAF50]" /> Where is it located?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#2E7D32] mb-1.5 block">Pickup Address</label>
                  <Input 
                    placeholder="Farm location or village name" 
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  />
                </div>
                
                <div className="bg-[#E8F5E9] p-4 rounded-xl border border-[#C8E6C9] flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1B5E20]">Use Current Location</p>
                    <p className="text-sm text-[#4CAF50]">Allow Krishivanta to access your GPS for precise pickup.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1 h-14 text-lg rounded-2xl" onClick={handleBack}>Back</Button>
                <Button 
                  className="flex-1 h-14 text-lg rounded-2xl" 
                  onClick={handleNext}
                  disabled={!formData.pickupLocation}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#4CAF50]" /> When do you need it?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#2E7D32] mb-1.5 block">Desired Pickup Date</label>
                  <Input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                
                <div className="bg-[#FFF8E1] p-4 rounded-xl border border-[#FFC107] flex items-start gap-3">
                  <Truck className="h-5 w-5 text-[#FFB300] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1B5E20]">Estimated Cost: ₹1,200 - ₹1,500</p>
                    <p className="text-sm text-[#8D6E63]">Final price depends on exact distance to the mandi.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1 h-14 text-lg rounded-2xl" onClick={handleBack}>Back</Button>
                <Button 
                  className="flex-1 h-14 text-lg rounded-2xl bg-[#FFC107] text-black hover:bg-[#FFB300]" 
                  onClick={handleSubmit}
                  disabled={!formData.date}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-8 animate-in zoom-in-95">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32]">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-[#1B5E20]">Booking Confirmed!</h2>
                <p className="text-[#4CAF50] mt-2 max-w-sm mx-auto">
                  Your pickup request for {formData.volume} of {formData.cropType} has been received. A driver will contact you shortly.
                </p>
              </div>
              
              <div className="bg-[#F9FBE7] p-4 rounded-xl border border-[#C8E6C9] inline-block text-left">
                <p className="text-sm text-[#81C784]">Booking ID</p>
                <p className="font-mono font-bold text-[#1B5E20]">KRV-8492-TRK</p>
              </div>

              <div className="pt-4">
                <Button className="h-14 px-8 text-lg rounded-2xl" onClick={() => setStep(1)}>
                  Book Another Truck
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
