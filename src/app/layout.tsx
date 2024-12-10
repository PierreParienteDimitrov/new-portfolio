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
  description: 'Showcasing my work as a designer, composer, and photographer.',
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#000000',
  other: {
    'google-fonts': 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
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
