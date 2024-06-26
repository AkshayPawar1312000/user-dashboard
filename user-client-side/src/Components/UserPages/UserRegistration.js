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
} from "@mui/material";
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
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termAndCondition, setTermAndCondition] = useState();


  const handleChangeRole = (event) => {
    setRole(event.target?.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = () => {
    let date = new Date(birthday);
    const userData = {
      name: name,
      age: age,
      birthday: date,
      gender: gender,
      role: role,
      email: email,
      password: password,
      termAndCondition: termAndCondition,
    };
    dispatch(addUserData(userData, navigate));
  };
  const handleGoToLoginPage = () => {
    navigate("/login");
  };
 

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  return (
    <>
      {/* <Background> */}
      <Container>
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
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter a your name"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
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
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter a your age"
                      name="age"
                      type="number"
                      onChange={(event) => setAge(event.target.value)}
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
                      <DatePicker
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: { fullWidth: true, size: "small" },
                        }}
                        value={birthday} // Controlled component with state directly applied
                        onChange={(date) => setBirthday(date)}
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
                    <TextField
                      size="small"
                      style={{ textAlign: "left" }}
                      id="outlined-select-Size"
                      select
                      fullWidth
                      label="Select your role"
                      name="size"
                      value={role}
                      onChange={handleChangeRole}
                    >
                      {roles.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter a your email"
                      name="name"
                      onChange={(event) => setEmail(event.target.value)}
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
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter a your password"
                      name="age"
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
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

                    <FormControl
                      component="fieldset"
                      style={{ textAlign: "left", marginLeft: "-37%" }}
                    >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        style={{ justifyContent: "flex-start" }}
                        value={gender}
                        onChange={handleGenderChange}
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: -1 }}></Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: -2 }}>
                    <FormControlLabel
                      style={{ textAlign: "left", marginLeft: "-52%" }}
                      required
                      control={
                        <Checkbox
                          checked={termAndCondition}
                          onChange={(e) =>
                            setTermAndCondition(e.target.checked)
                          }
                        />
                      }
                      label="Terms and Conditions"
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
                          disabled={loader ? true : false}
                          onClick={handleSubmit}
                        >
                          submit &nbsp;&nbsp;
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
      </Container>
      {/* </Background> */}
     
    </>
  );
};
export default UserRegistration;
