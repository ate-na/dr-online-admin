import { Box, Grid, Typography } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import authSvg from "../../assets/auth.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/kits/TextField";
import { useLoginStyles } from "./index.style";
import { loginFormValidation } from "./index.constant";
import { TLoginFC } from "./index.type";
import FlexBox from "../../components/kits/FlexBox";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Button from "../../components/kits/Button";

const Login: TLoginFC = () => {
  const { classes } = useLoginStyles();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormValidation),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const AuthCtx = useAuth();

  const onSubmit = handleSubmit((data) => {
    console.log("onsubmit called", data);
    setLoading(() => true);
    AuthCtx.Login(data as any);
    setLoading(() => false);
  });

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FlexBox height="100%" width="100%" flexDirection="column" gap={4}>
            <FlexBox width="100%" gap={2}>
              <VerifiedUserIcon fontSize="large" />
              <Typography variant="h4" component="h1">
                ورود به پنل ادمین دکتر آنلاین
              </Typography>
            </FlexBox>
            <FlexBox
              width="80%"
              alignItems="flex-start"
              gap={2}
              flexDirection="column"
              component="form"
              onSubmit={onSubmit}
            >
              <TextField
                control={control}
                name="phone"
                icon={<LocalPhoneIcon />}
                label="شماره تماس"
                helperText="شما باید شماره تماس خود را وارد کنید"
              />
              <TextField
                control={control}
                name="password"
                icon={<KeyIcon />}
                label="گذرواژه"
                helperText="گذرواژه شما باید 8 حرف داشته باشد"
              />
              <Button loading={loading} type="submit" fullWidth>
                ورود به حساب
              </Button>
            </FlexBox>
          </FlexBox>
        </Grid>
        <Grid item md={6}>
          <img src={authSvg} alt="auth" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
