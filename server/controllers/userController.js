import User from "../models/userModel.js";

// Login User
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("Login");
  User.findOne({ "user.email": email }, (err, user) => {
    if (user) {
      const userEmail = user.user;
      console.log(userEmail);
      if (password === user.user.password) {
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
  User.findOne({ "user.email": email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        user: {
          name,
          email,
          password,
          NIP: "",
          REGON: "",
          address: {
            city: "",
            postalCode: "",
            street: "",
          },
          phone: "",
        },
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

// GET
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user.user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// PUT
export const putUser = async (req, res) => {
  const userId = req.params.id;
  const updateUser = { ...req.body };
  console.log(userId, updateUser);
  try {
    const user = await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: { user: updateUser },
      }
    );
    if (user.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
