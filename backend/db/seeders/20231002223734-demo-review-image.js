'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');
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
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png'
    },
    {
      reviewId: 2,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png'
    },
    {
      reviewId: 3,
      url: 'https://github.com/malcolmc22/Express_Project/blob/main/images/airbnb_dbdiagram.png'
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
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, {
      reviewId: [1,2,3]
    })
  }
};
