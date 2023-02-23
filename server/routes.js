import express from "express";
import { loginUser, registerUser } from "./controllers/userController.js";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "./controllers/productsController.js";
import {
  addClient,
  deleteClient,
  getClients,
} from "./controllers/clientController.js";
import { addInvoice, getInvoices } from "./controllers/invoiceController.js";
const router = express.Router();

/* 
AUTHENTICATION USER 
*/

// LOGIN USER
router.post("/login", loginUser);
// REGISTER USER
router.post("/register", registerUser);

/* 
PRODUCTS  
*/

// POST
router.post("/:id/addProduct", addProduct);
// GET
router.get("/:id/products", getProducts);
// DELETE
router.delete("/:id/products/:productId", deleteProduct);

/*
CLIENTS
*/

// POST
router.post("/:id/addClient", addClient);
// GET
router.get("/:id/clients", getClients);
// DELETE
router.delete("/:id/clients/:clientId", deleteClient);

/*
INVOICES
*/

// POST
router.post("/:id/addInvoice", addInvoice);
// GET
router.get("/:id/invoice", getInvoices);
export default router;
