import { useState } from "preact/hooks";
import { Button, Stack, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/AppsRounded";
import TableRowsIcon from "@mui/icons-material/TableRowsRounded";
import SearchIcon from "@mui/icons-material/Search";
import type { GitHubUser } from "../types";
import type { SearchResult } from "../hooks/useReactiveSearch";
import UsersGrid from "./UsersGrid";
import UsersRows from "./UsersRows";

type UserListProps = {
  users: GitHubUser[];
  query: string;
  loading: SearchResult<GitHubUser>["loading"];
};
type DisplayType = "grid" | "list";

function ListHeader({ query, setDisplayAs }: {query: string, setDisplayAs: (_displayAs: DisplayType) => void}) {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row"
      }}
      gap={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
      >
        <SearchIcon />
        <Typography
          variant="h5"
          component={"p"}
          textAlign={"center"}
        >
          Results for &quot;{query}&quot;
        </Typography>
      </Stack>
      <Stack
        direction="row"
        gap={1}
      >
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            gap:     .5
          }}
          onClick={() => setDisplayAs("grid")}
        >
          <AppsIcon />
          <span>Grid</span>
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            gap:     .5
          }}
          onClick={() => setDisplayAs("list")}
        >
          <TableRowsIcon />
          <span>List</span>
        </Button>
      </Stack>
    </Stack>
  );
}

function ListContent({ users, displayAs, loading }: {users: GitHubUser[], displayAs: DisplayType, loading: SearchResult<GitHubUser>["loading"]}) {
  if (displayAs === "list") return <UsersRows
    users={users}
    loading={loading}
  />;

  return <UsersGrid
    users={users}
    loading={loading}
  />;
}

export default function UserList({ users, query, loading }: UserListProps) {
  const [displayAs, setDisplayAs] = useState<DisplayType>("grid");

  return (
    <Stack
      direction="column"
      gap={4}
      maxWidth={displayAs === "list" ? "sm" : "lg"}
      sx={{
        width: "100%"
      }}
    >
      <ListHeader
        query={query}
        setDisplayAs={setDisplayAs}
      />
      <ListContent
        users={users}
        displayAs={displayAs}
        loading={loading}
      />
    </Stack>
  );
}