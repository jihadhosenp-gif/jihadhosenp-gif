'use client'

import Link from 'next/link'

export interface Project {
  name: string
  description: string
  stack: string[]
  code?: string
  demo?: string
}

const PROJECTS: Project[] = [
  {
    name: 'Project name',
    description: 'One sentence on what it does.',
    stack: ['React', 'Tailwind CSS'],
    code: 'https://github.com/jihadhosenp-gif/REPO_NAME',
    demo: 'https://YOUR_DEMO_URL',
  },
  {
    name: 'Project name',
    description: 'One sentence on what it does.',
    stack: ['Node.js', 'MongoDB'],
    code: 'https://github.com/jihadhosenp-gif/REPO_NAME',
  },
]

export default function ProjectGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p) => (
        <article key={p.name} className="rounded-2xl bg-panel border border-white/5 p-6 hover:border-violet/40 transition group">
          <h3 className="text-xl font-bold text-text mb-2">{p.name}</h3>
          <p className="text-muted text-sm mb-4">{p.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {p.stack.map((s) => (
              <span key={s} className="px-2 py-1 rounded text-xs font-medium text-cyan border border-cyan/30 bg-cyan/5">{s}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-sm text-violet hover:underline">
                Code
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan hover:underline">
                Demo
              </a>
            )}
          </div>
        </article>
      ))}
      {PROJECTS.length === 0 && (
        <p className="text-muted text-center py-12">No projects added yet. Fill in PROJECTS in components/ProjectGallery.tsx.</p>
      )}
    </div>
  )
}
