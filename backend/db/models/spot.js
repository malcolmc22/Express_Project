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

      // creates the one to many association with users table
      Spot.belongsTo(models.User,
        {
          foreignKey: 'ownerId'
        })

      // // connects to users through the joins table reviews
      Spot.hasMany(models.Review,
        {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
        })

      // // creates the one to many association with spotimages table
      Spot.hasMany(models.SpotImage,
        {
          foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
        })

      // // connects to users through the joins table bookings
      Spot.hasMany(models.Booking,
        {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
        })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
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
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
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
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      'excludeCreated': {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    }
  });
  return Spot;
};
