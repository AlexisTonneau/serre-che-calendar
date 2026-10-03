import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Plus, ChevronLeft, ChevronRight, CalendarDays, AlertTriangle, RefreshCw } from 'lucide-react'

const LOAD_TIMEOUT_MS = 10000
import BookingModal from './components/BookingModal'
import CalendarView from './components/CalendarView'
import BookingsList from './components/BookingsList'
import Header from './components/Header'
import { Booking } from './types'
import { bookingsApi } from './lib/supabase'

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS)
    try {
      setIsLoading(true)
      setLoadError(null)
      const data = await bookingsApi.list(controller.signal)
      setBookings(data)
    } catch (err) {
      console.error('Erreur lors du chargement des réservations:', err)
      const isTimeout = err instanceof DOMException && err.name === 'AbortError'
      setLoadError(
        isTimeout
          ? 'Le serveur met trop de temps à répondre.'
          : 'Impossible de charger les réservations.'
      )
      setBookings([])
    } finally {
      clearTimeout(timeoutId)
      setIsLoading(false)
    }
  }

  const handleAddBooking = async (newBooking: Omit<Booking, 'id'>) => {
    try {
      const created = await bookingsApi.create(newBooking)
      setBookings([...bookings, created])
      setIsModalOpen(false)
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err)
      setError('Impossible de créer la réservation')
    }
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      await bookingsApi.remove(id)
      setBookings(bookings.filter(b => b.id !== id))
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la suppression de la réservation:', err)
      setError('Impossible de supprimer la réservation')
    }
  }

  const upcomingBookings = bookings
    .slice()
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 20)

  return (
    <div className="min-h-screen">
      <Header />

      {error && (
        <div className="mx-4 lg:mx-8 mt-4 px-4 py-3 bg-ember-50 border border-ember-100 rounded-xl text-ember-700 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-6 h-6 border-2 border-cream-300 border-t-ember-500 rounded-full animate-spin mb-3" />
            <p className="text-sm text-ink-500">Chargement…</p>
          </div>
        </div>
      ) : loadError ? (
        <div className="flex items-center justify-center h-[60vh] px-4">
          <div className="surface max-w-sm w-full p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ember-50 text-ember-600 mb-4">
              <AlertTriangle size={24} strokeWidth={1.5} />
            </div>
            <p className="font-display text-lg text-ink-900 mb-1">Chargement impossible</p>
            <p className="text-sm text-ink-500 mb-5">{loadError}</p>
            <button onClick={fetchBookings} className="btn-primary mx-auto">
              <RefreshCw size={14} strokeWidth={2.25} />
              Réessayer
            </button>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 lg:h-[calc(100vh-88px)] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 flex-1 min-h-0">
            {/* Left: Bookings */}
            <section className="lg:col-span-3 surface-lg p-6 lg:p-8 flex flex-col min-h-0">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-ember-600 font-medium mb-1.5">
                    Agenda
                  </p>
                  <h2 className="font-display text-3xl lg:text-[2rem] leading-tight text-ink-900">
                    Prochains occupants
                  </h2>
                  <p className="text-sm text-ink-500 mt-1">
                    {upcomingBookings.length} séjour{upcomingBookings.length > 1 ? 's' : ''} à venir
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary self-start sm:self-auto">
                  <Plus size={16} strokeWidth={2.25} />
                  <span className="hidden sm:inline">Réserver un créneau</span>
                  <span className="sm:hidden">Réserver</span>
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center py-12 max-w-xs">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream-100 text-ember-500 mb-4">
                      <CalendarDays size={24} strokeWidth={1.5} />
                    </div>
                    <p className="font-display text-lg text-ink-900 mb-1">Aucune réservation</p>
                    <p className="text-sm text-ink-500">
                      L'appartement est libre. Réservez un créneau pour commencer.
                    </p>
                  </div>
                </div>
              ) : (
                <BookingsList bookings={upcomingBookings} onDelete={handleDeleteBooking} />
              )}
            </section>

            {/* Right: Calendar */}
            <aside className="lg:col-span-2 surface p-5 lg:p-6 flex flex-col lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink-400 font-medium">
                    {format(currentMonth, 'yyyy')}
                  </p>
                  <h3 className="font-display text-xl lg:text-2xl leading-tight text-ink-900 capitalize">
                    {format(currentMonth, 'MMMM', { locale: fr })}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="btn-ghost"
                    aria-label="Mois précédent"
                  >
                    <ChevronLeft size={18} strokeWidth={1.75} />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="btn-ghost"
                    aria-label="Mois suivant"
                  >
                    <ChevronRight size={18} strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              <CalendarView bookings={bookings} month={currentMonth} />
            </aside>
          </div>
        </main>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBooking}
        existingBookings={bookings}
      />
    </div>
  )
}
