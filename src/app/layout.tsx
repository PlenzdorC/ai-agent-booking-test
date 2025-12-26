import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentBook - AI-Optimized Booking Platform',
  description: 'Book appointments through AI assistants like ChatGPT and Claude',
  keywords: ['AI booking', 'ChatGPT appointments', 'AI assistant', 'automated booking'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

