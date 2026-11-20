import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchProfile, GitHubError } from '../services/github';

const initialState = { status: 'idle', user: null, repos: [], error: null };

export function useGitHubProfile() {
  const [state, setState] = useState(initialState);
  const controllerRef = useRef(null); // remembers the in-flight request's AbortController

  const search = useCallback(async (username) => {
    controllerRef.current?.abort(); // cancel the previous request so an old response can't overwrite a new one
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ ...initialState, status: 'loading' });

    try {
      const { user, repos } = await fetchProfile(username, controller.signal);
      setState({ status: 'success', user, repos, error: null });
    } catch (err) {
      if (err.name === 'AbortError') return; // cancelled on purpose, not a real error
      const message =
        err instanceof GitHubError
          ? err.message
          : 'Network error. Please check your connection and try again.';
      setState({ ...initialState, status: 'error', error: message });
    }
  }, []);

  // Cleanup: cancel any pending request when the component unmounts.
  useEffect(() => () => controllerRef.current?.abort(), []);

  return { ...state, search };
}