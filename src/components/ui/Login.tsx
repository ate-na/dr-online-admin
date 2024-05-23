import {
  Box,
  Button,
  Container,
  FormHelperText,
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
      <Box
        sx={{
          bgcolor: "#27313b",
          height: "90vh",
          width: "90vw",
          display: "flex",

          flex: "1 1 40rem",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem 0rem",
            justifyContent: "center",
            gap: "2rem",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <VerifiedUserIcon />
            <Typography variant="h4">ورود به پنل ادمین دکتر آنلاین</Typography>
          </Box>
          <Box>
            <TextField
              label="شماره تماس"
              variant="outlined"
              sx={{ width: "20vw" }}
              aria-describedby="filled-phone-helper-text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText id="filled-phone-helper-text">
              شما باید شماره تماس خود را وارد کنید
            </FormHelperText>
          </Box>
          <Box>
            <TextField
              label="گذرواژه"
              variant="outlined"
              sx={{ width: "20vw" }}
              aria-describedby="filled-phone-helper-text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText id="filled-phone-helper-text">
              گذرواژه شما باید 8 حرف داشته باشد
            </FormHelperText>
          </Box>
          <Button variant="contained" sx={{ width: "20vw" }}>
            ورود به حساب
          </Button>
        </Box>
        <img src={authSvg} alt="auth" style={{ width: "38vw" }} />
      </Box>
    </Container>
  );
};
export default Login;
