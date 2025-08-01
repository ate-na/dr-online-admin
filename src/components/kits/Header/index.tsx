import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { THeaderType } from "./index.types";
import { APP_HEADER_MENU_ITEMS } from "./index.constant";
import { Link } from "react-router-dom";
import FlexBox from "../FlexBox";
import { Logout } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";

const Header: THeaderType = () => {
  const authCtx = useAuth();

  return (
    <header style={{ paddingBottom: "50px" }}>
      <AppBar position="static">
        <Toolbar sx={{ padding: 3, margin: "auto" }}>
          <FlexBox gap={8} component={"ul"}>
            <Typography component={"h1"} variant="body1">
              {authCtx.user?.firstName} {authCtx.user?.lastName}
            </Typography>
            {APP_HEADER_MENU_ITEMS.map((e) => (
              <Link to={e.to} key={e.name}>
                <Typography component={"h1"} variant="body1">
                  {e.name}
                </Typography>
              </Link>
            ))}
            <Button onClick={authCtx.Logout}>
              <Logout sx={{ marginInlineEnd: 1 }} />
              خروج از حساب کاربری
            </Button>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
