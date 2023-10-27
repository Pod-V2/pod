const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const PORT = 3000;
const app = express();


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser())


const authRouter = require("./routes/authRouter");
const listingRouter = require('./routes/listingRouter');
const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');




app.use('/', express.static(path.join(__dirname, '../dist')));



app.use("/api/listing", listingRouter);
//think we need a router for the location ListingsByCategory in order to render the page.
app.use("/api/image", imageRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", categoryRouter);
app.use('/api/profile', userRouter)


app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
