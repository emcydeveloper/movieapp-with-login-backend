import { client } from "./index.js";

async function createMovie(newMovie) {
  const movieCount = await client
    .db("movieappWithLogin")
    .collection("movielist")
    .find({})
    .toArray();
  newMovie.id = parseInt(movieCount.length + 1);

  return client
    .db("movieappWithLogin")
    .collection("movielist")
    .insertOne(newMovie);
}

async function getAllMovies() {
  return client
    .db("movieappWithLogin")
    .collection("movielist")
    .find({})
    .toArray();
}

async function getMovieById(movieid) {
  return client
    .db("movieappWithLogin")
    .collection("movielist")
    .findOne({ id: parseInt(movieid) });
}

async function editMovieById(movieid, editData) {
  return client
    .db("movieappWithLogin")
    .collection("movielist")
    .updateOne({ id: parseInt(movieid) }, { $set: editData });
}

async function deleteMovieByID(movieid) {
  return client
    .db("movieappWithLogin")
    .collection("movielist")
    .deleteOne({ id: parseInt(movieid) });
}

export {
  createMovie,
  getAllMovies,
  getMovieById,
  editMovieById,
  deleteMovieByID,
};
