export interface BankAccount {
  bankName: string
  accountNumber: string
  accountHolder: string
}

export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  caption?: string
}

export type AttendanceStatus = 'Hadir' | 'Tidak Hadir' | 'Masih Belum Pasti'

export interface GuestbookEntry {
  id: string
  guest_name: string
  message: string
  attendance: AttendanceStatus
  created_at: string
}

export interface WeddingConfig {
  brideName: string
  groomName: string
  brideFullName: string
  groomFullName: string
  brideFather: string
  brideMother: string
  groomFather: string
  groomMother: string
  weddingDate: string
  eventDay: string
  eventDateLabel: string
  akadTime: string
  receptionTime: string
  venueName: string
  venueAddress: string
  googleMapsUrl: string
  bridePhoto: string
  groomPhoto: string
  heroVideo: string
  optionalButterflies: boolean
  optionalGallery: boolean
  optionalLiveMusic: boolean
  musicUrl: string
  enableRsvp: boolean
  enableGuestbook: boolean
  enableWeddingGift: boolean
  bankAccounts: BankAccount[]
  galleryPhotos: GalleryPhoto[]
  closingMessage: string
  defaultGuestName: string
}
