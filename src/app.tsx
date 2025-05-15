
import { useRef } from "preact/hooks";

import "./app.css";
import { useReactiveSearch } from "./hooks/useReactiveSearch";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

function searchGitHubUsers(query: string): Promise<{ items: GitHubUser[] }> {
  return fetch(`https://api.github.com/search/users?q=${query}`).then((res) =>
    res.json()
  );
}

export function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, loading } = useReactiveSearch<GitHubUser>(
    inputRef,
    searchGitHubUsers
  );

  return (
    <div
      style={{
        padding:    "2rem",
        fontFamily: "sans-serif"
      }}
    >
      <h1>GitHub User Search 🔍 <br /> with RxJS 💪🏼</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search GitHub users"
        style={{
          padding:      "0.5rem",
          width:        "100%",
          marginBottom: "1rem"
        }}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((user: GitHubUser) => (
          <li key={user.id}>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={user.avatar_url}
                width="32"
                style={{
                  verticalAlign: "middle"
                }}
              />{" "}
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
