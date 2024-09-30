import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';


import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import Providers from '@/utils/provider'

export const metadata: Metadata = {
  title: {
    template: 'Pierre Pariente Dimitrov Portfolio',
    default: 'Pierre Pariente Dimitrov Portfolio',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          <div id="modal-root"></div> {/* This is where the modal will render */}
          <RootLayout>{children}
            <Analytics />
          </RootLayout>
        </Providers>
      </body>
    </html>
  )
}
