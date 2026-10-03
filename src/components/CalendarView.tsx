import {
  startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek,
  format, isSameMonth, parseISO, isWithinInterval, isBefore, startOfDay,
  isSameDay,
} from 'date-fns'
import { Booking } from '../types'

interface CalendarViewProps {
  bookings: Booking[]
  month: Date
}

export default function CalendarView({ bookings, month }: CalendarViewProps) {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  const getBookingForDate = (date: Date): Booking | undefined =>
    bookings.find(b => isWithinInterval(date, { start: parseISO(b.start), end: parseISO(b.end) }))

  const today = new Date()

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div
            key={i}
            className="text-center text-[0.65rem] font-medium text-ink-400 uppercase tracking-wider py-1.5"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, idx) => {
          const inMonth = isSameMonth(day, month)
          const booking = getBookingForDate(day)
          const booked = Boolean(booking)
          const isToday = isSameDay(day, today)
          const isPast = isBefore(startOfDay(day), startOfDay(today))

          const isStart = booking && isSameDay(day, parseISO(booking.start))
          const isEnd = booking && isSameDay(day, parseISO(booking.end))
          const tentative = booking?.status === 'tentative'

          let bgClass = 'bg-cream-50 text-ink-700 hover:bg-cream-200'
          if (!inMonth) bgClass = 'bg-transparent text-ink-300'
          else if (isPast && !booked) bgClass = 'bg-transparent text-ink-300'
          else if (booked) {
            bgClass = tentative
              ? 'bg-ochre-100 text-ochre-700'
              : 'bg-sage-100 text-sage-700'
          }

          const edgeClass = booked
            ? `${isStart && !isEnd ? 'rounded-l-full' : ''} ${isEnd && !isStart ? 'rounded-r-full' : ''} ${isStart && isEnd ? 'rounded-full' : ''} ${!isStart && !isEnd ? 'rounded-none' : ''}`
            : 'rounded-xl'

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center text-sm font-medium transition-colors ${bgClass} ${edgeClass} ${isToday ? 'ring-2 ring-ember-500 ring-offset-1 ring-offset-white rounded-full' : ''}`}
              title={booking ? `${booking.name} — ${format(parseISO(booking.start), 'd MMM')} → ${format(parseISO(booking.end), 'd MMM')}` : undefined}
            >
              <span>{format(day, 'd')}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-cream-300 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sage-100 border border-sage-500" />
          <span>Réservé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ochre-100 border border-ochre-500" />
          <span>À confirmer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-ember-500" />
          <span>Aujourd'hui</span>
        </div>
      </div>
    </div>
  )
}
