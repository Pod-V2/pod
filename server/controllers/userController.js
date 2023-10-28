const pool = require("../db/models");

const userController = {};

userController.getUser = async (req, res, next) => {
  if (!req.cookies.userId) {
    return next({
      log: `userController - missing cookie; ERROR: ${err}`,
      message: {
        err: "Error in userController.getUser. Check server logs",
      },
    });
  }
  const client = await pool
    .connect()
    .then(console.log("Connected to DB"))
    .catch((err) =>
      next({
        log: `userController - pool connection failed; ERROR: ${err}`,
        message: {
          err: "Error in userController.getUser. Check server logs",
        },
      })
    );

  try {
    const userQuery = `SELECT userid, name FROM users WHERE userid = $1`;
    const response = await client.query(userQuery, [req.cookies.userId]);

    if (!response.rows[0])
      return res.status(401).send("Unable to get user info, log in again");
    else {
      res.locals.userInfo = response.rows[0];
      client.release();
      return next();
    }
  } catch (err) {
    if (err) return next(err);
  }
};

userController.getUserListings = async (req, res, next) => {
  const client = await pool
    .connect()
    .then(console.log("Connected to DB"))
    .catch((err) =>
      next({
        log: `userController - pool connection failed; ERROR: ${err}`,
        message: {
          err: "Error in userController.getUserListings. Check server logs",
        },
      })
    );
  try {
    const listingsQuery = `SELECT * FROM listings WHERE userid=$1`;
    const response = await client.query(listingsQuery, [req.cookies.userId]);
    res.locals.listingArr = response.rows;
    console.log(response.rows);
    return next();
  } catch (err) {
    if (err) return next(err);
  }
};

module.exports = userController;
