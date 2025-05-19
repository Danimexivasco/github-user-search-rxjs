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
  hasSearched: boolean;
  query: string;
  setQuery: (_query: string) => void;
  clearInput: () => void;
};

export function useReactiveSearch<T>(
  inputRef: preact.RefObject<HTMLInputElement>,
  searchFn: (_query: string) => Promise<{ items: T[] }>,
  options?: { debounce?: number }
): SearchResult<T> {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setQuery("");
    setResults([]);
    setHasSearched(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const input$ = fromEvent<InputEvent>(inputRef.current, "input").pipe(
      map((e) => (e.target as HTMLInputElement).value.trim()),
      debounceTime(options?.debounce ?? 300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length <= 0) {
          setResults([]);
          setQuery(query);
          setHasSearched(false);

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
      setHasSearched(true);
    });

    return () => sub.unsubscribe();
  }, [inputRef, options?.debounce]);

  return {
    results,
    loading,
    hasSearched,
    query,
    setQuery,
    clearInput
  };
}
