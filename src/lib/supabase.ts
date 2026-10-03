import { createClient } from '@supabase/supabase-js'
import type { Booking } from '../types'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  )
}

interface BookingRow {
  id: number
  name: string
  start_date: string
  end_date: string
  status: 'booked' | 'tentative'
}

const supabase = createClient(url, anonKey)

const toBooking = (row: BookingRow): Booking => ({
  id: row.id,
  name: row.name,
  start: row.start_date,
  end: row.end_date,
  status: row.status,
})

export const bookingsApi = {
  async list(signal?: AbortSignal): Promise<Booking[]> {
    const query = supabase.from('bookings').select('*').order('start_date', { ascending: true })
    if (signal) query.abortSignal(signal)
    const { data, error } = await query
    if (error) throw error
    return (data as BookingRow[]).map(toBooking)
  },

  async create(booking: Omit<Booking, 'id'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        name: booking.name,
        start_date: booking.start,
        end_date: booking.end,
        status: booking.status,
      })
      .select()
      .single()
    if (error) throw error
    return toBooking(data as BookingRow)
  },

  async remove(id: number): Promise<void> {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) throw error
  },
}
