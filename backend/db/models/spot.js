'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )

      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      )

      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      )

      Spot.belongsToMany(
        models.User,
        {through: models.Booking,
        foreignKey: 'spotId',
        otherKey: 'userId'
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lng: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
     type: DataTypes.STRING,
     allowNull: true
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Spot;
};
