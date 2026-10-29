'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import SkillUniverseLoader from '@/components/SkillUniverseLoader'
import ProjectGallery from '@/components/ProjectGallery'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'

const SkillUniverse = dynamic(() => import('@/components/SkillUniverse'), {
  loading: () => <div className="h-[560px] w-full bg-panel rounded-2xl" />,
})

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <main className="relative overflow-hidden">
      <Hero />
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-text tracking-tight mb-6">Skills</h2>
          <p className="text-muted mb-12 max-w-2xl">
            What I work with, and what I am still learning. Filled nodes are working knowledge; hollow nodes are skills still being learned.
          </p>
          <div className="mx-auto max-w-5xl">
            {mounted ? <SkillUniverseLoader /> : <div className="h-[560px] w-full bg-panel rounded-2xl animate-pulse" />}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-panel px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-text tracking-tight mb-6">Projects</h2>
          <p className="text-muted mb-12 max-w-2xl">
            A gallery of real repositories I&rsquo;ve built. Each links to its source and, where available, a live demo.
          </p>
          <ProjectGallery />
        </div>
      </section>

      <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-text tracking-tight mb-6">Journey</h2>
          <Journey />
        </div>
      </section>

      <section id="contact" className="py-20 bg-panel px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-text tracking-tight mb-6">Contact</h2>
          <Contact />
        </div>
      </section>
    </main>
  )
}
