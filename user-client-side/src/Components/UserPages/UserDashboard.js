import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Button,
  Stack,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Pagination,
  Menu,
  MenuItem,
  Paper,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function CircularProgressWithLabel(props) {
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
        size={20}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
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

const userInfo = [
  {
    id: "01",
    name: "Akshay Pawar",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
  {
    id: "02",
    name: "Dipti Jadav",
    age: 25,
    role: "guest",
    gender: "female",
    birthday: "30/02/2024",
  },
  {
    id: "03",
    name: "Dipak Pawar",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "21/05/2024",
  },
  {
    id: "04",
    name: "Ganesh Jay",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
  {
    id: "05",
    name: "Sandesh",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
  {
    id: "01",
    name: "sagar",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
  {
    id: "02",
    name: "jaydip",
    age: 25,
    role: "guest",
    gender: "female",
    birthday: "30/02/2024",
  },
  {
    id: "03",
    name: "sumedh",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "21/05/2024",
  },
  {
    id: "04",
    name: "omkar Jay",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
  {
    id: "05",
    name: "sandy",
    age: 20,
    role: "admin",
    gender: "male",
    birthday: "20/02/2024",
  },
];
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

const UserDashboard = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [role, setRole] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchAndRoleChange = (searchTerm, role) => {
    setSearchTerm(searchTerm);
    setRole(role);
    const filteredData = userInfo.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (role ? user.role === role : true)
    );
    setData(filteredData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.textContent, 10));
    setPage(1);
    handleClose();
  };

  useEffect(() => {
    setData(userInfo);
  }, []);

  const displayedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid
            item
            sm={10}
            md={9}
            sx={{ mt: { md: 4, xs: 2.5 }, mb: { md: 4, xs: 2.5 } }}
          >
            <Grid container spacing={3} mb={10}>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sx={{ mb: -37.5 }}>
            <Card sx={{ mb: 6.25 }} elevation={4}>
              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Grid container spacing={3}>
                      <Grid item sm zeroMinWidth textAlign={"left"}>
                        <Typography variant="h6">
                          <AccountCircleIcon sx={{ mb: -0.5, mr: 0.5 }} />
                          Users List
                        </Typography>
                      </Grid>
                      <Grid item>
                        <OutlinedInput
                          sx={{ width: 180 }}
                          id="input-search-list-style1"
                          placeholder="Search name"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon stroke={1.5} size="16px" />
                            </InputAdornment>
                          }
                          size="small"
                          onChange={(event) =>
                            handleSearchAndRoleChange(
                              event.target.value,
                              role
                            )
                          }
                        />
                        <TextField
                          sx={{ width: 160, marginLeft: 1 }}
                          size="small"
                          style={{ textAlign: "left" }}
                          id="outlined-select-Size"
                          select
                          fullWidth
                          placeholder="Select role"
                          name="size"
                          value={role}
                          onChange={(event) =>
                            handleSearchAndRoleChange(
                              searchTerm,
                              event.target.value
                            )
                          }
                        >
                          {roles.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} sx={{ mt: 0 }}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Birthday Date</TableCell>
                            <TableCell align="center" sx={{ pr: 3 }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {displayedData.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>{index + 1}</TableCell>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.age}</TableCell>
                              <TableCell align="right">{row.role}</TableCell>
                              <TableCell align="right">{row.gender}</TableCell>
                              <TableCell align="right">
                                {row.birthday}
                              </TableCell>
                              <TableCell align="center" sx={{ pr: 2 }}>
                                <Stack
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Tooltip placement="top" title="Edit">
                                    <IconButton
                                      color="primary"
                                      aria-label="edit"
                                      size="large"
                                    >
                                      <EditIcon sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip placement="top" title="Delete">
                                    <IconButton
                                      color="primary"
                                      sx={{
                                        color: "black",
                                        borderColor: "black",
                                        "&:hover ": { background: "#dee2e6" },
                                      }}
                                      size="large"
                                    >
                                      <DeleteIcon sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                      <Grid item>
                        <Pagination
                          count={Math.ceil(data.length / rowsPerPage)}
                          color="primary"
                          size="small"
                          page={page}
                          onChange={handleChangePage}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          size="large"
                          sx={{ color: theme.palette.grey[900] }}
                          color="secondary"
                          endIcon={<ExpandMoreRoundedIcon />}
                          onClick={handleClick}
                        >
                          {rowsPerPage} Rows
                        </Button>
                        {anchorEl && (
                          <Menu
                            id="menu-user-list-style1"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                          >
                            <MenuItem onClick={handleRowsPerPageChange}>
                              5 Rows
                            </MenuItem>
                            <MenuItem onClick={handleRowsPerPageChange}>
                              10 Rows
                            </MenuItem>
                            <MenuItem onClick={handleRowsPerPageChange}>
                              15 Rows
                            </MenuItem>
                          </Menu>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -2, mb: -2 }}>
                    <Grid container spacing={3}>
                      <Grid item sm zeroMinWidth textAlign={"left"}>
                        <p>Note: User data corrected according to your information.</p>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={loader}
                        >
                          Add user &nbsp;&nbsp;
                          {loader ? <CircularProgressWithLabel /> : ""}
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
    </>
  );
};

export default UserDashboard;
