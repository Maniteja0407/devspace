import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchProfile, GitHubError } from '../services/github';

export function useGitHubProfile() {
  const [state, setState] = useState({ status: 'idle', user: null, repos: [], error: null });
  const controllerRef = useRef(null);

  const search = useCallback(async (username) => {
    controllerRef.current?.abort();            // cancel the previous request
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ status: 'loading', user: null, repos: [], error: null });
    try {
      const { user, repos } = await fetchProfile(username, controller.signal);
      setState({ status: 'success', user, repos, error: null });
    } catch (err) {
      if (err.name === 'AbortError') return;   // ignore cancelled requests
      const message = err instanceof GitHubError
        ? err.message
        : 'Network error. Check your connection and try again.';
      setState({ status: 'error', user: null, repos: [], error: message });
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []); // cleanup on unmount

  return { ...state, search };
}