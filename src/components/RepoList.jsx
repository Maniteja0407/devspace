import React from 'react';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';

export default function RepoList({ repos }) {
  return (
    <div>
      <h3 style={styles.sectionTitle}><Code size={20} /> Featured Repositories</h3>
      <div style={styles.repoGrid}>
        {repos.slice(0, 6).map((repo) => (
          <div key={repo.id} style={styles.repoCard}>
            <div style={styles.repoHeader}>
              <h4 style={styles.repoName}>{repo.name}</h4>
              <a href={repo.html_url} target="_blank" style={{ color: '#64748b' }}><ExternalLink size={16} /></a>
            </div>
            <p style={styles.repoDesc}>{repo.description || "No description provided."}</p>
            <div style={styles.repoFooter}>
              {repo.language && <span style={styles.langBadge}>{repo.language}</span>}
              <div style={styles.repoStats}>
                <span style={styles.stat}><Star size={14} color="#f59e0b" /> {repo.stargazers_count}</span>
                <span style={styles.stat}><GitFork size={14} color="#818cf8" /> {repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  repoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  repoCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  repoHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  repoName: { fontSize: '16px', fontWeight: 'bold', color: '#f1f5f9', margin: 0 },
  repoDesc: { fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', margin: '0 0 20px 0', height: '40px', overflow: 'hidden' },
  repoFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '12px' },
  langBadge: { fontSize: '11px', color: '#818cf8', backgroundColor: '#1e293b', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' },
  repoStats: { display: 'flex', gap: '12px', fontSize: '12px', color: '#94a3b8' },
  stat: { display: 'flex', alignItems: 'center', gap: '4px' }
};