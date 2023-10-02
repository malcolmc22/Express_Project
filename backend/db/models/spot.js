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
      // define association here
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.INTEGER
    },
    lng: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
     type: DataTypes.STRING
    },
    price: {
      type: DataTypes.NUMBER
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
