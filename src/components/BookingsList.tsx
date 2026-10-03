import { Trash2, ArrowRight } from 'lucide-react'
import { format, parseISO, differenceInCalendarDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Booking } from '../types'

interface BookingsListProps {
  bookings: Booking[]
  onDelete: (id: number) => void
}

export default function BookingsList({ bookings, onDelete }: BookingsListProps) {
  return (
    <div className="scrollable-list flex flex-col gap-2.5 flex-1 min-h-0 -mx-2 px-2">
      {bookings.map((booking) => {
        const start = parseISO(booking.start)
        const end = parseISO(booking.end)
        const nights = Math.max(1, differenceInCalendarDays(end, start))
        const isTentative = booking.status === 'tentative'

        return (
          <div
            key={booking.id}
            className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-cream-300 hover:border-cream-400 hover:shadow-card transition-all duration-200"
          >
            <div className={`shrink-0 w-1 self-stretch rounded-full ${isTentative ? 'bg-ochre-500' : 'bg-sage-500'}`} />

            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg sm:text-xl leading-tight text-ink-900 truncate">
                  {booking.name}
                </p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {nights} nuit{nights > 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-ink-700 whitespace-nowrap">
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] uppercase tracking-wider text-ink-400">Arrivée</span>
                  <span className="font-medium">{format(start, 'd MMM', { locale: fr })}</span>
                </div>
                <ArrowRight size={14} className="text-ink-300 shrink-0" />
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] uppercase tracking-wider text-ink-400">Départ</span>
                  <span className="font-medium">{format(end, 'd MMM', { locale: fr })}</span>
                </div>
              </div>

              <div className="hidden sm:block">
                {isTentative ? (
                  <span className="badge-tentative">
                    <span className="status-dot-tentative" />
                    À confirmer
                  </span>
                ) : (
                  <span className="badge-booked">
                    <span className="status-dot-booked" />
                    Confirmée
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Supprimer cette réservation ?')) {
                  onDelete(booking.id)
                }
              }}
              className="btn-danger-ghost shrink-0 opacity-60 group-hover:opacity-100"
              title="Supprimer"
              aria-label="Supprimer la réservation"
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
