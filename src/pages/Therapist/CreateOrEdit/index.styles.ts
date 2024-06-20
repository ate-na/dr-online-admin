import { makeStyles } from "tss-react/mui";

export const createAvatarStyle = makeStyles()((theme) => ({
  input: {
    display: "none",
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));
