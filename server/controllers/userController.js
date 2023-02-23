import User from "../models/userModel.js";

// Login User
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send("User not registered");
    }
  });
};

// Register User
export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
};
