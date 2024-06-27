import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/Actions/UserActions";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { Controller, useForm } from "react-hook-form";

function circularProgress(props) {
  return (
    <Box
      sx={{
        position: "relative",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={20}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={20}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
const role = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
  {
    value: "guest",
    label: "Guest",
  },
];
// ===========================|| USER REGISTRATION ||=========================== //

const UserLogin = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitLoader = useSelector((state) => state?.user.loader);

  const [loader, setLoader] = useState(submitLoader);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      ...data,
    };
    dispatch(userLogin(userData, navigate));
  };

  const handleGoToRegPage = () => {
    navigate("/");
  };

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  
  return (
    <>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid
              item
              sm={10}
              md={9}
              sx={{ mt: { md: 4, xs: 2.5 }, mb: { md: 4, xs: 2.5 } }}
            >
              <Grid container spacing={3} mb={-5}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 400,
                      lineHeight: 1.4,
                      [theme.breakpoints.up("md")]: { my: 0, mx: 12.5 },
                    }}
                    color="white"
                  >
                    User Login Form
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} sx={{ mb: -37.5 }}>
              <Card sx={{ mb: 6.25 }} elevation={4}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Email
                      </InputLabel>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            fullWidth
                            placeholder="Enter your email"
                            error={!!errors.email}
                            helperText={
                              errors.email ? errors.email.message : ""
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Password
                      </InputLabel>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            fullWidth
                            placeholder="Enter your password"
                            type="password"
                            error={!!errors.password}
                            helperText={
                              errors.password ? errors.password.message : ""
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -2 }}>
                      <Grid container spacing={3}>
                        <Grid item sm zeroMinWidth>
                          <Typography
                            align="left"
                            variant="body1"
                            component="div"
                          >
                            You don't have any account
                            <Typography
                              variant="subtitle1"
                              component="span"
                              to="#"
                              color="primary"
                              sx={{ mx: 0.5, cursor: "pointer" }}
                              onClick={handleGoToRegPage}
                            >
                              Sing up
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={loader}
                          >
                            Submit &nbsp;&nbsp;
                            {loader ? circularProgress() : ""}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
export default UserLogin;
