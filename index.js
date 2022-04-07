import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"


dotenv.config()


const app = express();
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connect 👍✨✨");
  return client;
}

const client = await createConnection();

app.get("/", (request, response) => {
  response.send("hello");
});

app.post("/signup", async (request, response) => {
  const userInfo = await client
    .db("movieappWithLogin")
    .collection("userProfile")
    .find({})
    .toArray();
  const newUser = request.body;
  newUser.id = userInfo.length + 1;
  const addUser = await client
    .db("movieappWithLogin")
    .collection("userProfile")
    .insertOne(newUser);
  response.send(addUser);
});

app.get("/login", (request, response) => {
  response.send("login");
});

app.get("/getusers", async function (request, response) {
  const userInfo = await client
    .db("movieappWithLogin")
    .collection("userProfile")
    .find({})
    .toArray();
  response.send(userInfo);
});

app.get("/getuser/:userid", async function (request, response) {
  const { userid } = request.params;
  const userInfo = await client
    .db("movieappWithLogin")
    .collection("userProfile")
    .findOne({ id: parseInt(userid) });
  userInfo
    ? response.send(userInfo)
    : response.status(404).send({ Message: "No user available" });
});

app.put("/edituser/:userid", async function (request, response) {
  const editData = request.body;
  const { userid } = request.params;
  const editInfo = await client
    .db("movieappWithLogin")
    .collection("userProfile")
    .updateOne({ id: parseInt(userid) }, { $set: editData });
  editInfo
    ? response.send(editInfo)
    : response.status(404).send({ Message: "No user available" });
});

app.post("/addmovie", async (request, response) => {
  const movieCount = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .find({})
    .toArray();
  const newMovie = request.body;
  newMovie.id = parseInt(movieCount.length + 1);
  const addMovie = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .insertOne(newMovie);
  response.send(addMovie);
});

app.get("/getmovies", async function (request, response) {
  const userInfo = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .find({})
    .toArray();
  response.send(userInfo);
});

app.get("/getmovie/:movieid", async function (request, response) {
  const { movieid } = request.params;
  const movieInfo = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .findOne({ id: parseInt(movieid) });
  movieInfo
    ? response.send(movieInfo)
    : response.status(404).send({ Message: "No user available" });
});

app.put("/editmovie/:movieid", async function (request, response) {
  const editData = request.body;
  const { movieid } = request.params;
  const editInfo = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .updateOne({ id: parseInt(movieid) }, { $set: editData });
  editInfo
    ? response.send(editInfo)
    : response.status(404).send({ Message: "No user available" });
});

app.listen(5000, () => console.log("am at 5000"));
