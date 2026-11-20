import { useMemo } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import { AlertCircle } from 'lucide-react';
import { useGitHubProfile } from './hooks/useGitHubProfile';
import { getLanguageStats, getFeaturedRepos } from './utils/repoStats';

export default function App() {
  const { status, user, repos, error, search } = useGitHubProfile();
  const loading = status === 'loading';

  // Recalculate only when repos change, not on every render.
  const langData = useMemo(() => getLanguageStats(repos), [repos]);
  const featuredRepos = useMemo(() => getFeaturedRepos(repos), [repos]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 py-16 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SearchBar onSearch={search} loading={loading} />

        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl max-w-2xl mx-auto text-rose-400 text-sm backdrop-blur-md">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/20 h-[420px] rounded-3xl border border-slate-800"></div>
              <div className="md:col-span-2 bg-slate-800/20 h-[420px] rounded-3xl border border-slate-800"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="h-32 bg-slate-800/20 rounded-2xl border border-slate-800"></div>
              <div className="h-32 bg-slate-800/20 rounded-2xl border border-slate-800"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="transition-all duration-500 ease-out">
            <ProfileCard user={user} langData={langData} />
            <RepoList repos={featuredRepos} />
          </div>
        )}
      </div>
    </div>
  );
}