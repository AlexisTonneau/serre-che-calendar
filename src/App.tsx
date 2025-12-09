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

  const getMockData = (): Booking[] => [
    { id: 1, name: 'Alice', start: '2024-12-27', end: '2025-01-03', status: 'booked' },
    { id: 2, name: 'Aymeric', start: '2025-07-11', end: '2025-07-14', status: 'booked' },
    { id: 3, name: 'Aymeric', start: '2025-01-31', end: '2025-02-07', status: 'tentative' },
    { id: 4, name: 'Alexis', start: '2025-01-14', end: '2025-01-26', status: 'booked' },
    { id: 5, name: 'Del & Clery', start: '2025-01-25', end: '2025-02-02', status: 'booked' },
    { id: 6, name: 'Brioist', start: '2025-02-14', end: '2025-02-21', status: 'booked' },
    { id: 7, name: 'Sophie & Marc', start: '2025-03-01', end: '2025-03-08', status: 'booked' },
    { id: 8, name: 'Pierre', start: '2025-03-15', end: '2025-03-22', status: 'tentative' },
    { id: 9, name: 'Isabelle', start: '2025-04-05', end: '2025-04-12', status: 'booked' },
    { id: 10, name: 'Thomas & Julie', start: '2025-04-20', end: '2025-04-27', status: 'booked' },
    { id: 11, name: 'Nicolas', start: '2025-05-10', end: '2025-05-17', status: 'booked' },
    { id: 12, name: 'Marie', start: '2025-05-24', end: '2025-05-31', status: 'tentative' },
    { id: 13, name: 'Jean & Anne', start: '2025-06-07', end: '2025-06-14', status: 'booked' },
    { id: 14, name: 'Laurent', start: '2025-06-21', end: '2025-06-28', status: 'booked' },
    { id: 15, name: 'Claire', start: '2025-07-05', end: '2025-07-10', status: 'booked' },
    { id: 16, name: 'Michel & Véronique', start: '2025-08-02', end: '2025-08-09', status: 'booked' },
    { id: 17, name: 'Dominique', start: '2025-08-16', end: '2025-08-23', status: 'tentative' },
    { id: 18, name: 'Fabrice', start: '2025-09-01', end: '2025-09-08', status: 'booked' },
    { id: 19, name: 'Nathalie & Patrick', start: '2025-09-15', end: '2025-09-22', status: 'booked' },
    { id: 20, name: 'Gérard', start: '2025-10-04', end: '2025-10-11', status: 'booked' },
  ]

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
      {/* Subtle light overlay for texture */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-white/10" />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        {/* Error notification */}
        {error && (
          <div className="mx-4 mt-4 p-4 glass bg-red-100 border-red-400 rounded-lg text-red-900">
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
          <main className="container mx-auto px-4 py-8 h-[calc(100vh-88px)] flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
              {/* Left Column - Bookings List */}
              <div className="lg:col-span-2 flex flex-col min-h-0">
                <div className="glass-lg p-8 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Prochains occupants</h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Réserver un créneau
                    </button>
                  </div>

                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-700">Aucune réservation pour le moment</p>
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
              <div className="lg:col-span-1">
                <div className="glass-lg p-6 sticky top-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Calendrier</h3>
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

                  <p className="text-center text-gray-800 mb-4 font-semibold">
                    {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                  </p>

                  <CalendarView bookings={bookings} month={currentMonth} />
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
