"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transportation.belongsTo(models.Type, { foreignKey: "typeId" });
      Transportation.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Transportation.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required!",
          },
          notNull: {
            msg: "Name is required!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            msg: "Description is required!",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      location: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
          min: {
            msg: "Minimum price is 1",
            args: 1,
          },
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type id is required!",
          },
          notNull: {
            msg: "Type id is required!",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: "Author id tidak boleh kosong!",
        //   },
        //   notNull: {
        //     msg: "Author id tidak boleh kosong",
        //   },
        // },
      },
    },
    {
      sequelize,
      modelName: "Transportation",
    }
  );
  return Transportation;
};
