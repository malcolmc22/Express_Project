'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');
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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: 'somethingnice',
      city: 'someplacenice',
      state:'new york',
      country:'USOftheA',
      lat: 40.7128,
      lng:74.0060,
      name: 'rich guy',
      description: 'really cool place',
      price: 121.15
    },
    {
      ownerId: 2,
      address: 'somethingnice',
      city: 'someplacenice',
      state:'new york',
      country:'USOftheA',
      lat: 40.7128,
      lng:74.0060,
      name: 'rich guy',
      description: 'really cool place',
      price: 121.15
    },
    {
      ownerId: 3,
      address: 'somethingnice',
      city: 'someplacenice',
      state:'new york',
      country:'USOftheA',
      lat: 40.7128,
      lng:74.0060,
      name: 'rich guy',
      description: 'really cool place',
      price: 121.15
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
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      ownerId: [1,2,3]
    })
  }
};
