const express = require("express");
const router = express.Router();

const TransportationController = require("../controllers/TransportationController");

const authentication = require("../middlewares/authentication");

router.get("/", authentication, TransportationController.getTransportations);
router.get(
  "/transportation",
  TransportationController.getTransportationsPublic
);
router.get(
  "/transportation/:id",
  TransportationController.getTransportationByIdPublic
);

module.exports = router;
