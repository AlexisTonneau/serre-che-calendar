import { useState } from 'react'
import { X } from 'lucide-react'
import { format, parseISO, isWithinInterval } from 'date-fns'
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

    // Validation
    if (!name.trim()) {
      setError('Veuillez entrer un nom')
      return
    }
    if (!startDate) {
      setError('Veuillez sélectionner une date de début')
      return
    }
    if (!endDate) {
      setError('Veuillez sélectionner une date de fin')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start >= end) {
      setError('La date de fin doit être après la date de début')
      return
    }

    if (checkConflict(startDate, endDate)) {
      setError('Cette période chevauche une réservation existante')
      return
    }

    try {
      setIsSubmitting(true)
      onSubmit({
        name: name.trim(),
        start: startDate,
        end: endDate,
        status: 'booked',
      })

      // Reset form
      setName('')
      setStartDate('')
      setEndDate('')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="glass-lg w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Nouvelle réservation</h2>
          <button
            onClick={onClose}
            className="btn-icon hover:bg-red-500/20 text-red-400"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Nom de l'occupant
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Alice, Del & Clery"
              className="input-field"
              disabled={isSubmitting}
            />
          </div>

          {/* Start Date Input */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
              disabled={isSubmitting}
            />
          </div>

          {/* End Date Input */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
              disabled={isSubmitting}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'En cours...' : 'Confirmer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
