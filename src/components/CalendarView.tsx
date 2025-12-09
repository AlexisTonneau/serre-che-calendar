import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, format, isSameMonth, parseISO, isWithinInterval, isBefore, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'
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
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const isDateBooked = (date: Date): boolean => {
    return bookings.some(booking => {
      const start = parseISO(booking.start)
      const end = parseISO(booking.end)
      return isWithinInterval(date, { start, end })
    })
  }

  const getBookingForDate = (date: Date): Booking | undefined => {
    return bookings.find(booking => {
      const start = parseISO(booking.start)
      const end = parseISO(booking.end)
      return isWithinInterval(date, { start, end })
    })
  }

  return (
    <div className="space-y-2">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-slate-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="grid grid-cols-7 gap-1">
          {week.map((day, dayIdx) => {
            const isCurrentMonth = isSameMonth(day, month)
            const booked = isDateBooked(day)
            const booking = getBookingForDate(day)
            const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            const isPast = isBefore(startOfDay(day), startOfDay(new Date()))

            return (
              <div
                key={dayIdx}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-semibold
                  transition-all duration-200 group relative
                  ${!isCurrentMonth ? 'opacity-30' : ''}
                  ${isPast ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  ${isToday && !isPast ? 'ring-2 ring-blue-400' : ''}
                  ${isPast
                    ? 'bg-slate-800/30 border border-slate-700/30 text-slate-500'
                    : booked
                    ? booking?.status === 'tentative'
                      ? 'bg-amber-500/30 border border-amber-400/50 text-amber-100 hover:bg-amber-500/40'
                      : 'bg-green-500/30 border border-green-400/50 text-green-100 hover:bg-green-500/40'
                    : 'bg-slate-700/20 border border-slate-600/50 text-slate-300 hover:bg-slate-700/40'
                  }
                `}
                title={isPast ? 'Date passée' : (booked ? `${booking?.name}` : '')}
              >
                <span className="group-hover:hidden">{format(day, 'd')}</span>
                {!isPast && booked && (
                  <span className="hidden group-hover:block text-xs truncate px-1 text-center max-w-full">
                    {booking?.name?.split(' ')[0]}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-6 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/30 border border-green-400/50" />
          <span className="text-slate-300">Réservé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500/30 border border-amber-400/50" />
          <span className="text-slate-300">À confirmer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-700/20 border border-slate-600/50" />
          <span className="text-slate-300">Disponible</span>
        </div>
      </div>
    </div>
  )
}
