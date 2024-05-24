import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { THeaderType } from "./index.types";
import { APP_HEADER_MENU_ITEMS } from "./index.constant";
import { Link } from "react-router-dom";
import FlexBox from "../FlexBox";
import { Logout } from "@mui/icons-material";

const Header: THeaderType = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ padding: 3 }}>
        <FlexBox gap={8} component={"ul"}>
          {APP_HEADER_MENU_ITEMS.map((e) => (
            <Link to={e.to}>
              <Typography component={"h1"} variant="body1">
                {e.name}
              </Typography>
            </Link>
          ))}
          <Button>
            <Logout sx={{ marginInlineEnd: 1 }} />
            خروج از حساب کاربری
          </Button>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
