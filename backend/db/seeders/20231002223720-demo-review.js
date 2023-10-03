'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
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
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'poggers',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'not poggers',
        stars: 1
      },
      {
        spotId: 3,
        userId: 3,
        review: 'kinda poggers',
        stars: 3
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
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      spotId: [1,2,3]
    })
  }
};
