import { type Metadata } from 'next'

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
      <body className="flex min-h-full flex-col">
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  )
}
