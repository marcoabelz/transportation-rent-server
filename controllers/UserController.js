const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async addUser(req, res, next) {
    try {
      let { username, email, password, role, phoneNumber, address } = req.body;
      await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      let displayData = { username, email, role };
      res
        .status(201)
        .json({ message: "Data has been created", createdData: displayData });
    } catch (error) {
      // console.log(error);
      next(error);
      // if (error.name === "SequelizeValidationError") {
      //   let errors = error.errors.map((err) => err.message);
      //   res.status(400).json({ message: errors });
      // } else if (error.name === "SequelizeUniqueConstraintError") {
      //   res.status(400).json({ message: error.errors[0].message });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
    }
  }


  static async login(req, res, next) {
    try {
      // console.log(req.headers.authorization);
      let { email, password } = req.body;
      if (!email) throw { name: "InvalidInputEmailPass" };
      if (!password) throw { name: "InvalidInputEmailPass" };
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "InvalidLogin" };
      }
      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
