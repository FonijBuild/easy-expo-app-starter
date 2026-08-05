import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: (failureCount, error) => {
          const status =
            typeof error === 'object' && error && 'status' in error
              ? Number(error.status)
              : 0;
          if (status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
