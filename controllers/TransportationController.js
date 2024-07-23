const { Transportation, Type, User } = require("../models");
const { v2: cloudinary } = require("cloudinary");
const { Op } = require("sequelize");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class TransportationController {
  static async addTransportation(req, res, next) {
    try {
      let { name, description, imgUrl, location, price, typeId } = req.body;
      let transportation = await Transportation.create({
        name,
        description,
        imgUrl,
        location,
        price,
        typeId,
        authorId: req.user.id,
      });
      res.status(201).json({
        message: `Transportation ${req.body.name} created`,
        transportation,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransportations(req, res, next) {
    try {
      let transportations = await Transportation.findAll({
        include: [
          {
            model: Type,
          },
          {
            model: User,
          },
        ],
      });
      res.status(200).json({ transportations });
    } catch (error) {
      next(error);
    }
  }

  static async getTransportationsPublic(req, res, next) {
    try {
      const { filter, sort, page, search } = req.query;
      const paramsQuerySQL = {};

      //filtering
      if (filter) {
        paramsQuerySQL.where = {
          typeId: filter,
        };
      }

      //sotring
      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;

        paramsQuerySQL.order = [[columnName, ordering]];
      }

      //pagination
      let limit = 10;
      let pageNumber = 1;

      if (page) {
        //limit = 10
        //page 1 -> 1 - 10 -> offset = 0, limit 10,
        //page 2 -> 11 - 20 -> offset = 10, limit 10
        //page 3 -> 21 - 30 -> offset = 20, limit 10

        //offset = limit * (pageNumber - 1)
        if (page.size) {
          limit = +page.size;
          paramsQuerySQL.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          paramsQuerySQL.offset = limit * (pageNumber - 1);
        }
      }

      if (search) {
        paramsQuerySQL.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const { count, rows } = await Transportation.findAndCountAll(
        paramsQuerySQL
      );
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransportationById(req, res, next) {
    try {
      const { id } = req.params;
      let transportation = await Transportation.findByPk(id);
      if (!transportation) {
        throw { name: "NotFound" };
      } else {
        res.status(200).json({ transportation });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getTransportationByIdPublic(req, res, next) {
    try {
      const { id } = req.params;
      let transportation = await Transportation.findByPk(id, {
        attributes: ["name", "description", "imgUrl", "location", "price"],
        include: {
          model: Type,
          attributes: ["name"],
        },
      });

      if (!transportation) {
        throw { name: "NotFound" };
      } else {
        res.status(200).json({ transportation });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateTransportationById(req, res, next) {
    try {
      let { id } = req.params;
      let { name, description, imgUrl, location, price, typeId } = req.body;
      let transportation = await Transportation.findByPk(id);
      if (!transportation) {
        throw { name: "NotFound" };
      } else {
        await transportation.update({
          name,
          description,
          imgUrl,
          location,
          price,
          typeId,
        });
        res
          .status(200)
          .json({ name, description, imgUrl, location, price, typeId });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransportationById(req, res, next) {
    try {
      let { id } = req.params;
      let transportation = await Transportation.findByPk(id);
      if (!transportation) {
        throw { name: "NotFound" };
      } else {
        await transportation.destroy();
        res
          .status(200)
          .json({ message: `${transportation.name} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateImg(req, res, next) {
    try {
      if (!req.file) {
        throw {
          name: "uploadFailed",
          message: "Image is required",
        };
      }
      const base64 = Buffer.from(req.file.buffer).toString("base64");
      const base64string = `data:${req.file.mimetype};base64,${base64}`;
      let result = await cloudinary.uploader.upload(base64string);
      let data = await Transportation.findByPk(req.params.id);
      if (!data) throw { name: "NotFound" };
      await Transportation.update(
        { imgUrl: result.url },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ message: `image ${data.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransportationController;
