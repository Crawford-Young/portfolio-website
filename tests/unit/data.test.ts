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
