const pool = require('../db/models')

const categoryController = {};

categoryController.getAllCategories = async (req, res, next) => {
    console.log("GET ALL CATEGORIES");
    const client = await pool.connect()
        .catch(err => next({
            log: `listingController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in listingController.getAllListings. Check server logs'
            }
        }));
    try {
        const listingsQuery = `SELECT category FROM listings
            GROUP BY category`

        const response = await client.query(listingsQuery);
        res.locals.categories = response.rows;

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
}

module.exports = categoryController;