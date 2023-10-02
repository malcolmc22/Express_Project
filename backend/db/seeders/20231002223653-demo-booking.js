'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');
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
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      startDate: '2022-02-02',
      endDate: '2023-02-02'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2022-03-03',
      endDate: '2023-03-03'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2022-04-04',
      endDate: '2023-04-04'
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: [1, 2, 3]
    })
  }
};
