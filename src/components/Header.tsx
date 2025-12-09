import { Cloud, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="glass sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
            Chantemerle
          </h1>
          <p className="text-sm text-gray-700">Réservation de l'appartement</p>
        </div>

        {/* Right: Weather and Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 cursor-pointer hover:bg-white/20">
            <Cloud size={20} className="text-primary-400" />
            <div className="text-sm">
              <p className="text-gray-800">12°C</p>
              <p className="text-xs text-gray-600">Partiellement nuageux</p>
            </div>
          </div>

          <button className="btn-icon hover:bg-primary-500/20">
            <User size={20} className="text-primary-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
