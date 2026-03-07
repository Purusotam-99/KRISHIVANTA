import { Outlet, Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Users, TrendingUp, Truck, Globe, FileText, Sprout } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Layout() {
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Crops", path: "/crops", icon: BookOpen },
    { name: "Community", path: "/community", icon: Users },
    { name: "Mandi", path: "/mandi", icon: TrendingUp },
    { name: "Schemes", path: "/schemes", icon: FileText },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FBE7] text-[#1B5E20] font-sans pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#C8E6C9] bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2E7D32] text-white">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2E7D32]">Krishivanta</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button className="flex items-center gap-2 rounded-full border border-[#C8E6C9] bg-white px-3 py-1.5 text-sm font-medium text-[#2E7D32] hover:bg-[#E8F5E9]">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-[#C8E6C9] bg-white px-2 md:hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full",
                isActive ? "text-[#2E7D32]" : "text-[#81C784] hover:text-[#4CAF50]"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Navigation (Desktop) - Optional, but keeping it simple for now as requested mobile-first */}
    </div>
  )
}
