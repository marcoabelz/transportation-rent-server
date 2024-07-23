const { Transportation } = require("../models");

async function authorizationAdmin(req, res, next) {
  try {
    if (req.user.role !== "admin") throw { name: "Admin Only" };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationAdminAndStaff(req, res, next) {
  try {
    let { id } = req.params;
    let data = await Transportation.findByPk(id);
    if (!data) throw { name: "NotFound" };
    if (req.user.role === "admin") {
      next();
    } else {
      if (data.authorId === req.user.id) {
        next();
      } else {
        throw { name: "Forbidden" };
      }
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  authorizationAdmin,
  authorizationAdminAndStaff,
};
