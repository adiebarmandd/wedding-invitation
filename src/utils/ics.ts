/**
 * Utility untuk menghasilkan file iCalendar (.ics) yang valid
 * Memenuhi standar RFC 5545 tanpa pergeseran zona waktu
 */
export interface CalendarEventProps {
  title: string
  description: string
  location: string
  startDate: string // ISO string '2026-07-01T09:00:00+07:00'
  endDate?: string  // ISO string '2026-07-01T14:00:00+07:00'
}

function formatDateToICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function generateICS(event: CalendarEventProps): string {
  const start = new Date(event.startDate)
  // Default durasi 5 jam jika end date tidak disediakan
  const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 5 * 60 * 60 * 1000)

  const now = new Date()
  const dtstamp = formatDateToICS(now)
  const dtstart = formatDateToICS(start)
  const dtend = formatDateToICS(end)
  const uid = `wedding-Furina-Aether-${start.getTime()}@weddinginvitation`

  // Format multi-line description dan escape karakter khusus
  const cleanDescription = event.description.replace(/\n/g, '\\n').replace(/,/g, '\\,')
  const cleanLocation = event.location.replace(/\n/g, ' ').replace(/,/g, '\\,')

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Wedding of Furina and Aether//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Pengingat: ${event.title} besok`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return icsContent
}

export function downloadCalendarEvent(event: CalendarEventProps): void {
  const icsData = generateICS(event)
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const sanitizedFilename = event.title.replace(/[^a-zA-Z0-9]/g, '_')
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${sanitizedFilename}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
