import { useState } from 'react'
import { X, CalendarDays } from 'lucide-react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import { format, parseISO, differenceInCalendarDays } from 'date-fns'
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
  const [range, setRange] = useState<DateRange | undefined>()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bookedMatchers = existingBookings.map(b => ({
    from: parseISO(b.start),
    to: parseISO(b.end),
  }))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkConflict = (start: Date, end: Date): boolean =>
    existingBookings.some(b => {
      const bStart = parseISO(b.start)
      const bEnd = parseISO(b.end)
      return start <= bEnd && end >= bStart
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('Veuillez entrer un nom')
    if (!range?.from || !range?.to) return setError('Sélectionnez les dates du séjour')
    if (range.from.getTime() === range.to.getTime())
      return setError('Le séjour doit durer au moins une nuit')
    if (checkConflict(range.from, range.to))
      return setError('Cette période chevauche une réservation existante')

    try {
      setIsSubmitting(true)
      onSubmit({
        name: name.trim(),
        start: format(range.from, 'yyyy-MM-dd'),
        end: format(range.to, 'yyyy-MM-dd'),
        status: 'booked',
      })
      setName('')
      setRange(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[1.75rem] shadow-pop border border-cream-300 overflow-hidden max-h-[95vh] overflow-y-auto">
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

          <div>
            <label className="label">Dates du séjour</label>
            <div className="surface-muted p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-sm">
                <CalendarDays size={16} className="text-ember-500 shrink-0" strokeWidth={1.75} />
                {range?.from && range?.to ? (
                  <span className="text-ink-900 font-medium">
                    {format(range.from, 'd MMM', { locale: fr })} → {format(range.to, 'd MMM yyyy', { locale: fr })}
                  </span>
                ) : range?.from ? (
                  <span className="text-ink-700">
                    {format(range.from, 'd MMM', { locale: fr })} → <span className="text-ink-400">départ</span>
                  </span>
                ) : (
                  <span className="text-ink-400">Sélectionnez l'arrivée puis le départ</span>
                )}
              </div>
              {nights > 0 && (
                <span className="text-xs text-ink-500 whitespace-nowrap">
                  {nights} nuit{nights > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="mt-3 surface p-2 flex justify-center">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                locale={fr}
                weekStartsOn={1}
                disabled={[{ before: today }, ...bookedMatchers]}
                numberOfMonths={1}
                className="rdp-chantemerle"
                showOutsideDays
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
