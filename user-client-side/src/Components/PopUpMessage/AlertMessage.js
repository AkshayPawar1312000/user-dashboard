import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// AlertMessage component displays a customizable alert box with messages.
// It supports different alert types such as success, error, and warning.
const AlertMessage = () => {
  
  // useSelector
  const successMess = useSelector((state) => state?.user.successMessage);
  const errorMess = useSelector((state) => state?.user.errorMessage);

  //useState
  const [openSuccessAlert, setOpenSuccessAlert] = useState(successMess?.type);
  const [openErrorAlert, setOpenErrorAlert] = useState(errorMess?.type);

  // functions
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

  // useEffect
  useEffect(() => {
    setOpenSuccessAlert(successMess?.type);
  }, [successMess]);
  useEffect(() => {
    setOpenErrorAlert(errorMess?.type);
  }, [errorMess]);
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
          {successMess?.message}
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
          {errorMess?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AlertMessage;
