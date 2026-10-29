'use client'

const STEPS = [
  { era: 'Foundations', items: ['HTML', 'CSS', 'JavaScript'] },
  { era: 'Building interfaces', items: ['React', 'Tailwind CSS'] },
  { era: 'Now', items: ['advanced React', 'Node.js'] },
  { era: 'Next', items: ['Three.js', 'React Three Fiber', 'Framer Motion', 'GSAP'] },
]

export default function Journey() {
  return (
    <div className="space-y-8">
      {STEPS.map((step, i) => (
        <div key={step.era} className="flex gap-4">
          <div className="shrink-0 w-1 h-12 rounded-full bg-violet flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{i + 1}</span>
          </div>
          <div className="flex-1 border-l border-white/10 pl-4">
            <h3 className="text-lg font-bold text-text">{step.era}</h3>
            <ul className="mt-1 text-muted text-sm space-y-1 list-disc pl-4">
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
