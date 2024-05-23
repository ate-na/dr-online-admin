import { makeStyles } from "tss-react/mui";

export const useLoginStyles = makeStyles()(() => ({
  root: {
    backgroundColor: "#1d232a",
    position: "absolute",
    padding: "40px",
    top: "50%",
    left: "50%",
    width: "70%",
    transform: "translate(-50%, -50%)",
  },
}));
