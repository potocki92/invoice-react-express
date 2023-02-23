import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  products: { type: Array, default: [] },
  clients: { type: Array, default: [] },
  invoices: { type: Array, default: [] },
});

const User = new mongoose.model("User", userSchema);

export default User;
