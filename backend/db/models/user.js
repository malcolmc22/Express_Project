'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // connects to spots through the joins table bookings
      // User.belongsToMany(models.Spot,
      //   {
      //     through: models.Booking,
      //     foreignKey: 'userId',
      //     otherKey: 'spotId'
      //   })
      // // connects to spots through the joins table reviews
        User.belongsToMany(models.Spot,
          {
            through: models.Review,
            foreignKey: 'userId',
            otherKey: 'spotId'
          })
      // creates the one to many association with spots
        User.hasMany(models.Spot,
          {
            foreignKey: 'ownerId',
            onDelete: 'CASCADE',
            hooks: true
          })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        // isEmail: false,
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
