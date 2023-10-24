const pool = require("../db/models");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 12;

const authController = {};

authController.createUser = async (req, res, next) => {
  
  const { name, email, password } = req.body
  console.log(req.body)
  
  if(!name || !email || !password) return next({ message: { err: 'Missing information to create account' } });

  // what are the required fields here? // what do we need to error test for

  const client = await pool.connect().then(console.log('Connected to DB'))
    .catch(err => next({
      log: `authController - pool connection failed; ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    }));
  try {
    const createUserQuery = `INSERT INTO users(name, email, password) VALUES($1, $2, $3);`;
    bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      const newPass = hash;
      if (err) return next({
        log: `authController - bcrypt error ERROR: ${err}`,
        message: {
          err: 'Error in authController.createUser. Check server logs'
        }
      });
      client.query(createUserQuery, [
        name,
        email,
        newPass
      ]);
    });
  } catch (err) {
    return next({
      log: `authController.createUser - querying listings from db ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    });
  } finally {
    client.release();
    return next();
  }
};

authController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) return next({ message: { err: 'Incorrect email or password' } });

  const client = await pool.connect()
    .catch((err) => next({
      log: `authController - pool connection failed; ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    }));
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.redirect('/login/?Error=missing_info');
    const userQuery = `SELECT email, password FROM users WHERE email = $1`;
    const response = await client.query(userQuery, [ email ]);
    const passwordMatch = await bcrypt.compare(password, response.rows[0].password);
    if (!passwordMatch) res.status(401).send('Login failed, incorrect email or password');
    else {
      client.release();
      return next();
    }
  } catch (e) {
    return next({
      log: `authController.createUser - querying listings from db ERROR: ${err}`,
      message: {
        err: "Error in authController.createUser. Check server logs",
      },
    });
  }
};

module.exports = authController;
