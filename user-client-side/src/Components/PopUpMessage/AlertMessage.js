import React,{useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertMessage = () => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };
  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false);
  };
  return (
    <>
      {/* <-------------- Alert User added Success Massage ---------------> */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{ color: "green" }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {"User added successfully"}
        </Alert>
      </Snackbar>
      {/* <-------------- Alert User added fail Massage ---------------> */}
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={4000}
        onClose={handleCloseErrorAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{ color: "red" }}
      >
        <Alert
          onClose={handleCloseErrorAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {"User not added"}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AlertMessage;
