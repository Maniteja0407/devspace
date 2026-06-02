import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [langData, setLangData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGitHubData = async (username) => {
    setLoading(true);
    setError(null);
    setUserData(null);
    setRepoData([]);
    setLangData([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        throw new Error(userRes.status === 404 ? 'User not found' : 'API error occurred');
      }
      const user = await userRes.json();
      setUserData(user);

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      if (repoRes.ok) {
        const repos = await repoRes.json();
        const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepoData(sortedRepos);

        const langCounts = {};
        repos.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });

        const formattedLangData = Object.keys(langCounts).map(key => ({
          name: key,
          value: langCounts[key]
        })).sort((a, b) => b.value - a.value);

        setLangData(formattedLangData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 py-16 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SearchBar onSearch={fetchGitHubData} loading={loading} />

        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl max-w-2xl mx-auto text-rose-400 text-sm backdrop-blur-md animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}. Please verify the username and try again.</span>
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

        {userData && !loading && (
          <div className="transition-all duration-500 ease-out">
            <ProfileCard user={userData} langData={langData} />
            <RepoList repos={repoData} />
          </div>
        )}
      </div>
    </div>
  );
}