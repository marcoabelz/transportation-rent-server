const { Type } = require("../models");

class TypeController {
  static async addType(req, res, next) {
    try {
      let data = await Type.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
      // if (error.name === "SequelizeValidationError") {
      //   let errors = error.errors.map((err) => err.message);
      //   res.status(400).json({ message: errors });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
    }
  }

  static async getTypes(req, res, next) {
    try {
      let types = await Type.findAll();
      res.status(200).json(types);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTypeById(req, res, next) {
    try {
      let { id } = req.params;
      let type = await Type.findByPk(id);
      if (!type) {
        throw { name: "NotFound" };
      } else {
        let updatedData = await type.update(req.body);
        res.status(200).json({ updatedData });
      }
    } catch (error) {
      next(error)
      // if (error.name === "SequelizeValidationError") {
      //   let errors = error.errors.map((err) => err.message);
      //   res.status(400).json({ message: errors });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
    }
  }

  static async deleteTypeById(req, res, next) {
    try {
      let { id } = req.params;
      let type = await Type.findByPk(id);
      if (!type) {
        throw {name: "NotFound"}
        // res.status(404).json({ message: "Error not found" });
      } else {
        await type.destroy();
        res.status(200).json({ message: `${type.name} success to delete` });
      }
    } catch (error) {
      next(error)
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = TypeController;
