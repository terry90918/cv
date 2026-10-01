'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { BriefcaseBusiness, FolderOpen, Globe, Mail, Sparkles, UserRound } from 'lucide-react'

import { ModeToggle } from '@/components/layout/mode-toggle'
import { useActiveSection } from '@/hooks/use-active-section'
import { localeHref } from '@/lib/profile'
import type { Locale, Profile } from '@/lib/profile'
import { cn } from '@/lib/utils'

const sectionIds = ['about', 'featured-works', 'experience', 'skills', 'contact']

export default function NavDock({ locale, labels }: { locale: Locale; labels: Profile['labels'] }) {
  const pathname = usePathname().replace(/\/$/, '') || `/${locale}`
  const activeId = useActiveSection(sectionIds, pathname)
  const [fragment, setFragment] = useState('')
  const router = useRouter()
  const targetLocale = locale === 'en' ? 'zh-TW' : 'en'

  const items = [
    { id: 'about', label: labels.about, Icon: UserRound },
    { id: 'featured-works', label: labels.work, Icon: FolderOpen },
    { id: 'experience', label: labels.experience, Icon: BriefcaseBusiness },
    { id: 'skills', label: labels.skills, Icon: Sparkles },
    { id: 'contact', label: labels.contact, Icon: Mail }
  ]

  const linkClass =
    'hover:text-accent-ink hover:bg-accent/10 flex min-h-10 items-center gap-2 rounded-md px-2.5 transition-colors'

  const currentFragment = () => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('#case-study-content h2, #case-study-content h3, main > section[id]')
    ]

    const active = sections.reverse().find(section => section.getBoundingClientRect().top <= 160)

    return active ? `#${active.id}` : window.scrollY < 160 ? '' : window.location.hash
  }

  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return

    event.preventDefault()

    router.push(localeHref(pathname, targetLocale, currentFragment()))
  }

  return (
    <nav
      aria-label={locale === 'en' ? 'Main navigation' : '主要導覽'}
      className='group fixed bottom-4 left-1/2 z-70 -translate-x-1/2 lg:top-1/2 lg:bottom-auto lg:left-6 lg:translate-x-0 lg:-translate-y-1/2'
    >
      <div className='bg-card flex w-fit items-stretch gap-0.5 rounded-2xl border p-1.5 shadow-lg lg:flex-col lg:gap-1 lg:p-2'>
        {items.map(({ id, label, Icon }) => {
          const href = `/${locale}/#${id}`

          const active =
            (pathname === `/${locale}` && activeId === id) || (id === 'contact' && pathname === `/${locale}/contact`)

          return (
            <Link
              key={id}
              href={href}
              aria-label={label}
              aria-current={active ? 'location' : undefined}
              className={cn(linkClass, active ? 'text-accent-ink bg-accent/10' : 'text-muted-foreground')}
            >
              <Icon className='size-4 shrink-0' />
              <span className='hidden overflow-hidden text-sm whitespace-nowrap lg:inline-block lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-32 lg:group-hover:opacity-100'>
                {label}
              </span>
            </Link>
          )
        })}
        <span className='mx-0.5 border-l lg:my-1 lg:border-t lg:border-l-0' />
        <Link
          href={localeHref(pathname, targetLocale, fragment)}
          onPointerEnter={() => setFragment(currentFragment())}
          onFocus={() => setFragment(currentFragment())}
          hrefLang={targetLocale}
          onClick={switchLanguage}
          aria-label={locale === 'en' ? '切換至繁體中文' : 'Switch to English'}
          className={cn(linkClass, 'text-muted-foreground')}
        >
          <Globe className='size-4 shrink-0' />
          <span className='hidden text-sm lg:group-hover:block'>{locale === 'en' ? '中文' : 'EN'}</span>
        </Link>
        <ModeToggle aria-label={labels.theme} className={cn(linkClass, 'text-muted-foreground')}>
          <span className='hidden text-sm lg:group-hover:block'>{labels.theme}</span>
        </ModeToggle>
      </div>
    </nav>
  )
}
