if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const routers = require("./routers");
const cors = require("cors");
//pake dotenv kalo lagi ga production

const express = require("express");
const app = express();
// const port = 3000;
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routers);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
