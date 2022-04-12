import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

import { moviesRouter } from "./routes/movies.js";
import { userRouter } from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

export const client = await createConnection();

app.use("/", moviesRouter);
app.use("/", userRouter);

app.get("/", (request, response) => {
  response.send("Welcome to Movie app API!!");
});

app.listen(PORT, () => console.log(`Am at ${PORT}`));
