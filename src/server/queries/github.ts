const GITHUB_USER = 'Crawford-Young'
const BASE_URL = 'https://api.github.com'

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  return token
    ? { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
    : { Accept: 'application/vnd.github+json' }
}

export async function getGitHubProfile(): Promise<{ repos: number; followers: number }> {
  const res = await fetch(`${BASE_URL}/users/${GITHUB_USER}`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return { repos: 0, followers: 0 }
  const data = (await res.json()) as { public_repos: number; followers: number }
  return { repos: data.public_repos, followers: data.followers }
}

export async function getGitHubStars(): Promise<{ stars: number }> {
  const res = await fetch(`${BASE_URL}/users/${GITHUB_USER}/repos?per_page=100`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return { stars: 0 }
  const repos = (await res.json()) as unknown
  if (!Array.isArray(repos)) return { stars: 0 }
  return {
    stars: (repos as { stargazers_count: number }[]).reduce(
      (sum, r) => sum + r.stargazers_count,
      0
    ),
  }
}
