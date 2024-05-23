import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import authSvg from "../../assets/auth.svg";

const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box padding={8} borderRadius={1} bgcolor="InfoText" width="100%">
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mb={5}
              >
                <VerifiedUserIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  ورود به پنل ادمین دکتر آنلاین
                </Typography>
              </Box>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                gap={2}
                flexDirection="column"
                component="form"
              >
                <TextField
                  InputProps={{
                    startAdornment: <LocalPhoneIcon />,
                  }}
                  fullWidth
                  label="شماره تماس"
                  helperText="شما باید شماره تماس خود را وارد کنید"
                />
                <TextField
                  fullWidth
                  label="گذرواژه"
                  helperText="گذرواژه شما باید 8 حرف داشته باشد"
                  InputProps={{
                    startAdornment: <KeyIcon />,
                  }}
                />
                <Button fullWidth>ورود به حساب</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <img src={authSvg} alt="auth" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Login;
