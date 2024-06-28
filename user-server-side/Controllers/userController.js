const { mongoose } = require("mongoose");
const { User } = require("../Models/userModel");
const bcrypt = require("bcryptjs");

// User Controller manages user-related operations such as user authentication, registration,
// fetching user data, updating user profiles, and deleting user accounts.

// addUser: Handles the addition of a new user to the database, hashes the password, generates an authentication token,
// and sets it in a cookie.
const addUser = async (req, res) => {
  try {
    // First check user exists or not according to email
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a hash_password using bcrypt module
    const saltRound = 10;
    const hash_password = await bcrypt.hash(req.body.password, saltRound);

    // Add user in mongoDB
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age,
      birthday: req.body.birthday,
      role: req.body.role,
      gender: req.body.gender,
      email: req.body.email,
      password: hash_password,
      termAndCondition: req.body.termAndCondition,
    });

    // Save user in DB
    const newUser = await user.save();

    // Generate authentication token
    const token = await user.generateAuthToken();

    //Generate authentication token added in cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: "None",
    });

    // Response
    return res.status(201).send({
      message: `User added successfully`,
      result: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login: Manages user authentication by verifying credentials, comparing passwords,
// generating an authentication token, and setting it in a cookie upon successful login.
const login = async (req, res) => {
  try {
    // Check if user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Singin details" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Singin details" });
    }

    // Generate authentication token
    const token = await user.generateAuthToken();

    // Generate authentication token added in cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: "None",
    });

    // Send a successful response
    res
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// getAllUsers: Retrieves all users from the database and returns them as a JSON response.
const getAllUsers = async (req, res) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", err });
    });
};

// deleteUser: Deletes a user from the database based on the provided user ID.
const deleteUser = async (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "User delete successfully",
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", err });
    });
};

// userUpdate: Updates user information in the database, including hashing the new password, based on the provided user ID.
const userUpdate = async (req, res) => {
  const saltRound = 10;
  const hash_password = await bcrypt.hash(req.body.password, saltRound);

  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        birthday: req.body.birthday,
        role: req.body.role,
        gender: req.body.gender,
        email: req.body.email,
        password: hash_password,
        termAndCondition: req.body.termAndCondition,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "User updated successfully",
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", err });
    });
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  userUpdate,
  login,
};
