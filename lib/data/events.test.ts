import { describe, expect, it } from 'vitest'
import {
  eventBySlug,
  partnerRoleEvents,
  winnersFor,
  type EventRecord,
} from './events'
import { partners } from './partners'

const nonAgoraHackathons = [
  'frostbyte-hackathon-2026',
  'stellar-philippines-hackathon',
  'egovph-hackathon',
  'stellar-apac-hackathon',
  'startup-qc-student-competition',
  'appcon',
]

const required = (slug: string): EventRecord => {
  const e = eventBySlug(slug)
  expect(e, `event ${slug} should exist`).toBeDefined()
  return e as EventRecord
}

describe('event winners', () => {
  it('gives every non-Agora hackathon at least one winner', () => {
    for (const slug of nonAgoraHackathons) {
      const e = required(slug)
      expect(winnersFor(e).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('keeps Agora with real outcomes and no winners field', () => {
    const agora = required('agora-hackathon-philippines-2026')
    expect(agora.winners).toBeUndefined()
    expect(agora.outcomes.length).toBeGreaterThan(0)
  })

  it('returns [] from winnersFor for a non-hackathon event', () => {
    const meetup = required('aws-ug-novators-onboarding-2026')
    expect(winnersFor(meetup)).toEqual([])
  })
})

describe('partnerRoleEvents', () => {
  const slugs = partnerRoleEvents.map((e) => e.slug)

  it('includes the Novators community-partner onboarding', () => {
    expect(slugs).toContain('aws-ug-novators-onboarding-2026')
  })

  it('excludes a TBC stub and the Speaker slot event', () => {
    expect(slugs).not.toContain('appcon')
    expect(slugs).not.toContain('autonomous-bedrock-agents-aws-community-day-ph')
  })
})

describe('partners ambassador placeholder', () => {
  it('includes the logo-less Grab x MoveIt Student Ambassador', () => {
    const entry = partners.find((p) => p.slug === 'grab-moveit-student-ambassador')
    expect(entry).toBeDefined()
    expect(entry?.tier).toBe('ambassador')
    expect(entry?.logo).toBeUndefined()
  })
})
