// hooks/use-fetch.js
import { useCallback, useState } from 'react';

export const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);   // fix: lower-case
  const [error, setError] = useState(null);

  const fn = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);                                  // fix: clear stale success

    try {
      const result = await cb(...args);             // call exactly with provided args

      // optional soft-fail guard for auth shapes
      if (result && typeof result === 'object' && 'user' in result && !result.user) {
        throw new Error('Invalid email or password');
      }

      setData(result);
      return result;                                 // IMPORTANT: return value to caller
    } catch (e) {
      const norm = e instanceof Error ? e : new Error(String(e));
      setError(norm);
      return null;                                   // so caller can branch
    } finally {
      setLoading(false);
    }
  }, [cb]);

  return { data, loading, error, fn };
};
