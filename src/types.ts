export interface Booking {
  id: number
  name: string
  start: string
  end: string
  status: 'booked' | 'tentative'
}

export interface SlotInput {
  name: string
  start: string
  end: string
}
