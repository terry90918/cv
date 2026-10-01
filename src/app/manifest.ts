import type { MetadataRoute } from 'next'

import { assetPath } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '陳天一 · Tien Yi Chen',
    short_name: 'Tien Yi Chen',
    description: 'Applied AI Engineering — CV & selected work',
    start_url: assetPath('/zh-TW/'),
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#ff5c00',
    icons: [{ src: assetPath('/icon.svg'), sizes: 'any', type: 'image/svg+xml' }]
  }
}
