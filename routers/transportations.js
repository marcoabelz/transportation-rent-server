const express = require("express");
const router = express.Router();

const TransportationController = require("../controllers/TransportationController");

const authentication = require("../middlewares/authentication");
const { authorizationAdmin, authorizationAdminAndStaff } = require("../middlewares/authorization");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", authentication, TransportationController.getTransportations);

//Transportation router
//get transportation
router.get("/", authentication, TransportationController.getTransportations);

//post transportation
router.post("/", authentication, TransportationController.addTransportation);

//get transportation by id
router.get("/:id", authentication, TransportationController.getTransportationById);

//put transportation by id
router.put("/:id", authentication, authorizationAdminAndStaff, TransportationController.updateTransportationById);

//delete transportation by id
router.delete("/:id", authentication, authorizationAdminAndStaff, TransportationController.deleteTransportationById);

router.patch("/:id/img", upload.single("imgUrl"), authentication, authorizationAdminAndStaff, TransportationController.updateImg);
// End of transportation router

module.exports = router;
