const pool = require("../db/models");

const userController = {};

userController.getUser = async (req, res, next) => {
    const client = await pool.connect().then(console.log('Connected to DB'))
    .catch(err => next({
      log: `authController - pool connection failed; ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    }));

    try {
        const userQuery = `SELECT userid, name FROM users WHERE userid = $1`
        const response = await client.query(userQuery, [ req.cookies.userId ]);
        
        if(!response.rows[0]) return res.status(401).send('Unable to get user info, log in again');

        else {
            res.locals.userInfo = response.rows[0];
            client.release();
            return next();
        }

    } catch (err) {
        if(err) return next(err)
    }
}


module.exports = userController;