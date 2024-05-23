import { Box, BoxProps, Button, Grid, Typography } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import authSvg from "../../assets/auth.svg";

import { FC, PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../../components/kits/TextField";
import { useLoginStyles } from "./index.style";
import { loginFormValidation } from "./index.constant";
import { TLoginFC } from "./index.type";


interface ICustomFlexBoxProps extends PropsWithChildren, BoxProps {
  justifyContent?: string;
  alignItems?: string;
}

type TCustomFlexBoxFC = FC<ICustomFlexBoxProps>;

const CustomFlexBox: TCustomFlexBoxFC = ({
  children,
  alignItems = "center",
  justifyContent = "center",
  ...props
}) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection="column"
      {...props}
    >
      {children}
    </Box>
  );
};


const Login: TLoginFC = () => {
  const { classes } = useLoginStyles();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormValidation),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("onsubmit called", data);
  });

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <CustomFlexBox height="100%" width="100%" flexDirection="column">
            <CustomFlexBox width="100%" gap={2} mb={5}>
              <VerifiedUserIcon fontSize="large" />
              <Typography variant="h4" component="h1">
                ورود به پنل ادمین دکتر آنلاین
              </Typography>
            </CustomFlexBox>
            <CustomFlexBox
              width="100%"
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
              <Button type="submit" fullWidth>
                ورود به حساب
              </Button>
            </CustomFlexBox>
          </CustomFlexBox>
        </Grid>
        <Grid item md={6}>
          <img src={authSvg} alt="auth" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
