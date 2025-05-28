import useSWR from 'swr';

export function useUser(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? '/users/' + id : null, fetcher);
  return { user: data, isLoading, error, mutate };
}

function fetcher(url: string) {
  return fetch(url).then(res => res.json());
} 