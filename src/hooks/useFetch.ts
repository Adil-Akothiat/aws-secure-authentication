import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(url, { ...options, signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
};