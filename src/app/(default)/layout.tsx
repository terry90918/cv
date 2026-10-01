import type { ReactNode } from 'react'

import LocaleLayout from '../[locale]/layout'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('zh-TW')

export default async function DefaultLayout({ children }: { children: ReactNode }) {
  return LocaleLayout({ children, params: Promise.resolve({ locale: 'zh-TW' }) })
}
