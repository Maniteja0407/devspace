const BASE = 'https://api.github.com';

export class GitHubError extends Error {}

async function request(path, signal) {
  const res = await fetch(`${BASE}${path}`, { signal });
  if (res.ok) return res.json();

  if (res.status === 404) throw new GitHubError('User not found.');

  const rateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0');
  if (rateLimited) {
    const reset = Number(res.headers.get('x-ratelimit-reset'));
    const mins = reset ? Math.max(1, Math.ceil((reset * 1000 - Date.now()) / 60000)) : null;
    throw new GitHubError(
      mins
        ? `GitHub rate limit reached. Try again in about ${mins} min.`
        : 'GitHub rate limit reached. Try again later.'
    );
  }
  throw new GitHubError(`GitHub API error (${res.status}).`);
}

export async function fetchProfile(username, signal) {
  const name = encodeURIComponent(username);
  const [user, repos] = await Promise.all([
    request(`/users/${name}`, signal),
    request(`/users/${name}/repos?per_page=100&sort=updated&type=owner`, signal),
  ]);
  return { user, repos };
}