import { useState, useEffect } from 'react'
import { format, parseISO, isWithinInterval, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Trash2, Plus, Cloud, User, ChevronLeft, ChevronRight } from 'lucide-react'
import BookingModal from './components/BookingModal'
import CalendarView from './components/CalendarView'
import BookingsList from './components/BookingsList'
import Header from './components/Header'
import { Booking, API_BASE_URL } from './types'

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/`)
      if (!response.ok) throw new Error('Impossible de charger les réservations')
      const data = await response.json()
      setBookings(data)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement des réservations:', err)
      setError('Impossible de charger les réservations')
      // Fallback to mock data for development
      setBookings(getMockData())
    } finally {
      setIsLoading(false)
    }
  }

  const getMockData = (): Booking[] => []

  const handleAddBooking = async (newBooking: Omit<Booking, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      })
      if (!response.ok) throw new Error('Impossible de créer la réservation')
      const created = await response.json()
      setBookings([...bookings, created])
      setIsModalOpen(false)
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err)
      setError('Impossible de créer la réservation')
      // Fallback: add locally
      const localBooking: Booking = {
        ...newBooking,
        id: Math.max(0, ...bookings.map(b => b.id)) + 1,
      }
      setBookings([...bookings, localBooking])
      setIsModalOpen(false)
    }
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Impossible de supprimer la réservation')
      setBookings(bookings.filter(b => b.id !== id))
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la suppression de la réservation:', err)
      setError('Impossible de supprimer la réservation')
      // Fallback: remove locally
      setBookings(bookings.filter(b => b.id !== id))
    }
  }

  const upcomingBookings = bookings
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 10)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop")',
          filter: 'brightness(0.4) blur(4px)',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80" />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        {/* Error notification */}
        {error && (
          <div className="mx-4 mt-4 p-4 glass bg-red-500/20 border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-400">Chargement des réservations...</p>
            </div>
          </div>
        )}

        {!isLoading && (
          <main className="container mx-auto px-4 py-4 lg:py-8 h-[calc(100vh-88px)] flex flex-col overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 flex-1 overflow-hidden grid-rows-[auto_1fr] lg:grid-rows-1">
              {/* Left Column - Bookings List */}
              <div className="lg:col-span-2 flex flex-col min-h-0 lg:order-1">
                <div className="glass-lg p-4 lg:p-8 flex flex-col flex-1 min-h-0">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">Prochains occupants</h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-primary flex items-center gap-2 whitespace-nowrap"
                    >
                      <Plus size={20} />
                      <span className="hidden sm:inline">Réserver un créneau</span>
                      <span className="sm:hidden">Réserver</span>
                    </button>
                  </div>

                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-300">Aucune réservation pour le moment</p>
                    </div>
                  ) : (
                    <BookingsList
                      bookings={upcomingBookings}
                      onDelete={handleDeleteBooking}
                    />
                  )}
                </div>
              </div>

              {/* Right Column - Calendar */}
              <div className="lg:col-span-1 flex flex-col min-h-0 lg:order-2">
                <div className="glass-lg p-4 lg:p-6 flex flex-col min-h-0 lg:sticky lg:top-4">
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h3 className="text-lg lg:text-xl font-bold text-white">Calendrier</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="btn-icon"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="btn-icon"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-slate-300 mb-2 lg:mb-4 font-semibold text-sm lg:text-base">
                    {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                  </p>

                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <CalendarView bookings={bookings} month={currentMonth} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBooking}
        existingBookings={bookings}
      />
    </div>
  )
}
