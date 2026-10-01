import { notFound } from 'next/navigation'

import CvHome from '@/components/cv-home'
import { getCaseStudies } from '@/lib/case-studies'
import { contact, isLocale, profiles } from '@/lib/profile'
import { siteUrl } from '@/lib/metadata'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const profile = profiles[locale]
  const projects = await getCaseStudies(locale)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: locale === 'en' ? '陳天一' : 'Tien Yi Chen',
    url: `${siteUrl}/${locale}`,
    image: new URL(contact.photo, siteUrl).href,
    sameAs: [contact.github, contact.linkedin],
    knowsAbout: profile.skills.map(skill => skill.title)
  }

  return (
    <>
      <CvHome locale={locale} profile={profile} projects={projects} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
    </>
  )
}
