import { useEffect, useState } from "react";

export function useRepos(reposUrl: string) {
  const [reposCount, setReposCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(reposUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setReposCount(data.length);
        }
      })
      .catch(() => setReposCount(0));
    return () => {
      cancelled = true;
    };
  }, [reposUrl]);

  return reposCount;
}
