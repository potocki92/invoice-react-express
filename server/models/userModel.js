import mongoose from "mongoose";

/*
  Defining a new mongoose schema for user data with fields for storing:
  
  1. user information, 
  2. list of products (with items and total amount), 
  3. list of clients, 
  4. list of invoices. 

  Each field has a default value of an empty array or object.
*/
const userSchema = new mongoose.Schema({
  user: { type: Object, default: {} },
  products: {
    type: Array,
    default: [],
  },
  clients: { type: Array, default: [] },
  invoices: { type: Array, default: [] },
});

const User = new mongoose.model("User", userSchema);

export default User;
