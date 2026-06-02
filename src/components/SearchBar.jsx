import React, { useState } from 'react';
import { Search, Terminal } from 'lucide-react';

export default function SearchBar({ onSearch, loading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onSearch(username.trim());
  };

  return (
    <div style={styles.container}>
      {/* Top Badge */}
      <div style={styles.badge}>
        <Terminal size={14} style={{ color: '#818cf8' }} />
        <span>DevSpace</span>
      </div>
      
      {/* Main Headers */}
      <h1 style={styles.heading}>
        Search Less. <span style={styles.gradientText}>Discover More.</span>
      </h1>
      <p style={styles.subheading}>
        Enter any GitHub handle to instantly map out profile languages, statistics, and repositories.
      </p>

      {/* The Search Form Box */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
          {/* Magnifying Glass Icon - NOW FORCED VISIBLE */}
          <Search size={22} style={styles.searchIcon} />
          
          {/* High Contrast, Highly Visible Input Field */}
          <input
            type="text"
            placeholder="Search github username (e.g., gaearon)..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        
        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {loading ? 'Analyzing...' : 'Analyze Profile'}
        </button>
      </form>
    </div>
  );
}

// BULLETPROOF STANDARD INLINE CSS STYLES
const styles = {
  container: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 48px auto',
    padding: '0 16px',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '9999px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    fontSize: '12px',
    fontWeight: '600',
    color: '#a5b4fc',
    marginBottom: '24px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#ffffff',
    margin: '0 0 12px 0',
    letterSpacing: '-0.025em',
    lineHeight: '1.2',
  },
  gradientText: {
    background: 'linear-gradient(to right, #818cf8, #c084fc, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subheading: {
    fontSize: '15px',
    color: '#94a3b8',
    maxWidth: '480px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    backgroundColor: '#020617', // Solid Deep Dark Background
    border: '2px solid #1e293b',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    color: '#64748b', // Clear Slate Gray color for the icon
    zIndex: 10,
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 52px', // Massive left padding to prevent overlapping with the icon
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff', // CRISP WHITE TYPED TEXT
    fontSize: '17px',
    fontWeight: '500',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 28px',
    background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  },
  buttonDisabled: {
    background: '#1e293b',
    color: '#64748b',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
};