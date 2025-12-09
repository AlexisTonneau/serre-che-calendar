import { Cloud, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface WeatherData {
  temperature: number
  condition: string
  iconClass: string
}

export default function Header() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        // Using Open-Meteo API - free, no API key required
        // Location: Alpe d'Huez, France (44.9262°N, 6.6072°E)
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=44.9262&longitude=6.6072&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=Europe/Paris'
        )

        if (!response.ok) throw new Error('Weather API error')

        const data = await response.json()
        const current = data.current

        // Map WMO weather codes to French descriptions
        const weatherDescriptions: Record<number, string> = {
          0: 'Ciel dégagé',
          1: 'Légèrement nuageux',
          2: 'Partiellement nuageux',
          3: 'Très nuageux',
          45: 'Brumeux',
          48: 'Brumeux givrant',
          51: 'Bruine légère',
          53: 'Bruine modérée',
          55: 'Bruine dense',
          61: 'Pluie légère',
          63: 'Pluie modérée',
          65: 'Pluie dense',
          80: 'Averses légères',
          81: 'Averses modérées',
          82: 'Averses violentes',
          95: 'Orage',
          96: 'Orage avec grêle',
          99: 'Orage avec grêle'
        }

        const temp = Math.round(current.temperature_2m)
        const code = current.weather_code
        const condition = weatherDescriptions[code] || 'Condition inconnue'

        // Determine icon color based on weather code
        let iconClass = 'text-amber-400'
        if (code === 0) iconClass = 'text-yellow-400'
        else if (code <= 3 || code === 45 || code === 48) iconClass = 'text-slate-300'
        else if (code >= 51 && code <= 82) iconClass = 'text-blue-400'
        else if (code >= 95) iconClass = 'text-red-400'

        setWeather({
          temperature: temp,
          condition,
          iconClass
        })
      } catch (error) {
        console.error('Error fetching weather:', error)
        setWeather({
          temperature: 0,
          condition: 'Données indisponibles',
          iconClass: 'text-slate-400'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="glass sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Chantemerle Logo"
            className="w-12 h-12 rounded-lg bg-white/20 p-1"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">
              Chantemerle
            </h1>
            <p className="text-sm text-amber-100/70">Réservation de l'appartement</p>
          </div>
        </div>

        {/* Right: Weather */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 cursor-pointer hover:bg-white/20">
            {isLoading ? (
              <>
                <AlertCircle size={20} className="text-slate-400 animate-spin" />
                <div className="text-sm">
                  <p className="text-slate-200">Chargement...</p>
                </div>
              </>
            ) : weather ? (
              <>
                <Cloud size={20} className={weather.iconClass} />
                <div className="text-sm">
                  <p className="text-slate-200">{weather.temperature}°C</p>
                  <p className="text-xs text-slate-400">{weather.condition}</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle size={20} className="text-slate-400" />
                <div className="text-sm">
                  <p className="text-slate-400 text-xs">Erreur météo</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
