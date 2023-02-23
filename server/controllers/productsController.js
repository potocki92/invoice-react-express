import User from "../models/userModel.js";

// POST
export const addProduct = async (req, res) => {
  const id = req.params.id;
  const product = { ...req.body };
  console.log(id, product);
  try {
    const result = await User.updateOne(
      { _id: id },
      { $push: { products: product } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Product added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// GET
export const getProducts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user.products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const userId = req.params.id;
  const productId = req.params.productId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { products: { _id: productId } } }
    );
    if (!result) {
      res.status(404).send("Product not found");
      return;
    }
    res.send("Product removed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
