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
      url: 'https://cdn.pixabay.com/photo/2016/12/06/14/33/log-cabin-1886620_640.jpg' ,
      preview: true
    },
    {
      spotId: 2,
      url: 'https://cdn.pixabay.com/photo/2017/11/16/19/29/cottage-2955582_640.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://cdn.pixabay.com/photo/2017/01/30/15/35/autumn-2021154_640.jpg',
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
