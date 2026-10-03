import { useState } from 'react'
import { X } from 'lucide-react'
import { isWithinInterval } from 'date-fns'
import { Booking } from '../types'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (booking: Omit<Booking, 'id'>) => void
  existingBookings: Booking[]
}

export default function BookingModal({
  isOpen,
  onClose,
  onSubmit,
  existingBookings,
}: BookingModalProps) {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const checkConflict = (start: string, end: string): boolean => {
    const newStart = new Date(start)
    const newEnd = new Date(end)
    return existingBookings.some(booking => {
      const bookingStart = new Date(booking.start)
      const bookingEnd = new Date(booking.end)
      return (
        (newStart <= bookingEnd && newEnd >= bookingStart) ||
        isWithinInterval(newStart, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(newEnd, { start: bookingStart, end: bookingEnd })
      )
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('Veuillez entrer un nom')
    if (!startDate) return setError('Veuillez sélectionner une date d\'arrivée')
    if (!endDate) return setError('Veuillez sélectionner une date de départ')

    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start >= end) return setError('La date de départ doit être après l\'arrivée')
    if (checkConflict(startDate, endDate)) return setError('Cette période chevauche une réservation existante')

    try {
      setIsSubmitting(true)
      onSubmit({ name: name.trim(), start: startDate, end: endDate, status: 'booked' })
      setName(''); setStartDate(''); setEndDate('')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-[1.75rem] shadow-pop border border-cream-300 overflow-hidden">
        <div className="flex items-start justify-between px-7 pt-7 pb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ember-600 font-medium mb-2">Nouveau séjour</p>
            <h2 className="font-display text-2xl text-ink-900">Réserver un créneau</h2>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost -mr-2 -mt-1"
            disabled={isSubmitting}
            aria-label="Fermer"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 pb-7 pt-4 space-y-5">
          <div>
            <label className="label">Nom de l'occupant</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Alice, Del & Clery"
              className="input-field"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Arrivée</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="label">Départ</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-ember-50 border border-ember-100 rounded-xl text-ember-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1" disabled={isSubmitting}>
              Annuler
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement…' : 'Confirmer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
