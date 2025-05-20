import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import type { GitHubUser } from "../types";
import { useState } from "preact/hooks";
import type { SearchResult } from "../hooks/useReactiveSearch";
// import { useRepos } from "../hooks/useRepos";

type UserCardProps = {
  user: GitHubUser | null;
  loading?: SearchResult<GitHubUser>["loading"];
};

const AVATAR_SIZE = 125;

function LoadingUserCard() {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3
      }}
      sx={{
        display:        "flex",
        justifyContent: "center"
      }}
    >
      <Card
        sx={{
          minWidth: 260,
          width:    "100%"
        }}
      >
        <CardActionArea>
          <Stack
            direction={"column"}
            alignItems={"center"}
            padding={2}
          >
            <Skeleton
              variant="circular"
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
            />
            <CardContent
              sx={{
                width:     "100%",
                textAlign: "center"
              }}
            >
              <Skeleton
                width={125}
                height={20}
                sx={{
                  marginX: "auto"
                }}
              />
            </CardContent>
            <CardActions>
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
              />
            </CardActions>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default function UserCard({ user, loading }: UserCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  // const repos = useRepos(user.repos_url); // Use it if using API with auth to avoid 403

  if (loading) return <LoadingUserCard />;

  return (
    <Grid
      key={user?.id}
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3
      }}
      sx={{
        display:        "flex",
        justifyContent: "center"
      }}
    >
      <Card
        sx={{
          minWidth: 260,
          width:    "100%"
        }}
      >
        <CardActionArea
          href={user?.html_url ?? ""}
          target={"_blank"}
          rel="noopener noreferrer"
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            padding={2}
          >
            {!imgLoaded && (
              <Skeleton
                variant="circular"
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                animation="wave"
              />
            )}
            <Avatar
              src={user?.avatar_url}
              alt={user?.login}
              sx={{
                width:   AVATAR_SIZE,
                height:  AVATAR_SIZE,
                display: imgLoaded ? "block" : "none"

              }}
              slotProps={{
                img: {
                  onLoad: () => setImgLoaded(true)
                }
              }}
            />
            <CardContent
              sx={{
                whiteSpace:   "nowrap",
                overflow:     "hidden",
                textOverflow: "ellipsis",
                width:        "100%",
                textAlign:    "center"
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                sx={{
                  whiteSpace:   "nowrap",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  width:        "100%",
                  textAlign:    "center"
                }}
              >
                {user?.login}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                href={`${user?.html_url}?tab=repositories`}
                target={"_blank"}
                rel="noopener noreferrer"
              >See Repos
              </Button>
            </CardActions>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
}