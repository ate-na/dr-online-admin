import { Box } from "@mui/material";
import Header from "../components/kits/Header";
import { ILayoutType } from "./index.types";

const Layout: ILayoutType = ({ children }) => {
  return (
    <>
      <Header />
      <Box p={5}>{children}</Box>
    </>
  );
};
export default Layout;
