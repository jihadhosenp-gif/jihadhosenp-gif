import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Jihad Hosen — Full-Stack Developer',
  description: 'Interfaces that respond. Backends that hold.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-ink text-text antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
