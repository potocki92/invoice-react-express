import User from "../models/userModel.js";

// POST
export const addInvoice = async (req, res) => {
  const id = req.params.id;
  const invoice = { ...req.body };
  console.log(id, invoice);
  try {
    const result = await User.updateOne(
      { _id: id },
      { $push: { invoices: invoice } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Invoice added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// GET
export const getInvoice = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user.invoices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// GET
export const getEditInvoice = async (req, res) => {
  const userId = req.params.id;
  const invoiceId = req.params.invoiceId;
  try {
    const user = await User.findById(
      { _id: userId },
      { invoices: { $elemMatch: { _id: invoiceId } } }
    );
    if (!user) {
      res.status(404).send("Invoice not found");
      return;
    }
    const invoice = user.invoices[0];
    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// PUT
export const putInvoice = async (req, res) => {
  const userId = req.params.id;
  const invoiceId = req.params.invoiceId;
  const updateInvoice = { ...req.body };
  try {
    const user = await User.updateOne(
      { _id: userId, "invoices._id": invoiceId },
      { $set: { "invoices.$": updateInvoice } }
    );
    if (user.nModified === 0) {
      res.status(404).send("User not found");
    }
    res.send("Invoice update successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
// DELETE
export const deleteInvoice = async (req, res) => {
  const userId = req.params.id;
  const invoiceId = req.params.invoiceId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { invoices: { _id: invoiceId } } }
    );
    if (!result) {
      res.status(404).send("Invoice not found");
      return;
    }
    res.send("Invoice removed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
