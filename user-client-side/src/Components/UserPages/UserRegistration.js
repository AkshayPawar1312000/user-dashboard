import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { addUserData } from "../../Store/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import dayjs from "dayjs";

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

const roles = [
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

const UserRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitLoader = useSelector((state) => state?.user.loader);

  const theme = useTheme();
  const [loader, setLoader] = useState(submitLoader);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let date = new Date(data.birthday);
    const userData = {
      ...data,
      birthday: date,
    };
    // dispatch(addUserData(userData, navigate));
    console.log(userData)
  };

  const handleGoToLoginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);

  return (
    <>
      <Container>
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
                    User Registration Form
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} sx={{ mb: -37.5 }}>
              <Card sx={{ mb: 6.25 }} elevation={4}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Name
                      </InputLabel>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            fullWidth
                            placeholder="Enter your name"
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ""}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Age
                      </InputLabel>
                      <Controller
                        name="age"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Age is required", min: 1 }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            fullWidth
                            placeholder="Enter your age"
                            type="number"
                            error={!!errors.age}
                            helperText={errors.age ? errors.age.message : ""}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Birthday
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="birthday"
                          control={control}
                          defaultValue={null}
                          rules={{ required: "Birthday is required" }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              format="DD/MM/YYYY"
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  size: "small",
                                  error: !!errors.birthday,
                                  helperText: errors.birthday
                                    ? errors.birthday.message
                                    : null,
                                },
                              }}
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(date) =>
                                field.onChange(
                                  date ? dayjs(date).toDate() : null
                                )
                              }
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          marginBottom: 4,
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Role
                      </InputLabel>
                      <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            style={{ textAlign: "left" }}
                            select
                            fullWidth
                            label="Select your role"
                            error={!!errors.role}
                            helperText={errors.role ? errors.role.message : ""}
                          >
                            {roles.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
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
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
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
                    <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                      <InputLabel
                        style={{
                          textAlign: "left",
                          color: "#808080",
                          fontWeight: 500,
                        }}
                      >
                        Gender
                      </InputLabel>
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Gender is required" }}
                        render={({ field }) => (
                          <FormControl
                            component="fieldset"
                            style={{
                              textAlign: "left",
                              marginLeft: "-37%",
                            }}
                          >
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              style={{ justifyContent: "flex-start" }}
                              value={field.value}
                              onChange={(event) =>
                                field.onChange(event.target.value)
                              }
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                              />
                              <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                              />
                            </RadioGroup>
                            {errors.gender && (
                              <FormHelperText error>
                                {errors.gender.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: -2 }}>
                      <Controller
                        name="termAndCondition"
                        control={control}
                        defaultValue={false}
                        rules={{
                          required: "You must accept the terms and conditions",
                        }}
                        render={({ field }) => (
                          <FormControlLabel
                            style={{
                              textAlign: "left",
                              marginLeft: "-52%",
                            }}
                            required
                            control={
                              <Checkbox
                                {...field}
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            }
                            label="Terms and Conditions"
                          />
                        )}
                      />
                      {errors.termAndCondition && (
                        <FormHelperText error>
                          {errors.termAndCondition.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -2 }}>
                      <Grid container spacing={3}>
                        <Grid item sm zeroMinWidth>
                          <Typography
                            align="left"
                            variant="body1"
                            component="div"
                          >
                            You have already an account
                            <Typography
                              variant="subtitle1"
                              component="span"
                              to="#"
                              color="primary"
                              sx={{ mx: 0.5, cursor: "pointer" }}
                              onClick={handleGoToLoginPage}
                            >
                              log in
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

export default UserRegistration;
