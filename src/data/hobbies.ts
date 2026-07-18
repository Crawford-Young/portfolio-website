import type { Hobby } from '@/types'

export const hobbies: Hobby[] = [
  {
    id: 'outdoors',
    title: 'Outdoors',
    description:
      'Hiking, camping, and being out in nature whenever possible. Spent summers at Camp Rockmont in the Blue Ridge Mountains — that love for the outdoors never left.',
    accentColor: 'rgba(16, 185, 129, 0.15)',
    photo: '/outdoors.jpeg',
    details: [
      {
        id: 'lacrosse',
        icon: 'Trophy',
        label: 'Lacrosse',
        detail: 'Played all four years of high school.',
      },
      {
        id: 'volleyball',
        icon: 'Users',
        label: 'Club Volleyball',
        detail: 'Played club volleyball at Auburn for a year.',
      },
      {
        id: 'kayak',
        icon: 'Waves',
        label: 'Kayak & Canoe Instructor',
        detail:
          'Whitewater kayak and canoe instructor at Camp Rockmont in the Blue Ridge Mountains.',
      },
      {
        id: 'vickery',
        icon: 'TreePine',
        label: 'Vickery Creek',
        detail: 'Favorite park in Atlanta so far — waterfalls, trails, and real elevation.',
      },
    ],
  },
  {
    id: 'instruments',
    title: 'Playing Instruments',
    description: "Started with band in high school and it stuck. I've been playing ever since.",
    accentColor: 'rgba(99, 102, 241, 0.15)',
    photo: '/instruments.JPG',
    details: [
      {
        id: 'five',
        icon: 'Music',
        label: '5 Instruments',
        detail: 'Piano, guitar, ukulele, harmonica, and trumpet.',
      },
      {
        id: 'trumpet',
        icon: 'Mic2',
        label: 'Trumpet Era',
        detail: 'Played through high school — symphonic band.',
      },
      {
        id: 'guitar',
        icon: 'Guitar',
        label: 'Guitar Deep Dive',
        detail: "Picked it up seriously two years ago. It's the one I play most now.",
      },
      {
        id: 'others',
        icon: 'Sparkles',
        label: 'The Others',
        detail: 'Piano, ukulele, and harmonica rotate in and out of practice.',
      },
    ],
  },
  {
    id: 'chess',
    title: 'Chess',
    description:
      'Competitive since high school. Chess sharpened my thinking in ways that transferred directly to software — pattern recognition, planning ahead, and knowing when to sacrifice for position.',
    accentColor: 'rgba(245, 158, 11, 0.15)',
    photo: '/chess.png',
    details: [
      {
        id: 'elo',
        icon: 'BarChart2',
        label: '1400 ELO',
        detail: 'Around 1400 rapid on chess.com.',
      },
      {
        id: 'challenge',
        icon: 'Sword',
        label: 'Challenge Me',
        href: 'https://www.chess.com/member/carsickyak',
      },
    ],
  },
  {
    id: 'gaming',
    title: 'Video Games',
    description:
      'Games got me into programming. Taking apart how a game works — the systems, the feedback loops, the UX — is still one of my favourite ways to think about product design.',
    accentColor: 'rgba(236, 72, 153, 0.15)',
    photo: '/gaming.JPG',
    details: [
      {
        id: 'rl',
        icon: 'Rocket',
        label: 'Rocket League',
        detail: 'Grand Champion — got there on game sense, not mechanics.',
      },
      {
        id: 'val',
        icon: 'Crosshair',
        label: 'Valorant',
        detail: 'Ascendant. Fill player, mostly sentinel.',
      },
      {
        id: 'ow',
        icon: 'Shield',
        label: 'Overwatch',
        detail: 'Diamond. I play everything, but Cass is my favorite.',
      },
      {
        id: 'indie',
        icon: 'Gamepad2',
        label: 'Indie Games',
        detail: 'A Short Hike, Wanderstop — small games with big ideas.',
      },
    ],
  },
  {
    id: 'writing',
    title: 'Writing & Philosophy',
    description:
      'Writing is how I process things. Philosophy is why I think it matters. Camus in particular — absurdism as optimism rather than despair.',
    accentColor: 'rgba(168, 85, 247, 0.15)',
    photo: '/profilePic.jpg',
    details: [
      {
        id: 'stories',
        icon: 'BookOpen',
        label: 'Short Stories & Poems',
        detail: 'Short fiction and poetry, whatever fits the feeling.',
      },
      {
        id: 'philosophy',
        icon: 'Feather',
        label: 'Philosophy',
        detail:
          "Camus in particular. Absurdism as optimism — the idea that you build meaning precisely because it isn't given.",
      },
      {
        id: 'camus',
        icon: 'Quote',
        label: 'Favourite Quote',
        detail: '"In the midst of winter I found there was within me an invincible summer."',
      },
      {
        id: 'substack',
        icon: 'PenLine',
        label: 'Read My Writing',
        href: 'https://substack.com/@crawfordyoung',
      },
    ],
  },
]
