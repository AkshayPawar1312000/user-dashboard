import "./App.css";
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./Components/UserPages/UserDashboard";
import UserRegistration from "./Components/UserPages/UserRegistration";
import UserLogin from "./Components/UserPages/UserLogin";
import headerBackground from "./Image/background/bg-header.jpg";
import AlertMessage from "./Components/PopUpMessage/AlertMessage";

// This HeaderWrapper function provide the image to added in background
const HeaderWrapper = styled("div")(({ theme }) => ({
  backgroundImage: `url(${headerBackground})`,
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  textAlign: "center",
  height: "50vh", // Set height to 50% of viewport height
  display: "flex",
  alignItems: "center", // Center content vertically
  justifyContent: "center", // Center content horizontally
  [theme.breakpoints.down("md")]: {
    height: "40vh", // Adjust height for smaller screens if needed
  },
}));

function App() {
  return (
    <div>
      <HeaderWrapper>
        <AlertMessage />
        <Router>
          <Routes>
            <Route path="/" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/userDashboar" element={<UserDashboard />} />
          </Routes>
        </Router>
      </HeaderWrapper>
    </div>
  );
}

export default App;
