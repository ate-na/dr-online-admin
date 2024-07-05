import { Box } from "@mui/material";
import Header from "../components/kits/Header";
import { ILayoutType } from "./index.types";

const Layout: ILayoutType = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{maxWidth:'1536px',margin:'auto' ,}}>{children}</Box>
    </>
  );
};
export default Layout;
