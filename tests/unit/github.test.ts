import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getGitHubProfile, getGitHubStars } from '@/server/queries/github'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('getGitHubProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.GITHUB_TOKEN = 'test-token'
  })

  afterEach(() => {
    delete process.env.GITHUB_TOKEN
  })

  it('calls the correct URL with an Authorization header', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ public_repos: 15, followers: 42 }),
    })
    await getGitHubProfile()
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/users/Crawford-Young',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer test-token' }),
        next: { revalidate: 3600 },
      })
    )
  })

  it('returns repos and followers mapped from the API response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ public_repos: 15, followers: 42 }),
    })
    const result = await getGitHubProfile()
    expect(result).toEqual({ repos: 15, followers: 42 })
  })

  it('returns zeros when the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    const result = await getGitHubProfile()
    expect(result).toEqual({ repos: 0, followers: 0 })
  })

  it('omits the Authorization header when no token is configured', async () => {
    delete process.env.GITHUB_TOKEN
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ public_repos: 15, followers: 42 }),
    })
    await getGitHubProfile()
    const [, init] = mockFetch.mock.calls[0] as [string, { headers: Record<string, string> }]
    expect(init.headers).not.toHaveProperty('Authorization')
  })
})

describe('getGitHubStars', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.GITHUB_TOKEN = 'test-token'
  })

  afterEach(() => {
    delete process.env.GITHUB_TOKEN
  })

  it('calls the correct URL with an Authorization header', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    await getGitHubStars()
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/users/Crawford-Young/repos?per_page=100',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer test-token' }),
        next: { revalidate: 3600 },
      })
    )
  })

  it('sums stargazers_count across all repos', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { stargazers_count: 10 },
        { stargazers_count: 23 },
        { stargazers_count: 0 },
      ],
    })
    const result = await getGitHubStars()
    expect(result).toEqual({ stars: 33 })
  })

  it('returns zero stars when the repo list is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    const result = await getGitHubStars()
    expect(result).toEqual({ stars: 0 })
  })

  it('returns zero stars when the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    const result = await getGitHubStars()
    expect(result).toEqual({ stars: 0 })
  })

  it('returns zero stars when the response is not an array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'API rate limit exceeded' }),
    })
    const result = await getGitHubStars()
    expect(result).toEqual({ stars: 0 })
  })

  it('omits the Authorization header when no token is configured', async () => {
    delete process.env.GITHUB_TOKEN
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    await getGitHubStars()
    const [, init] = mockFetch.mock.calls[0] as [string, { headers: Record<string, string> }]
    expect(init.headers).not.toHaveProperty('Authorization')
  })
})
