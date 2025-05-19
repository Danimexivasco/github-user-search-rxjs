import { useEffect, useState } from "preact/hooks";
import { fromEvent, of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
  catchError
} from "rxjs/operators";

export type SearchResult<T> = {
  results: T[];
  loading: boolean;
  query: string;
  setQuery: (_query: string) => void;
  clearInput: () => void;
};

export function useReactiveSearch<T>(
  inputRef: preact.RefObject<HTMLInputElement>,
  searchFn: (_query: string) => Promise<{ items: T[] }>
): SearchResult<T> {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setQuery("");
    setResults([]);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const input$ = fromEvent<InputEvent>(inputRef.current, "input").pipe(
      map((e) => (e.target as HTMLInputElement).value.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length <= 0) {
          setResults([]);
          setQuery(query);

          return of({
            items: []
          });
        }

        setQuery(query);
        setLoading(true);

        return searchFn(query);
      }),
      catchError((err, caught) => {
        console.error(err);
        setResults([]);
        return caught;
      })
    );

    const sub = input$.subscribe((res) => {
      setLoading(false);
      setResults(res.items ?? []);
    });

    return () => sub.unsubscribe();
  }, [inputRef]);

  return {
    results,
    loading,
    query,
    setQuery,
    clearInput
  };
}
