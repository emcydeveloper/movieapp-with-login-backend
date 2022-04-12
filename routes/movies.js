import express from "express";

import {
    createMovie,
    getAllMovies,
    getMovieById,
    editMovieById,
    deleteMovieByID,
  } from "../movie.js";

const router = express.Router();

router.post("/addmovie", async (request, response) => {
    const newMovie = request.body;
    const addNewMovie = await createMovie(newMovie);
    response.send(addNewMovie);
  });
  
  router.get("/getmovies", async function (request, response) {
    const userInfo = await getAllMovies();
    response.send(userInfo);
  });
  
  router.get("/getmovie/:movieid", async function (request, response) {
    const { movieid } = request.params;
    const movieInfo = await getMovieById(movieid);
    movieInfo
      ? response.send(movieInfo)
      : response.status(404).send({ Message: "No Movie found" });
  });
  
  router.put("/editmovie/:movieid", async function (request, response) {
    const editData = request.body;
    const { movieid } = request.params;
    const editInfo = await editMovieById(movieid, editData);
    editInfo
      ? response.send(editInfo)
      : response.status(404).send({ Message: "No user available" });
  });
  
  router.delete("/deletemovie/:movieid", async function (request, response) {
    // const deleteData = request.body;
    const { movieid } = request.params;
    const deleteInfo = await deleteMovieByID(movieid);
    deleteInfo
      ? response.send(deleteInfo)
      : response.status(404).send({ Message: "No user available" });
  });

  export const moviesRouter = router;