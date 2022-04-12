import {client} from "./index.js"

async function createUser(newUser) {
    const userInfo = await client
      .db("movieappWithLogin")
      .collection("userProfile")
      .find({})
      .toArray();
    newUser.id = userInfo.length + 1;
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .insertOne(newUser);
  }
  async function getUserByName(username) {
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .findOne({ username: username });
  }
  
  async function getAllUsers() {
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .find({})
      .toArray();
  }
  
  async function getUsersByID(userid, editData) {
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .findOne({ id: parseInt(userid) });
  }
  
  async function editUserById(userid, editData) {
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .updateOne({ id: parseInt(userid) }, { $set: editData });
  }
  
  async function deleteUserById(userid) {
    return client
      .db("movieappWithLogin")
      .collection("userProfile")
      .deleteOne({ id: parseInt(userid) });
  }

  export{
      createUser,
    getUserByName,
    getAllUsers,
    getUsersByID,
    editUserById,
    deleteUserById,
}