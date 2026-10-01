import type { MetadataRoute } from 'next'

import { locales, projectSlugs } from '@/lib/profile'
import { siteUrl } from '@/lib/metadata'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/contact', ...projectSlugs.map(slug => `/case-study/${slug}`)]

  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${siteUrl}/${locale}${route}`,
      alternates: { languages: { 'zh-TW': `${siteUrl}/zh-TW${route}`, en: `${siteUrl}/en${route}` } }
    }))
  )
}
