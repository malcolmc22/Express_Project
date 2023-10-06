const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {

})

module.exports = router;
