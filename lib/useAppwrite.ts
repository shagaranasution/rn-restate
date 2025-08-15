import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAppwriteOptions<
  T,
  P extends Record<string, string | number> | undefined,
> {
  fn: (params: P extends undefined ? void : P) => Promise<T>;
  params?: P;
  skip?: boolean;
  onError?: (message: string) => void;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

export const useAppwrite = <
  T,
  P extends Record<string, string | number> | undefined = undefined,
>({
  fn,
  params,
  skip = false,
  onError,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  const lastParams = useRef(params);

  const fetchData = useCallback(
    async (params?: P) => {
      setLoading(true);
      setError(null);
      lastParams.current = params ?? lastParams.current;

      try {
        // @ts-expect-error — types are conditional; safe if fn signature matches
        const result = await fn(lastParams.current);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        if (onError) onError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn, onError]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, [fetchData, params, skip]);

  const refetch = (newParams?: P) => fetchData(newParams);

  return { data, loading, error, refetch };
};
