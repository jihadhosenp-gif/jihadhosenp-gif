'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/data/skills';

// Plain, accessible list. Used while loading, on weak devices and when WebGL is missing.
function SkillList() {
  return (
    <div className="grid gap-4 rounded-2xl bg-[#0D1321] p-6 text-[#F5F7FF] sm:grid-cols-2">
      {CATEGORIES.map((c) => (
        <div key={c.id}>
          <h3 className="font-semibold" style={{ color: c.color }}>{c.label}</h3>
          <ul className="mt-1 text-sm text-[#9AA6BD]">
            {c.skills.map((s) => <li key={s.name}>{s.name}{s.learning ? ' (learning)' : ''}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

const SkillUniverse = dynamic(() => import('./SkillUniverse'), { ssr: false, loading: () => <SkillList /> });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

export default function SkillUniverseLoader() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => setOk(hasWebGL()), []);
  if (ok === false) return <SkillList />;
  return ok === null ? <SkillList /> : <SkillUniverse />;
}
