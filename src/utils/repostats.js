export function getLanguageStats(repos) {
  const counts = {};
  repos.filter((r) => !r.fork && r.language).forEach((r) => {
    counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value, percent: Math.round((value / total) * 100) }))
    .sort((a, b) => b.value - a.value);
}

export function getFeaturedRepos(repos, limit = 6) {
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
    .slice(0, limit);
}