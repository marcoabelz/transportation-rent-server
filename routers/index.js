const express = require("express");
const router = express.Router();

const TransportationController = require("../controllers/TransportationController");
const UserController = require("../controllers/UserController");

const authentication = require("../middlewares/authentication");
const { authorizationAdmin } = require("../middlewares/authorization");

router.get("/", authentication, TransportationController.getTransportations);
router.use("/pub", require("../routers/public"));
router.use("/types", require("../routers/types"));
router.use("/transportations", require("../routers/transportations"));

//login user
router.post("/login", UserController.login);
//post user
router.post(
  "/add-user",
  authentication,
  authorizationAdmin,
  UserController.addUser
);

module.exports = router;
