'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png' ,
      preview: true
    },
    {
      spotId: 2,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png',
      preview: false
    }
   ], {validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {
      spotId: [1,2,3]
    })
  }
};
