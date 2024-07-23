const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/TypeController");

const authentication = require("../middlewares/authentication");
const {
  authorizationAdmin,
  authorizationAdminAndStaff,
} = require("../middlewares/authorization");

//Type router
//post type
router.post("/", authentication, TypeController.addType);

//get type
router.get("/", authentication, TypeController.getTypes);

//put type
router.put(
  "/:id",
  authentication,
  authorizationAdmin,
  TypeController.updateTypeById
);

//delete type
router.delete(
  "/:id",
  authentication,
  authorizationAdmin,
  TypeController.deleteTypeById
);
//End of type router

module.exports = router;
