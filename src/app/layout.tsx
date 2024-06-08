import type { Metadata } from 'next'
import { Roboto_Slab } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'

const inter = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'nirlep // home',
  description: 'welcome to my personal website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
