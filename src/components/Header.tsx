import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog } from 'lucide-react'

interface WeatherData {
  temperature: number
  condition: string
  Icon: typeof Cloud
  tint: string
}

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'Ciel dégagé',
  1: 'Peu nuageux',
  2: 'Partiellement nuageux',
  3: 'Très nuageux',
  45: 'Brumeux',
  48: 'Brume givrante',
  51: 'Bruine légère',
  53: 'Bruine',
  55: 'Bruine dense',
  61: 'Pluie légère',
  63: 'Pluie',
  65: 'Pluie dense',
  71: 'Neige légère',
  73: 'Neige',
  75: 'Neige dense',
  77: 'Grésil',
  80: 'Averses',
  81: 'Averses modérées',
  82: 'Fortes averses',
  85: 'Averses de neige',
  86: 'Fortes averses de neige',
  95: 'Orage',
  96: 'Orage, grêle',
  99: 'Fort orage, grêle',
}

function iconForCode(code: number): { Icon: typeof Cloud; tint: string } {
  if (code === 0) return { Icon: Sun, tint: 'text-ochre-500' }
  if (code <= 3) return { Icon: Cloud, tint: 'text-ink-500' }
  if (code === 45 || code === 48) return { Icon: CloudFog, tint: 'text-ink-500' }
  if (code >= 51 && code <= 55) return { Icon: CloudDrizzle, tint: 'text-sage-500' }
  if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return { Icon: CloudRain, tint: 'text-sage-700' }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { Icon: CloudSnow, tint: 'text-ink-400' }
  if (code >= 95) return { Icon: CloudLightning, tint: 'text-ember-600' }
  return { Icon: Cloud, tint: 'text-ink-500' }
}

export default function Header() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=44.9262&longitude=6.6072&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=Europe/Paris'
        )
        if (!response.ok) throw new Error('Weather API error')
        const data = await response.json()
        const code = data.current.weather_code
        const { Icon, tint } = iconForCode(code)
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition: WMO_DESCRIPTIONS[code] || 'Condition inconnue',
          Icon,
          tint,
        })
      } catch (error) {
        console.error('Error fetching weather:', error)
        setWeather(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-20 bg-cream-100/80 backdrop-blur-md border-b border-cream-300">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:gap-4 min-w-0">
          <img
            src={`${import.meta.env.BASE_URL}android-chrome-512x512.png`}
            alt="Chantemerle"
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl border border-cream-300 shadow-card shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h1 className="font-display text-2xl lg:text-[1.75rem] leading-none font-medium text-ink-900">
              Chantemerle
            </h1>
            <p className="text-xs lg:text-sm text-ink-500 mt-1 truncate">
              Réservation de l'appartement
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {isLoading ? (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-cream-300">
              <div className="w-4 h-4 border-2 border-cream-300 border-t-ember-500 rounded-full animate-spin" />
              <span className="text-xs text-ink-500">Météo…</span>
            </div>
          ) : weather ? (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-cream-300 shadow-card">
              <weather.Icon size={20} className={weather.tint} strokeWidth={1.75} />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg leading-none text-ink-900">
                  {weather.temperature}°
                </span>
                <span className="text-xs text-ink-500">{weather.condition}</span>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center px-4 py-2 rounded-full bg-white border border-cream-300">
              <span className="text-xs text-ink-400">Météo indisponible</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
