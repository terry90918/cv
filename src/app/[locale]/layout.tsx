import type { ReactNode } from 'react'

import localFont from 'next/font/local'
import { notFound } from 'next/navigation'

import { ThemeProvider } from '@/components/theme-provider'
import CustomCursor from '@/components/layout/custom-cursor'
import EdgeBlur from '@/components/layout/edge-blur'
import Footer from '@/components/layout/footer'
import NavDock from '@/components/layout/nav-dock'
import { TooltipProvider } from '@/components/ui/tooltip'
import { isLocale, locales, profiles } from '@/lib/profile'
import { pageMetadata } from '@/lib/metadata'

import '../globals.css'

const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  src: [
    { path: '../../assets/fonts/satoshi/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../../assets/fonts/satoshi/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../../assets/fonts/satoshi/satoshi-700.woff2', weight: '700', style: 'normal' },
    { path: '../../assets/fonts/satoshi/satoshi-900.woff2', weight: '900', style: 'normal' }
  ]
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return pageMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const profile = profiles[locale]

  return (
    <html lang={locale} className={`${satoshi.variable} min-h-full scroll-smooth antialiased`} suppressHydrationWarning>
      <body className='flex min-h-screen flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            <NavDock locale={locale} labels={profile.labels} />
            <main className='mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col lg:border-x xl:max-w-245'>
              {children}
            </main>
            <Footer locale={locale} profile={profile} />
          </TooltipProvider>
          <EdgeBlur />
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
