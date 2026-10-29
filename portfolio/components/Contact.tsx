'use client'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/jihadhosenp-gif', icon: 'G' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jihad-hosen', icon: 'in' },
  { label: 'Facebook', href: 'https://fb.com/jihadhussin85', icon: 'f' },
  { label: 'Discord', href: 'https://discord.gg/jihad004410', icon: 'D' },
  { label: 'Email', href: 'mailto:jihadhosenp@gmail.com', icon: '@' },
]

export default function Contact() {
  return (
    <div className="space-y-6">
      <p className="text-muted">Reach out at <a href="mailto:jihadhosenp@gmail.com" className="text-text underline">jihadhosenp@gmail.com</a>, or connect below.</p>
      <div className="flex flex-wrap gap-3">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-text text-sm font-medium hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
