export type Shape = 'sphere' | 'box' | 'cylinder' | 'cone' | 'octahedron'

export interface Skill {
  name: string
  description: string
  learning?: boolean // hollow wireframe node
}

export interface Category {
  id: string
  label: string
  color: string
  shape: Shape
  radius: number
  tilt: number // radians
  skills: Skill[]
}

// Edit this file to match what you actually know. No ratings, only honest status.
export const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#00E5FF',
    shape: 'sphere',
    radius: 2.6,
    tilt: 0.15,
    skills: [
      { name: 'HTML', description: 'Semantic structure for pages.' },
      { name: 'CSS', description: 'Layout, responsive design and styling.' },
      { name: 'JavaScript', description: 'Interactive behavior in the browser.' },
      { name: 'React.js', description: 'Component-based interfaces.' },
      { name: 'Tailwind CSS', description: 'Utility-first styling.' },
      { name: 'Next.js', description: 'React framework for routing and rendering.', learning: true },
      { name: 'TypeScript', description: 'Typed JavaScript.', learning: true },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#7C5CFF',
    shape: 'box',
    radius: 3.7,
    tilt: -0.3,
    skills: [
      { name: 'Node.js', description: 'JavaScript on the server.', learning: true },
      { name: 'Express.js', description: 'Routing and middleware for Node.', learning: true },
      { name: 'REST APIs', description: 'Resource-based HTTP APIs.', learning: true },
      { name: 'Authentication', description: 'Sign-in and protected routes.', learning: true },
      { name: 'Server-side development', description: 'Logic that runs off the client.', learning: true },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#B8FF6A',
    shape: 'cylinder',
    radius: 4.7,
    tilt: 0.4,
    skills: [{ name: 'MongoDB', description: 'Document database.', learning: true }],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#9AA6BD',
    shape: 'cone',
    radius: 5.7,
    tilt: -0.1,
    skills: [
      { name: 'Git', description: 'Version control.' },
      { name: 'GitHub', description: 'Hosting and collaboration.' },
      { name: 'VS Code', description: 'Editor.' },
      { name: 'npm', description: 'Package management.' },
      { name: 'Vercel', description: 'Deployment.' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative tech',
    color: '#FF7AD9',
    shape: 'octahedron',
    radius: 6.7,
    tilt: 0.25,
    skills: [
      { name: 'Framer Motion', description: 'Interface animation for React.', learning: true },
      { name: 'GSAP', description: 'Timeline-based animation.', learning: true },
      { name: 'Three.js', description: '3D in the browser.', learning: true },
      { name: 'React Three Fiber', description: 'Three.js through React components.', learning: true },
    ],
  },
]
