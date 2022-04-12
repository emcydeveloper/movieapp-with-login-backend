import express from "express"

import {
    createUser,
    getUserByName,
    getAllUsers,
    getUsersByID,
    editUserById,
    deleteUserById,
  } from "../user.js";
  

const router = express.Router();

router.post("/signup", async (request, response) => {
    const newUser = request.body;
    const addUser = await createUser(newUser);
    response.send(addUser);
  });
  
  router.get("/login/:username", async (request, response) => {
    const { username } = request.params;
    const userInfo = await getUserByName(username);
    userInfo
      ? response.send(userInfo)
      : response.status(404).send({ Message: "Invalid username" });
  });
  
  router.get("/getusers", async function (request, response) {
    const userInfo = await getAllUsers();
    response.send(userInfo);
  });
  
  router.get("/getuser/:userid", async function (request, response) {
    const { userid } = request.params;
    const userInfo = await getUsersByID(userid);
    userInfo
      ? response.send(userInfo)
      : response.status(404).send({ Message: "No user available" });
  });
  
  router.put("/edituser/:userid", async function (request, response) {
    const editData = request.body;
    const { userid } = request.params;
    const editInfo = await editUserById(userid, editData);
    editInfo
      ? response.send(editInfo)
      : response.status(404).send({ Message: "No user available" });
  });
  
  router.delete("/deleteuser/:userid", async function (request, response) {
    // const deleteData = request.body;
    const { userid } = request.params;
    const deleteInfo = await deleteUserById(userid);
    deleteInfo
      ? response.send(deleteInfo)
      : response.status(404).send({ Message: "No user available" });
  });

  export const userRouter = router;