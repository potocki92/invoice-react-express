import User from "../models/userModel.js";

// POST
export const addClient = async (req, res) => {
  const id = req.params.id;
  const client = { ...req.body };
  console.log(id, client);
  try {
    const result = await User.updateOne(
      { _id: id },
      { $push: { clients: client } }
    );
    if (result.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("Client added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// GET
export const getClients = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not founr");
      return;
    }
    res.json(user.clients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// DELETE
export const deleteClient = async (req, res) => {
  const userId = req.params.id;
  const clientId = req.params.clientId;
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { clients: { _id: clientId } } }
    );
    if (!result) {
      res.status(404).send("Client not found");
      return;
    }
    res.send("Client removed successfullt");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
