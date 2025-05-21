/** @jsxImportSource preact */

import { render, screen, waitFor, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { useRef } from "preact/hooks";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach
} from "vitest";
import { useReactiveSearch } from "../../src/hooks/useReactiveSearch";

type User = { login: string };

function TestComponent({
  debounce = 300,
  searchFn
}: {
  debounce?: number;
  searchFn: (_query: string) => Promise<{ items: User[] }>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, query, clearInput } = useReactiveSearch<User>(
    inputRef,
    searchFn,
    {
      debounce
    }
  );

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Search"
        aria-label="search"
        type="text"
      />
      <button onClick={clearInput}>Clear</button>
      {loading && <p>Loading...</p>}
      <p>Query: {query}</p>
      <ul>
        {results.map((user) => (
          <li key={user.login}>{user.login}</li>
        ))}
      </ul>
    </>
  );
}

describe("useReactiveSearch", () => {
  beforeEach(cleanup);
  it("searches for input and returns results", async () => {
    const mockSearch = vi.fn(async (query: string) => ({
      items: [{
        login: `user-${query}`
      }]
    }));

    render(<TestComponent
      searchFn={mockSearch}
      debounce={100}
    />);
    const input = screen.getByPlaceholderText("Search");

    await userEvent.type(input, "abc");

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("abc");
    });

    await screen.findByText("user-abc");
  });

  it("clears input and results", async () => {
    const mockSearch = vi.fn(async () => ({
      items: [{
        login: "john"
      }]
    }));

    render(<TestComponent
      searchFn={mockSearch}
      debounce={0}
    />);
    const input = screen.getByLabelText("search");

    await userEvent.type(input, "john");
    await screen.findByText("john");

    await userEvent.click(screen.getByText("Clear"));

    expect(input).toHaveValue("");
    expect(screen.queryByText("john")).not.toBeInTheDocument();
  });

  it("does not search with empty input", async () => {
    const mockSearch = vi.fn();

    render(<TestComponent
      searchFn={mockSearch}
      debounce={0}
    />);
    const input = screen.getByLabelText("search");

    await userEvent.type(input, "  "); // only spaces

    await waitFor(() => {
      expect(mockSearch).not.toHaveBeenCalled();
    });
  });

  it("debounces search", async () => {
    vi.useFakeTimers();

    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime
    });

    const mockSearch = vi.fn(async (query: string) => ({
      items: [{
        login: `${query}`
      }]
    }));

    render(<TestComponent
      searchFn={mockSearch}
      debounce={1000}
    />);

    const input = screen.getByPlaceholderText("Search");
    await user.type(input, "danimexivasco");

    vi.advanceTimersByTime(500);

    await Promise.resolve();

    expect(mockSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("danimexivasco");
    });

    vi.useRealTimers();
  }, 2500);
});
