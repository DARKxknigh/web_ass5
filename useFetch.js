import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useFetch - custom hook to fetch data from a URL.
 * Accepts: url (string) and optional options object for fetch
 * Returns: { data, loading, error, refetch }
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);
  const savedUrlRef = useRef(url);

  const fetchData = useCallback(async (signal) => {
    if (!savedUrlRef.current) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(savedUrlRef.current, { ...options, signal });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name === 'AbortError') {
        // aborted - do nothing
        return;
      }
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [options]);

  // refetch function exposed to consumer
  const refetch = useCallback((newUrl) => {
    if (newUrl) {
      savedUrlRef.current = newUrl;
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    fetchData(controllerRef.current.signal);
  }, [fetchData]);

  useEffect(() => {
    savedUrlRef.current = url;
    controllerRef.current = new AbortController();
    fetchData(controllerRef.current.signal);
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [url, fetchData]);

  return { data, loading, error, refetch };
}
