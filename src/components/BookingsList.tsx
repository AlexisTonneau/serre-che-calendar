import { Trash2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Booking } from '../types'

interface BookingsListProps {
  bookings: Booking[]
  onDelete: (id: number) => void
}

export default function BookingsList({ bookings, onDelete }: BookingsListProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-800/30 rounded-lg border border-slate-700/50 text-xs font-semibold text-slate-400 uppercase tracking-wide flex-shrink-0">
        <div className="col-span-3">Occupant</div>
        <div className="col-span-2">Début</div>
        <div className="col-span-2">Fin</div>
        <div className="col-span-3">Statut</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Scrollable Booking Rows */}
      <div className="scrollable-list space-y-2 flex-1">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="glass-card grid grid-cols-12 gap-4 items-center"
        >
          {/* Name */}
          <div className="col-span-3">
            <p className="font-semibold text-white truncate">{booking.name}</p>
          </div>

          {/* Start Date */}
          <div className="col-span-2">
            <p className="text-sm text-slate-300">
              {format(parseISO(booking.start), 'd MMM', { locale: fr })}
            </p>
          </div>

          {/* End Date */}
          <div className="col-span-2">
            <p className="text-sm text-slate-300">
              {format(parseISO(booking.end), 'd MMM', { locale: fr })}
            </p>
          </div>

          {/* Status Badge */}
          <div className="col-span-3">
            {booking.status === 'tentative' ? (
              <span className="badge-tentative">À confirmer</span>
            ) : (
              <span className="badge-booked">Confirmée</span>
            )}
          </div>

          {/* Delete Button */}
          <div className="col-span-2 flex justify-end">
            <button
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
                  onDelete(booking.id)
                }
              }}
              className="btn-icon hover:bg-red-500/20 text-red-400 hover:text-red-300"
              title="Supprimer la réservation"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
