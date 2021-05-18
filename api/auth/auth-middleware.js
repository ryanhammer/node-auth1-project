const Users = require("../users/users-model.js");

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
const restricted = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next({
      status: 401,
      message: 'You shall not pass!'
    });
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
const checkUsernameFree = (req, res, next) => {
  Users.findBy(req.body.username)
    .then(([user]) => {
      if (user) {
        res.status(422).json({
          message: "Username taken"
      });
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    })
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
const checkUsernameExists = (req, res, next) => {
  Users.findBy(req.body.username)
    .then(([user]) => {
      if (user) {
        next();
      } else {
        res.status(401).json({
            message: "Invalid credentials"
        });
      }
    })
    .catch(err => {
      next(err);
    })
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
const checkPasswordLength = (req, res, next) => {
  const password = req.body.password;
  if (!password || password.trim().length < 3) {
    res.status(422).json({
      message: "Password must be longer than 3 chars"
    });
  } else {
    next();
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}