import express from "express";
import {
  getUser,
  loginUser,
  putUser,
  registerUser,
} from "./controllers/userController.js";
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
import {
  addInvoice,
  deleteInvoice,
  getEditInvoice,
  getInvoice,
  putInvoice,
} from "./controllers/invoiceController.js";
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
router.get("/:id/invoices", getInvoice);
// GET
router.get("/:id/invoice/:invoiceId", getEditInvoice);
// DELETE
router.delete("/:id/invoices/:invoiceId", deleteInvoice);
// PUT
router.put("/:id/invoice/:invoiceId", putInvoice);
/*
USER
*/

// GET
router.get("/:id/user", getUser);

router.put("/:id/user", putUser);

export default router;
