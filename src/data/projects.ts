import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'component-library',
    title: '@crawfordyoung/ui Component Library',
    description:
      'Production-quality React component library built on Radix UI primitives, styled with Tailwind CSS and CVA. Wave 1 ships 10 fully-tested, accessible components.',
    tech: ['React', 'TypeScript', 'Radix UI', 'Storybook', 'CVA'],
    url: 'https://ui.crawfordyoung.dev',
    repo: 'https://github.com/Crawford-Young/cy-ui',
    npm: 'https://www.npmjs.com/package/@crawfordyoung/ui',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Personal website built with Next.js 15, @crawfordyoung/ui, and Framer Motion effects. Deployed on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://crawfordyoung.dev',
    repo: 'https://github.com/Crawford-Young/Crawford-Young.github.io',
  },
  {
    slug: 'cybond',
    title: 'Cybond',
    description:
      'AI-powered scheduling advisor that integrates with Google Calendar, analyzes your schedule, and surfaces recommendations to help you plan your week more intentionally.',
    tech: ['Next.js', 'TypeScript', 'AI SDK', 'Neon', 'Drizzle', 'Auth.js', 'Stripe'],
    url: 'https://cybond.crawfordyoung.dev',
  },
  {
    slug: 'web-dev-club',
    title: 'Web Dev Weekly Projects',
    description: 'Weekly project challenges for the Auburn University Web Development Club.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/Crawford-Young/WebDev',
  },
  {
    slug: 'ai-chess-bot',
    title: 'Chess Puzzle Generator',
    description:
      "AI that analyses player game history and assigns personalised puzzles targeting each player's weaknesses.",
    tech: ['Python', 'AI/ML'],
    repo: 'https://github.com/Crawford-Young/ChessBot',
  },
  {
    slug: 'instrument-tuner',
    title: 'Instrument Tuner',
    description:
      'Real-time instrument tuner that detects pitch from microphone input and displays accurate tuning feedback.',
    tech: ['Python', 'Audio Processing'],
    url: 'https://music.crawfordyoung.dev',
    repo: 'https://github.com/Crawford-Young/InstrumentTuner',
  },
  {
    slug: 'ai-pacman',
    title: 'AI Pacman',
    description:
      'Pacman with AI agents using search algorithms and reinforcement learning for autonomous play.',
    tech: ['Python', 'AI/ML'],
  },
  {
    slug: 'html-idle-game',
    title: 'HTML Idle Game',
    description:
      'Browser-based incremental game built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
]
