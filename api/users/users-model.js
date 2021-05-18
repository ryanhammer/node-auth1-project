const db = require("../../database/db-config.js");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
const find = () => {
  return db("users").select("id", "username").orderBy("id");
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
const findBy = (filter) => {
  return db("users").where(filter).orderBy("id");
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
const findById = (user_id) => {
  return db("users").where({ user_id }).first();
}

/**
  resolves to the newly inserted user { user_id, username }
 */
const add = async (user) => {
  const [user_id] = await db("users").insert(user, "user_id");
  return findById(user_id);
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = { add, find, findBy, findById };