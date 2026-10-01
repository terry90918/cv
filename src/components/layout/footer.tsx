import Link from 'next/link'

import { Github, Linkedin, Mail } from 'lucide-react'

import { contact } from '@/lib/profile'
import type { Locale, Profile } from '@/lib/profile'

export default function Footer({ locale, profile }: { locale: Locale; profile: Profile }) {
  const socials = [
    { label: 'GitHub', href: contact.github, Icon: Github },
    { label: 'LinkedIn', href: contact.linkedin, Icon: Linkedin },
    { label: profile.labels.email, href: `mailto:${contact.email}`, Icon: Mail }
  ]

  return (
    <footer className='mx-auto w-full max-w-4xl border-t px-4 pt-8 pb-24 text-center sm:px-6 lg:border-x lg:px-10.5 xl:max-w-245'>
      <div className='flex items-center justify-center gap-3'>
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith('https') ? '_blank' : undefined}
            rel={href.startsWith('https') ? 'noopener noreferrer' : undefined}
            className='bg-card hover:text-accent-ink rounded-xl border p-3'
          >
            <Icon className='size-4' />
          </a>
        ))}
      </div>
      <p className='text-muted-foreground mt-6 text-sm'>{profile.labels.thanks}</p>
      <Link href={`/${locale}`} className='mt-3 inline-block text-xs'>
        © {new Date().getFullYear()} {profile.name}
      </Link>
    </footer>
  )
}
