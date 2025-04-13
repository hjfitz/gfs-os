import { Metadata } from 'next/types'
import '../styles/globals.css' // adjust path as needed

export const metadata: Metadata = {
  title: {
    template: '%s | GFS OS',
    default: 'GFS OS - Internal Dashboard',
  },
  description: 'Internal dashboard for managing repositories and organization resources',
  keywords: ['dashboard', 'internal', 'repositories', 'organization'],
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) => (
  <html lang="en">
    <body>{children}</body>
  </html>
)

export default RootLayout;
