const pool = require('../db/models');

const cartController = {};

cartController.getAllUserCart = async (req, res, next) => {
    const userCartQuery = `SELECT l.product_title, l.price, c."numberOfItems" AS qty
    FROM carts c
    JOIN users u
        ON c.userid = u.userid
    JOIN listings l
        ON l.listingid = 2
    WHERE u.userid = $1;`

    
    
    const response = await client.query(userCartQuery, [ id ]);
    // const response = await client.query(userCartQuery);
    res.locals.userCart = response.rows;
}

cartController.getUserCart = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        }));
    try {
        const { id } = req.query;
        console.log('~ ~ ~ id: ', id);
        if (!id) return next({
            log: `cartController.getUserCart - never received an ID in query`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        });
        console.log(`passed in query param: ${id}`);
        // const userCartQuery = `SELECT l.product_title, l.price, c.numberOfItems AS qty
        // FROM carts c
        // JOIN users u
        //     ON c.userid = u.userid
        // JOIN listings l
        //     ON c.listingid = l.listingid
        // WHERE u.userid = $1;`
        const userCartQuery = `SELECT c.listingid
        FROM carts c
        WHERE c.userid = $1;`
        
        const response = await client.query(userCartQuery, [ id ]);
        // const response = await client.query(userCartQuery);
        res.locals.userCart = response.rows[0];
        console.log('> > > userCart: ', res.locals.userCart);
    } catch (err) {
        return next({
            log: `cartController.getUserCart - querying user cart from db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.getUserCart. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
}

cartController.addToUserCart = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        }));
    try {
        const { userId, listingId, qty } = req.query;
        if (!userId || !listingId || !qty) return next({
            log: `cartController.addToUserCart - never received user and/or listing ID(s) and/or qty in query ERROR`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        });
        console.log(`user id: ${userId}`);
        console.log(`listing id: ${listingId}, qty: ${qty}`);

        // check if user already has item in cart
        const checkQuery = `SELECT quantity FROM carts
        WHERE user_id = $1 AND listing_id = $2`;
        const checkResponse = await client.query(checkQuery, [ userId, listingId ]);
        // console.log('what do we got?', checkResponse);
        if (checkResponse.rows.length) {
            console.log('We got something already');
            console.log('we have this many already: ', checkResponse.rows[0].quantity);
            req.query.qty = parseInt(qty) + checkResponse.rows[0].quantity;
            return cartController.updateUserCart(req, res, next);
        }
        
        const addToCartQuery = `INSERT INTO carts
        VALUES ($1, $2, $3);`
        await client.query(addToCartQuery, [ userId, listingId, qty ]);
        client.release();
        return next();
    } catch (err) {
        return next({
            log: `cartController.addToUserCart - inserting into user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.addToUserCart. Check server logs'
            }
        });
    }
}

cartController.updateUserCart = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        }));
    try {
        const { userId, listingId, qty } = req.query;
        if (!userId || !listingId || !qty) return next({
            log: `cartController.updateUserCart - never received user and/or listing ID(s) and/or qty in query ERROR`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        });
        console.log(`user id: ${userId}`);
        console.log(`listing id: ${listingId}, NEW qty: ${qty}`);
        // if quantity in cart for listing is now 0, delete
        if (parseInt(qty) === 0) {
            console.log('delete this item from cart');
            return cartController.removeCartItem(req, res, next);
        }

        const updateCartQuery = `UPDATE carts
        SET quantity = $1
        WHERE user_id = $2 AND listing_id = $3;`;

        await client.query(updateCartQuery, [ qty, userId, listingId ]);
    } catch (err) {
        return next({
            log: `cartController.updateUserCart - altering user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
}

cartController.updateListingOfUserCart = async (req, res, next) => {
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateListingOfUserCart. Check server logs'
            }
        }));
    try {
        console.log('req.query from cartController.updateListingOfUserCart: ', req.query);
        console.log('req.body from cartController.updateListingOfUserCart: ', req.body);
        const { userId } = req.query;
        const listingIds = req.body;
        if (!userId || !listingIds) return next({
            log: `cartController.updateListingOfUserCart - never received user and/or listing ID(s) and/or qty in query ERROR`,
            message: {
                err: 'Error in cartController.updateListingOfUserCart. Check server logs'
            }
        });
        // console.log(`user id: ${userId}`);
        // console.log(`listing id: ${listingIds}, NEW qty: ${qty}`);
        // if quantity in cart for listing is now 0, delete
        // if (parseInt(qty) === 0) {
        //     console.log('delete this item from cart');
        //     return cartController.removeCartItem(req, res, next);
        // }
        console.log('listingIds from cartController: ', listingIds);
        console.log('userId from cartController: ', userId);
        const updateCartQuery = `UPDATE carts
        SET listingid = $1
        WHERE userid = $2;`;

        await client.query(updateCartQuery, [ listingIds, userId ]);
    } catch (err) {
        return next({
            log: `cartController.updateUserCart - altering user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
}

cartController.removeCartItem = async (req, res, next) => {
    console.log('. . . removing');
    const client = await pool.connect()
        .catch(err => next({
            log: `cartController - pool connection failed ERROR: ${err}`,
            message: {
                err: 'Error in cartController.updateUserCart. Check server logs'
            }
        }));
    try {
        const { userId, listingId } = req.query;
        console.log('<> userId, listingId: ', userId, listingId);
        if (!userId || !listingId) return next({
            log: `cartController.removeCartItem - never received user and/or listing ID(s) in query ERROR`,
            message: {
                err: 'Error in cartController.removeCartItem. Check server logs'
            }
        });
        console.log(`user id: ${userId}`);
        console.log(`listing to remove: ${listingId}`);

        // const removeItemQuery = `DELETE FROM carts
        // WHERE userid = $1 AND listingid = $2;`;
        // await client.query(removeItemQuery, [ userId, listingId ]);

        const removeItemQuery = `DELETE FROM carts
        WHERE userid = $1;`;
        await client.query(removeItemQuery, [ userId ]);
    } catch (err) {
        return next({
            log: `cartController.removeFromCart - deleting from user cart in db ERROR: ${err}`,
            message: {
                err: 'Error in cartController.removeFromCart. Check server logs'
            }
        });
    } finally {
        client.release();
        return next();
    }
}

module.exports = cartController;