import './globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { Navbar } from '@/components/reusable/Navbar/Navbar'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Jacked',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        <Navbar />
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
