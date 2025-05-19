import { Grid } from "@mui/material";
import type { GitHubUser } from "../types";
import UserCard from "./UserCard";
import type { SearchResult } from "../hooks/useReactiveSearch";
import { Fragment } from "preact/jsx-runtime";

type UsersGridProps = {
  users: GitHubUser[],
  loading: SearchResult<GitHubUser>["loading"]
};

export default function UsersGrid({ users, loading }: UsersGridProps) {
  if (loading) return (
    <Grid
      container
      spacing={4}
      justifyContent={"center"}
    >
      {[...Array(12)].map((_, idx) =>
        <Fragment key={idx}>
          <UserCard
            user={null}
            loading
          />
        </Fragment>
      )}
    </Grid>
  );

  return (
    <Grid
      container
      spacing={4}
      justifyContent={"center"}
    >
      {users.map((user: GitHubUser) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </Grid>
  );
}