import { useState, useEffect } from "react"
import { MessageSquare, ThumbsUp, Share2, Filter, PenSquare, Globe, MapPin, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "mr", name: "मराठी" },
]

const STATES = [
  "All States",
  "Uttar Pradesh",
  "Punjab",
  "Madhya Pradesh",
  "West Bengal",
  "Odisha"
]

const MOCK_POSTS = [
  {
    id: 1,
    author: "Ramesh Gowda",
    role: "Farmer",
    time: "2 hours ago",
    state: "Uttar Pradesh",
    content: {
      en: "My tomato leaves are turning yellow and curling upwards. I've been watering every 3 days. What could be the issue?",
      hi: "मेरे टमाटर के पत्ते पीले हो रहे हैं और ऊपर की ओर मुड़ रहे हैं। मैं हर 3 दिन में पानी दे रहा हूँ। क्या समस्या हो सकती है?",
      kn: "ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತಿವೆ ಮತ್ತು ಮೇಲಕ್ಕೆ ಸುರುಳಿಯಾಗುತ್ತಿವೆ. ನಾನು ಪ್ರತಿ 3 ದಿನಗಳಿಗೊಮ್ಮೆ ನೀರು ಹಾಕುತ್ತಿದ್ದೇನೆ. ಸಮಸ್ಯೆ ಏನಾಗಿರಬಹುದು?",
      mr: "माझ्या टोमॅटोची पाने पिवळी पडत आहेत आणि वरच्या दिशेने वळत आहेत. मी दर 3 दिवसांनी पाणी देत आहे. काय समस्या असू शकते?"
    },
    tags: ["Tomato", "Disease", "Yellowing"],
    likes: 12,
    comments: 4,
    expertAnswer: {
      en: "This looks like Tomato Leaf Curl Virus transmitted by whiteflies. You should immediately remove and destroy the infected plants to prevent the virus from spreading. Spraying neem oil or a recommended insecticide can help control the whitefly population.",
      hi: "यह सफेद मक्खियों द्वारा प्रेषित टमाटर लीफ कर्ल वायरस जैसा दिखता है। आपको वायरस को फैलने से रोकने के लिए तुरंत संक्रमित पौधों को हटा देना चाहिए और नष्ट कर देना चाहिए। नीम के तेल या अनुशंसित कीटनाशक का छिड़काव सफेद मक्खी की आबादी को नियंत्रित करने में मदद कर सकता है।",
      kn: "ಇದು ಬಿಳಿನೊಣಗಳಿಂದ ಹರಡುವ ಟೊಮೆಟೊ ಲೀಫ್ ಕರ್ಲ್ ವೈರಸ್‌ನಂತೆ ಕಾಣುತ್ತದೆ. ವೈರಸ್ ಹರಡುವುದನ್ನು ತಡೆಯಲು ನೀವು ತಕ್ಷಣ ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತೆಗೆದುಹಾಕಬೇಕು ಮತ್ತು ನಾಶಪಡಿಸಬೇಕು. ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕವನ್ನು ಸಿಂಪಡಿಸುವುದು ಬಿಳಿನೊಣಗಳ ಸಂಖ್ಯೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      mr: "हे पांढऱ्या माश्यांमुळे पसरणाऱ्या टोमॅटो लीफ कर्ल व्हायरससारखे दिसते. व्हायरस पसरण्यापासून रोखण्यासाठी तुम्ही त्वरित संक्रमित झाडे काढून टाकली पाहिजेत आणि नष्ट केली पाहिजेत. कडुनिंबाचे तेल किंवा शिफारस केलेल्या कीटकनाशकाची फवारणी केल्यास पांढऱ्या माशीची लोकसंख्या नियंत्रित होण्यास मदत होऊ शकते."
    },
  },
  {
    id: 2,
    author: "Dr. Anjali Desai",
    role: "Agronomist",
    time: "5 hours ago",
    state: "Madhya Pradesh",
    content: {
      en: "Reminder: With the upcoming monsoon, ensure your fields have proper drainage to prevent root rot in early Kharif crops.",
      hi: "अनुस्मारक: आगामी मानसून के साथ, सुनिश्चित करें कि आपके खेतों में जल निकासी की उचित व्यवस्था हो ताकि शुरुआती खरीफ फसलों में जड़ सड़न को रोका जा सके।",
      kn: "ನೆನಪೋಲೆ: ಮುಂಬರುವ ಮುಂಗಾರಿನೊಂದಿಗೆ, ಆರಂಭಿಕ ಮುಂಗಾರು ಬೆಳೆಗಳಲ್ಲಿ ಬೇರು ಕೊಳೆಯುವುದನ್ನು ತಡೆಯಲು ನಿಮ್ಮ ಹೊಲಗಳಲ್ಲಿ ಸರಿಯಾದ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಇದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      mr: "स्मरणपत्र: आगामी मान्सूनसह, सुरुवातीच्या खरीप पिकांमध्ये मूळ कुजणे टाळण्यासाठी तुमच्या शेतात पाण्याचा निचरा होण्याची योग्य व्यवस्था असल्याची खात्री करा."
    },
    tags: ["Monsoon", "Drainage", "General Advice"],
    likes: 45,
    comments: 8,
    expertAnswer: null,
  },
  {
    id: 3,
    author: "Suresh Kumar",
    role: "Farmer",
    time: "1 day ago",
    state: "Punjab",
    content: {
      en: "What is the current market rate for organic turmeric in Erode mandi? Is it better to hold or sell now?",
      hi: "इरोड मंडी में जैविक हल्दी का वर्तमान बाजार भाव क्या है? क्या अभी इसे रखना बेहतर है या बेचना?",
      kn: "ಈರೋಡ್ ಮಂಡಿಯಲ್ಲಿ ಸಾವಯವ ಅರಿಶಿನದ ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ದರ ಎಷ್ಟು? ಈಗ ಅದನ್ನು ಇಟ್ಟುಕೊಳ್ಳುವುದು ಉತ್ತಮವೇ ಅಥವಾ ಮಾರಾಟ ಮಾಡುವುದೇ?",
      mr: "इरोड मंडीमध्ये सेंद्रिय हळदीचा सध्याचा बाजारभाव काय आहे? आता ते ठेवणे चांगले की विकणे?"
    },
    tags: ["Turmeric", "Market Price"],
    likes: 5,
    comments: 2,
    expertAnswer: null,
  }
]

export default function Community() {
  const [activeTab, setActiveTab] = useState("All")
  const [language, setLanguage] = useState("en")
  const [selectedState, setSelectedState] = useState("All States")
  
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [isAsking, setIsAsking] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")

  // Simulate real-time incoming posts
  useEffect(() => {
    const interval = setInterval(() => {
      const newPost = {
        id: Date.now(),
        author: "New Farmer",
        role: "Farmer",
        time: "Just now",
        state: "West Bengal",
        content: {
          en: "What is the best time to sow Kharif crops this year?",
          hi: "इस साल खरीफ फसलों की बुवाई का सबसे अच्छा समय क्या है?",
          kn: "ಈ ವರ್ಷ ಮುಂಗಾರು ಬೆಳೆಗಳನ್ನು ಬಿತ್ತಲು ಉತ್ತಮ ಸಮಯ ಯಾವುದು?",
          mr: "या वर्षी खरीप पिकांची पेरणी करण्यासाठी सर्वोत्तम वेळ कोणती?"
        },
        tags: ["Kharif", "Sowing"],
        likes: 0,
        comments: 0,
        expertAnswer: null,
      };
      setPosts(prev => [newPost, ...prev]);
    }, 45000); // Add a new post every 45 seconds to simulate real-time updates

    return () => clearInterval(interval);
  }, []);

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const post = {
      id: Date.now(),
      author: "You",
      role: "Farmer",
      time: "Just now",
      state: selectedState === "All States" ? "Uttar Pradesh" : selectedState,
      content: {
        en: newQuestion,
        hi: newQuestion,
        kn: newQuestion,
        mr: newQuestion,
      },
      tags: ["Question"],
      likes: 0,
      comments: 0,
      expertAnswer: null,
    };
    
    setPosts([post, ...posts]);
    setNewQuestion("");
    setIsAsking(false);
  }

  const filteredPosts = posts.filter(post => {
    if (selectedState !== "All States" && post.state !== selectedState) return false;
    if (activeTab === "Expert Answers" && !post.expertAnswer) return false;
    if (activeTab === "My Questions" && post.author !== "You") return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B5E20]">Krishi Community</h1>
          <p className="text-[#4CAF50]">Ask questions, share knowledge, grow together.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-[#C8E6C9] rounded-2xl px-3 h-14 cursor-pointer" onClick={() => {
              const select = document.getElementById('state-select');
              if (select) select.focus();
            }}>
              <MapPin className="h-5 w-5 text-[#4CAF50]" />
              <select 
                id="state-select"
                className="h-full bg-transparent text-sm font-medium text-[#1B5E20] focus:outline-none cursor-pointer appearance-none pr-6 relative z-10"
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
          
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-[#C8E6C9] rounded-2xl px-3 h-14 cursor-pointer" onClick={() => {
              const select = document.getElementById('lang-select');
              if (select) select.focus();
            }}>
              <Globe className="h-5 w-5 text-[#4CAF50]" />
              <select 
                id="lang-select"
                className="h-full bg-transparent text-sm font-medium text-[#1B5E20] focus:outline-none cursor-pointer appearance-none pr-6 relative z-10"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4CAF50] pointer-events-none z-0" />
            </div>
          </div>
          <Button 
            size="lg" 
            className="shrink-0 gap-2 rounded-2xl h-14 w-full sm:w-auto"
            onClick={() => setIsAsking(true)}
          >
            <PenSquare className="h-5 w-5" /> Ask a Question
          </Button>
        </div>
      </div>

      {/* Ask Question Form */}
      {isAsking && (
        <Card className="border-[#2E7D32] shadow-md animate-in fade-in slide-in-from-top-4">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-[#1B5E20]">Ask the Community</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsAsking(false)} className="h-8 w-8 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-[#C8E6C9] p-4 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] resize-none"
              placeholder="What's your question? (e.g., My tomato leaves are turning yellow...)"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAsking(false)}>Cancel</Button>
              <Button onClick={handleAskQuestion} disabled={!newQuestion.trim()}>Post Question</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Input 
            placeholder="Search discussions..." 
            className="h-14 rounded-2xl text-lg pl-4"
          />
        </div>
        <Button variant="outline" size="lg" className="shrink-0 h-14 rounded-2xl gap-2">
          <Filter className="h-5 w-5" /> Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {["All", "My Questions", "Expert Answers", "Trending"].map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className="rounded-full whitespace-nowrap"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="border-[#C8E6C9] shadow-sm hover:border-[#4CAF50] transition-colors">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1B5E20] flex items-center gap-2">
                    {post.author}
                    {post.role === "Agronomist" && (
                      <Badge variant="secondary" className="bg-[#FFF8E1] text-[#FFB300] text-[10px] h-5 px-1.5">Expert</Badge>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#81C784]">
                    <span>{post.time}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {post.state}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#2E7D32] text-lg leading-relaxed">
                {post.content[language as keyof typeof post.content] || post.content.en}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[#4CAF50] border-[#C8E6C9] bg-[#F9FBE7]">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {post.expertAnswer && (
                <div className="bg-[#E8F5E9] rounded-xl p-3 border border-[#C8E6C9] flex items-start gap-2 mt-4">
                  <div className="bg-[#2E7D32] text-white rounded-full p-1 shrink-0">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1B5E20] flex items-center gap-1">
                      Expert Answered
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </p>
                    <p className="text-sm text-[#2E7D32] mt-1">
                      {post.expertAnswer[language as keyof typeof post.expertAnswer] || post.expertAnswer.en}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 pt-4 border-t border-[#E8F5E9]">
                <button className="flex items-center gap-2 text-[#4CAF50] hover:text-[#2E7D32] transition-colors">
                  <ThumbsUp className="h-5 w-5" />
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[#4CAF50] hover:text-[#2E7D32] transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">{post.comments} Answers</span>
                </button>
                <button className="flex items-center gap-2 text-[#4CAF50] hover:text-[#2E7D32] transition-colors ml-auto">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <div className="py-12 text-center text-[#4CAF50]">
            <MessageSquare className="mx-auto h-12 w-12 opacity-50 mb-4" />
            <p className="text-lg font-medium">No posts found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
