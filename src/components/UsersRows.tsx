import {
  List,
  ListItem,
  Button,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Skeleton
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import type { SearchResult } from "../hooks/useReactiveSearch";
import type { GitHubUser } from "../types";

const AVATAR_SIZE = 75;

type UsersRowsProps = {
  users: GitHubUser[],
  loading?: SearchResult<GitHubUser>["loading"]
};

function generateLoadingSkeleton() {
  return (
    <ListItem
      secondaryAction={
        <Skeleton
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      }
    >
      <ListItemButton
        sx={{
          display:      "flex",
          gap:          2,
          paddingRight: "120px",
          position:     "relative"
        }}
      >
        <ListItemAvatar>
          <Skeleton
            variant="circular"
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton width={200}/>}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function UsersRows({ users, loading }: UsersRowsProps) {
  if (loading) return (
    <List
      sx={{
        width: "100%"
      }}
    >
      {[...Array(12)].map(() => generateLoadingSkeleton())}
    </List>
  );

  return (
    <List
      sx={{
        width: "100%"
      }}
    >
      {users.map((user) => (
        <ListItem
          key={user.id}
          divider
          disablePadding
          secondaryAction={
            <Button
              size="large"
              aria-label="see user repos"
              href={`${user.html_url}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                gap:     0.5
              }}
            >
              <RemoveRedEyeOutlinedIcon />
              <span>see repos</span>
            </Button>
          }
        >
          <ListItemButton
            component="a"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display:      "flex",
              gap:          2,
              paddingRight: "120px",
              position:     "relative"
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={user.avatar_url}
                alt={user.login}
                sx={{
                  width:  AVATAR_SIZE,
                  height: AVATAR_SIZE
                }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                component={"p"}
                sx={{
                  whiteSpace:   "nowrap",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  width:        "65%"
                }}
              >{user.login}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}