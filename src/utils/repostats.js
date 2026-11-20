
export function getLanguageStats(repos) {
  const counts = {};
  repos
    .filter((repo) => !repo.fork && repo.language)
    .forEach((repo) => {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return Object.entries(counts)
    .map(([name, value]) => ({
      name,
      value,
      percent: total ? Math.round((value / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getFeaturedRepos(repos, limit = 6) {
  return repos
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count)
    )
    .slice(0, limit);
}