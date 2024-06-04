import { makeStyles } from "tss-react/mui";

export const createAvatarStyle = makeStyles()((theme) => ({
  root: {},
  input: {
    display: "none",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
