import { describe, it, expect } from 'vitest'
import { projects } from '@/data/projects'
import { workExperience, education } from '@/data/experience'
import { hobbies } from '@/data/hobbies'

describe('projects', () => {
  it('has 8 projects', () => expect(projects).toHaveLength(8))
  it('each project has slug, title, description, tech[]', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(Array.isArray(p.tech)).toBe(true)
    }
  })
})

describe('flagship projects', () => {
  const flagships = projects.filter((p) => p.flagship)

  it('marks exactly cybond, component-library, and instrument-tuner as flagships', () => {
    expect(flagships.map((p) => p.slug).sort()).toEqual([
      'component-library',
      'cybond',
      'instrument-tuner',
    ])
  })

  it('every flagship has pitch, screenshot, live url, and cta label', () => {
    for (const p of flagships) {
      expect(p.pitch, p.slug).toBeTruthy()
      expect(p.screenshot, p.slug).toMatch(/^\/screenshots\//)
      expect(p.url, p.slug).toBeTruthy()
      expect(p.ctaLabel, p.slug).toBeTruthy()
    }
  })
})

describe('experience', () => {
  it('first work entry is Aderant', () => expect(workExperience[0].company).toBe('Aderant'))
  it('has education entries', () => expect(education.length).toBeGreaterThan(0))
  it('first education entry is Auburn University', () =>
    expect(education[0].institution).toBe('Auburn University'))
})

describe('hobbies', () => {
  it('has 5 hobbies', () => expect(hobbies).toHaveLength(5))
  it('each hobby has required scalar fields', () => {
    for (const h of hobbies) {
      expect(h.id).toBeTruthy()
      expect(h.title).toBeTruthy()
      expect(h.description).toBeTruthy()
      expect(h.accentColor).toBeTruthy()
      expect(h.photo).toMatch(/^\//)
    }
  })
  it('each hobby has at least one detail card', () => {
    for (const h of hobbies) {
      expect(h.details.length).toBeGreaterThanOrEqual(1)
    }
  })
  it('detail copy uses the approved plain-voice wording', () => {
    const detail = (hobbyId: string, detailId: string): string | undefined =>
      hobbies.find((h) => h.id === hobbyId)?.details.find((d) => d.id === detailId)?.detail
    expect(detail('outdoors', 'lacrosse')).toBe('Played all four years of high school.')
    expect(detail('outdoors', 'kayak')).toBe(
      'Whitewater kayak and canoe instructor at Camp Rockmont in the Blue Ridge Mountains.'
    )
    expect(detail('instruments', 'five')).toBe('Piano, guitar, ukulele, harmonica, and trumpet.')
    expect(detail('chess', 'elo')).toBe('Around 1400 rapid on chess.com.')
    expect(detail('gaming', 'rl')).toBe(
      "Grand Champion — the most mechanically demanding game I've played."
    )
    expect(detail('writing', 'stories')).toBe(
      'Short fiction and poetry, whatever fits the feeling.'
    )
  })
  it('has no quippy copy anywhere in hobby text', () => {
    const all = hobbies
      .flatMap((h) => [h.description, ...h.details.map((d) => d.detail ?? '')])
      .join(' ')
    expect(all).not.toMatch(
      /hamstring|pretend to be athletic|not to flip|loudest thing|dialect|don't deserve|debugging|too specific to be made up|non-linear/i
    )
  })
  it('each detail card has id, icon, label, and either detail or href', () => {
    for (const h of hobbies) {
      for (const d of h.details) {
        expect(d.id).toBeTruthy()
        expect(d.icon).toBeTruthy()
        expect(d.label).toBeTruthy()
        expect(d.detail || d.href).toBeTruthy()
      }
    }
  })
})
