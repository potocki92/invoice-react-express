import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const USERNAME_FROM_MONGODB = process.env.USERNAME_FROM_MONGODB;
const PASSWORD_FROM_MONGODB = process.env.PASSWORD_FROM_MONGODB;
const CLUSTER_NAME_FROM_MONGODB = process.env.CLUSTER_NAME_FROM_MONGODB;
const DATABASE_NAME = process.env.DATABASE_NAME;

const uri =
  `mongodb+srv://${USERNAME_FROM_MONGODB}:` +
  encodeURIComponent(PASSWORD_FROM_MONGODB) +
  `@${CLUSTER_NAME_FROM_MONGODB}.zsrttvb.mongodb.net/${DATABASE_NAME}`;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/", routes);
app.use(
  express.static(path.join(new URL(".", import.meta.url).pathname, "public"))
);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
