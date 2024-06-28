// User model defines the structure and behavior of user data, including fields like name, age, birthday, role, gender, email, password,
// and additional profile information.

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  age: { type: Number, required: true },
  birthday: { type: Date, require: true },
  role: { type: String, require: true },
  gender: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  termAndCondition: { type: Boolean, require: true },
  tokens: [
    {
      token: { type: String },
    },
  ],
});

// generateAuthToken Method: Defines an instance method generateAuthToken on the schema, which generates a JWT (JSON Web Token)
// for user authentication. It signs the token with a secure key stored in the environment variables,
// saves the token to the tokens array in the schema instance, and returns the generated token.
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECURE_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part" + error);
    console.log("the error part" + error);
  }
};

// User Model: Creates a Mongoose model User based on the userSchema.
const User = mongoose.model("User", userSchema);

// Exports: Exports the User model to be used elsewhere in the application.
module.exports = { User };
