const BASE_URL = 'https://api.github.com';

export class GitHubError extends Error {}

async function request(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (res.ok) return res.json();

  if (res.status === 404) {
    throw new GitHubError('User not found. Please check the username.');
  }

  // GitHub allows only 60 unauthenticated requests per hour.
  const rateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0');

  if (rateLimited) {
    const resetAt = Number(res.headers.get('x-ratelimit-reset')); // unix seconds
    const mins = resetAt ? Math.max(1, Math.ceil((resetAt * 1000 - Date.now()) / 60000)) : null;
    throw new GitHubError(
      mins
        ? `GitHub rate limit reached. Try again in about ${mins} minute(s).`
        : 'GitHub rate limit reached. Please try again later.'
    );
  }

  throw new GitHubError(`GitHub API error (${res.status}). Please try again.`);
}

export async function fetchProfile(username, signal) {
  const name = encodeURIComponent(username); // stops "a/b" or "x?y" from changing the URL path
  // The two requests don't depend on each other, so run them in parallel.
  const [user, repos] = await Promise.all([
    request(`/users/${name}`, signal),
    request(`/users/${name}/repos?per_page=100&sort=updated&type=owner`, signal),
  ]);
  return { user, repos };
}