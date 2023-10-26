const pool = require('../db/models');

const listingController = {};

listingController.getAllListings = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getAllListings. Check server logs'
            }
        }));
    try {
        const listingsQuery = `SELECT l.product_title,
            l.price,
            l.category,
            u.name AS seller,
            l.img_url
        FROM listings l
        JOIN users u
          ON l.userid = u.userid;`;

        const response = await client.query(listingsQuery);
        res.locals.listings = response.rows;

    } catch (err) {
        console.log(err.message);
        return next({
            log: `listingController.getAllListings - querying listings from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getAllListings. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.getListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.getListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        });
        console.log(`passed in query param: ${id}`);
        const getListingQuery = `SELECT l.product_title AS listing,
            l.price,
            l.category,
            u.name AS seller,
            l.img_url,
            l.description
        FROM listings l
        JOIN users u
            ON l.userid = u.userid
        WHERE l.listingid = $1;`;

        const response = await client.query(getListingQuery, [ id ]);
        res.locals.listing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.getListing - querying listing from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

/**
 * Create a new listing
 * @param {*} req
 * @param {string} req.body.userid
 * @param {string} req.body.product_title
 * @param {string} req.body.price
 * @param {string} req.body.description
 * @param {string} req.body.category
 * @param {string} req.body.img_url
 * @param {*} res
 * @param {*} next
 * @returns
 */
listingController.createListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.createListing. Check server logs'
            }
        }));
    try {
        const createListingQuery = `INSERT INTO listings
                (product_title, price, category, userid, description, img_url)
            VALUES ($1, $2, $3, $4, $5, $6)`;
        // console.log('request body: ', req.body);

        await client.query(createListingQuery, [
            req.body.product_title,
            req.body.price,
            req.body.category,
            req.body.userid,
            req.body.description,
            req.body.img_url
        ]);
    } catch (err) {
        return next({
            log: `listingController.createListing - inserting into listings table ERROR: ${err}`,
            message: {
                err: 'Error in listingController.createListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.updateListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.updateListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });
        console.log('passed in id param: ', id);
        console.log('request body: ', req.body);
        // const { updateVals } = req.body;
        const catsToUpdate = Object.keys(req.body);
        const newVals = Object.values(req.body);
        if (!catsToUpdate || !newVals) return next({
            log: `listingController.updateListing - improper body (categories or values) ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });

        let setColumns = '';
        catsToUpdate.forEach((category, i, arr) => {
            setColumns += `${category} = $${i + 2}`;
            if (i < arr.length - 1) setColumns += ', ';
        });

        const updateListingQuery = `UPDATE listings
            SET ${setColumns}
            WHERE _id = $1
            RETURNING *`;

        const response = await client.query(updateListingQuery, [id, ...newVals]);
        res.locals.updatedListing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.updateListing - querying listings from db ERROR: ${err}`,
            message: {
                err: 'Error in listingController.updateListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

listingController.deleteListing = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        }));
    try {
        const { id } = req.params;
        if (!id) return next({
            log: `listingController.deleteListing - never received an ID in params ERROR : ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        });
        console.log('passed in id param: ', id);

        const deleteListingQuery = `DELETE FROM listings
            WHERE _id = $1
            RETURNING *`;

        const response = await client.query(deleteListingQuery, [ id ]);
        res.locals.deletedListing = response.rows[0];
    } catch (err) {
        return next({
            log: `listingController.deleteListing - inserting into listings table ERROR: ${err}`,
            message: {
                err: 'Error in listingController.deleteListing. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
};

module.exports = listingController;
