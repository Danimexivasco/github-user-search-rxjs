
import { useRef, useState } from "preact/hooks";
import { Toaster, toast } from "sonner";

import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ClearIcon from "@mui/icons-material/Clear";
import { useReactiveSearch } from "./hooks/useReactiveSearch";

import type { GitHubUser } from "./types";
import UserList from "./components/UserList";
import RxJSIcon from "./components/icons/RxJSLogo";
import GitHubIcon from "./components/icons/GitHubLogo";
import Dialog from "./components/Dialog";
import PreactIcon from "./components/icons/PreactLogo";
import MaterialUIIcon from "./components/icons/MaterialUILogo";
import ViteIcon from "./components/icons/ViteLogo";
import DebounceSlider from "./components/DebounceSlider";

async function searchGitHubUsers(query: string): Promise<{ items: GitHubUser[] }> {
  try {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);

    if (!res.ok) {
      toast.error(`Something went wrong (HTTP ${res.status}). Please try again in a few minutes.`);
      return {
        items: []
      };
    }
    const json = await res.json();

    return json;
  } catch {
    toast.error("Something went wrong. Please try again in a few minutes.");

    return {
      items: []
    };
  }
}

// TODO: Add pagination for more results
export function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [debounceValue, setDebounceValue] = useState(200);

  const { results, loading, hasSearched, query, setQuery, clearInput } = useReactiveSearch<GitHubUser>(
    inputRef,
    searchGitHubUsers,
    {
      debounce: debounceValue
    }
  );

  return (
    <Stack
      direction="column"
      spacing={6}
      maxWidth={"lg"}
      justifyContent={"center"}
      alignItems={"center"}
      marginX={"auto"}
      paddingY={{
        xs: 4,
        sm: 12
      }}
      paddingX={{
        xs: 2,
        sm: 4
      }}
    >
      <Toaster richColors/>
      <Dialog
        triggerText="About the App"
        title="GitHub User Search"
        content={
          <>
            <Typography gutterBottom>
              A fast and responsive GitHub user search app built with <Link href="https://preactjs.com/">Preact</Link>, <Link href="https://rxjs.dev/">RxJS</Link>, and <Link href="https://mui.com/">Material UI</Link>. It features real-time search with debounced input, API integration, and a clean, responsive UI. Built using <Link href="https://vitejs.dev/">Vite</Link> for lightning-fast development.
            </Typography>

            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                marginTop: 2
              }}
            >
              <strong>Features:</strong>
            </Typography>

            <ul
              style={{
                listStyleType: "disc",
                lineHeight:    2,
                margin:        0
              }}
            >
              <li>🔎 Live search GitHub users via the GitHub API</li>
              <li>⚡ Debounced, reactive search using RxJS observables</li>
              <li>🧱 UI components with MUI and layout with responsive Grid</li>
              <li>🌀 Avatar loading skeletons and ellipsis overflow handling</li>
              <li>💾 Modular, reusable custom RxJS hook for API queries</li>
              <li>⚛️ Built with Preact for minimal bundle size</li>
              <li>🚀 Powered by Vite for instant development builds</li>
            </ul>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                marginTop: 2
              }}
            >
              <strong>Stack:</strong>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem"
                }
              }}
            >
              <Tooltip
                title="Vite"
                arrow
              >
                <IconButton size="large">
                  <ViteIcon />
                </IconButton>
              </Tooltip>
              +
              <Tooltip
                title="Preact"
                arrow
              >
                <IconButton size="large">
                  <PreactIcon />
                </IconButton>
              </Tooltip>
              +
              <Tooltip
                title="RxJS"
                arrow
              >
                <IconButton size="large">
                  <RxJSIcon />
                </IconButton>
              </Tooltip>
              +
              <Tooltip
                title="Material UI"
                arrow
              >
                <IconButton size="large">
                  <MaterialUIIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </>
        }
      />

      <Typography
        component={"h1"}
        gutterBottom
        textAlign={"center"}
        sx={{
          typography: {
            xs: "h4",
            sm: "h3"
          }
        }}
      >
        Github <Link
          href="https://github.com/danimexivasco/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to Danimexivasco GitHub profile"
        ><GitHubIcon />
        </Link> User Search + RxJS <Link
          href="https://rxjs.dev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to RxJS website"
        ><RxJSIcon />
        </Link>
      </Typography>

      <Stack
        spacing={4}
        maxWidth={"sm"}
        justifyContent={"center"}
        alignItems={"center"}
        marginX={"auto"}
        sx={{
          width: "100%"
        }}
      >
        <DebounceSlider
          debounceValue={debounceValue}
          onChange={setDebounceValue}
        />

        <TextField
          inputRef={inputRef}
          value={query}
          onChange={(e) => setQuery((e.target as HTMLInputElement)?.value ?? "")}
          label="Search GitHub users"
          variant="outlined"
          autoComplete="off"
          sx={{
            marginBottom: "1rem",
            width:        "100%"
          }}
          slotProps={{
            input: {
              endAdornment: inputRef.current?.value ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={clearInput}
                    aria-label="clear input"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          }}
        />

        {!query &&
          <Stack
            alignItems="center"
            onClick={() => inputRef.current?.focus()}
            sx={{
              cursor: "pointer"
            }}
          >
            <ArrowUpwardIcon className="animate-bounce"/>
            <Typography
              variant="h5"
              component={"p"}
              textAlign={"center"}
            >
              Start typing to search GitHub users
            </Typography>
          </Stack>
        }
      </Stack>
      {query && hasSearched && !loading && results.length === 0 && <p>No users found</p>}
      {results.length > 0 && (
        <UserList
          users={results}
          query={query}
          loading={loading}
        />
      )}
    </Stack>
  );
}
