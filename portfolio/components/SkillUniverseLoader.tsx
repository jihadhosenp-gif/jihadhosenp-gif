'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CATEGORIES } from '@/data/skills'

function SkillList() {
  return (
    <div className="grid gap-4 rounded-2xl bg-panel p-6 text-text sm:grid-cols-2">
      {CATEGORIES.map((c) => (
        <div key={c.id}>
          <h3 className="font-semibold" style={{ color: c.color }}>{c.label}</h3>
          <ul className="mt-1 text-sm text-muted">
            {c.skills.map((s) => <li key={s.name}>{s.name}{s.learning ? ' (learning)' : ''}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

const SkillUniverse = dynamic(() => import('./SkillUniverse'), { ssr: false, loading: () => <SkillList /> })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

export default function SkillUniverseLoader() {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => setOk(hasWebGL()), [])
  if (ok === false) return <SkillList />
  return ok === null ? <SkillList /> : <SkillUniverse />
}
