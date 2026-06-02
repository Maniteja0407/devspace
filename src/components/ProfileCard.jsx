import React from 'react';
import { Users, BookOpen, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

export default function ProfileCard({ user, langData }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div style={styles.grid}>
      {/* Profile Sidebar */}
      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <img src={user.avatar_url} alt={user.login} style={styles.avatar} />
          <h2 style={styles.userName}>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" style={styles.userLink}>@{user.login}</a>
          <p style={styles.bio}>{user.bio || "No biography provided."}</p>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Followers</span>
            <span style={styles.statValue}>{user.followers.toLocaleString()}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Repos</span>
            <span style={styles.statValue}>{user.public_repos.toLocaleString()}</span>
          </div>
        </div>

        <div style={styles.metaList}>
          {user.location && <div style={styles.metaItem}><MapPin size={14} /> {user.location}</div>}
          {user.blog && <div style={styles.metaItem}><LinkIcon size={14} /> <a href={user.blog} style={styles.inlineLink}>{user.blog}</a></div>}
          <div style={styles.metaItem}><Calendar size={14} /> Joined {formatDate(user.created_at)}</div>
        </div>
      </div>

      {/* Language Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Linguistic Breakdown</h3>
        <div style={{ height: '260px', width: '100%' }}>
          {langData.length > 0 ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie data={langData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : <p style={styles.noData}>No data available</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' },
  card: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '24px', color: '#f1f5f9' },
  profileHeader: { textAlign: 'center', marginBottom: '20px' },
  avatar: { width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px', border: '2px solid #334155' },
  userName: { fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' },
  userLink: { color: '#818cf8', fontSize: '14px', textDecoration: 'none' },
  bio: { fontSize: '14px', color: '#94a3b8', marginTop: '12px', lineHeight: '1.5' },
  statsRow: { display: 'flex', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '16px 0', margin: '20px 0' },
  statItem: { flex: 1, textAlign: 'center' },
  statLabel: { display: 'block', fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' },
  statValue: { fontSize: '18px', fontWeight: 'bold' },
  metaList: { display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  inlineLink: { color: '#818cf8', textDecoration: 'none' },
  cardTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' },
  noData: { textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '100px' }
};