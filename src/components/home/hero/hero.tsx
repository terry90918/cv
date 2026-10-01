import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import IdCard from '@/components/ui/id-card'
import { contact } from '@/lib/profile'
import type { Locale, Profile } from '@/lib/profile'

export default function Hero({ locale, profile }: { locale: Locale; profile: Profile }) {
  return (
    <section id='top' className='border-b lg:grid lg:grid-cols-2 lg:items-center'>
      <div className='min-w-0 pt-24 pb-8 sm:py-16 lg:pt-32 lg:pb-24'>
        <div className='px-4 sm:px-6 lg:px-10.5'>
          <div className='space-y-6 lg:max-w-lg'>
            <Badge variant='outline' className='bg-card gap-2 rounded-full px-3 py-1 text-xs shadow-sm'>
              <span className='bg-accent size-1.5 rounded-full' />
              {profile.location}
            </Badge>
            <h1 className='text-4xl leading-[1.15] font-semibold tracking-tight sm:text-5xl lg:text-[64px] lg:font-bold'>
              <span className='text-muted-foreground mb-2 block text-xl font-medium tracking-normal sm:text-2xl'>
                {profile.greeting}
              </span>
              {profile.name}
              <span className='text-accent-ink'>.</span>
            </h1>
            <p className='text-muted-foreground text-xl font-medium sm:text-2xl lg:text-3xl'>{profile.role}</p>
            <p className='max-w-lg text-base leading-relaxed lg:max-w-105'>{profile.description}</p>
            <div className='flex flex-wrap items-center gap-3 pt-2'>
              <Link
                href={`/${locale}/#experience`}
                className='bg-background hover:text-accent-ink rounded-full border px-5 py-3 text-sm'
              >
                {profile.labels.viewExperience}
              </Link>
              <Link
                href={`/${locale}/#contact`}
                className='bg-card hover:text-accent-ink flex items-center gap-3 rounded-full border px-5 py-3 text-sm shadow-sm'
              >
                <span className='bg-accent size-2 rounded-full' />
                {profile.labels.contact}
                <ArrowRight className='size-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <IdCard
        frontImage={contact.photo}
        dragLabel={locale === 'zh-TW' ? '拖曳吊牌' : 'Drag badge'}
        scrollLabel={locale === 'zh-TW' ? '繼續捲動' : 'Resume scrolling'}
        className='mx-auto w-full max-w-lg min-w-0 px-4 pb-8 sm:px-6 lg:px-0 lg:pt-16'
      />
    </section>
  )
}
