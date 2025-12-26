import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Generate time slots for a given date range
export function generateTimeSlots(
  startHour: number,
  endHour: number,
  intervalMinutes: number,
  date: Date = new Date()
): Date[] {
  const slots: Date[] = []
  const current = new Date(date)
  current.setHours(startHour, 0, 0, 0)

  const end = new Date(date)
  end.setHours(endHour, 0, 0, 0)

  while (current < end) {
    slots.push(new Date(current))
    current.setMinutes(current.getMinutes() + intervalMinutes)
  }

  return slots
}

// Check if a time slot is available
export function isSlotAvailable(
  slot: Date,
  bookedSlots: Array<{ start: Date; end: Date }>,
  duration: number
): boolean {
  const slotEnd = new Date(slot)
  slotEnd.setMinutes(slotEnd.getMinutes() + duration)

  return !bookedSlots.some(
    (booked) =>
      (slot >= booked.start && slot < booked.end) ||
      (slotEnd > booked.start && slotEnd <= booked.end) ||
      (slot <= booked.start && slotEnd >= booked.end)
  )
}

