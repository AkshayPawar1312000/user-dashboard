// User routes define the endpoints and handle requests related to users, including authentication, registration, fetching user data, updating user profiles, and deleting user accounts.

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express.Router();
const cors = require("cors");
const bodyparser = require("body-parser");
const userController = require("../Controllers/userController");
const auth = require("./Middleware/auth");

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// auth ---> When I use the auth middleware function in the getAllUsers route and make the API call using Postman, it functions correctly.
// However, when I make the same API call from the client-side, it returns a Request failed with status code 401 error. now I'm trying to solve this bug.

// User Dashboard web appication routes 

// Retrieves all users from the database.
app.get("/users",  (req, res) => {
  userController.getAllUsers(req, res);
});

// Deletes a user specified by ID.
app.delete("/deleteUser/:id", (req, res) => {
  userController.deleteUser(req, res);
});

// Updates user details based on the ID provided.
app.put("/updateUser/:id", (req, res) => {
  userController.userUpdate(req, res);
});

// Adds a new user to the database.
app.post("/user", (req, res) => {
  userController.addUser(req, res);
});

// Handles user login authentication.
app.post("/login", async (req, res) => {
  userController.login(req, res);
});

module.exports = { userRoute: app };
