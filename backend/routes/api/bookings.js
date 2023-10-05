const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const allBookings = await Booking.findAll({
        where: {
            userId: user
        }
    })

    const payload = [];

    for (let i = 0; i < allBookings.length; i ++) {
        const currBooking = allBookings[i];

        const currUser = await User.findByPk(currBooking.userId);

        const currSpot = await Spot.findByPk(currBooking.spotId);

        const img = await SpotImage.findOne({
            where: {
                spotId: currSpot.id
            }
        });

        let url;

        if (img) url = img.url;

        const data = {
            id: currBooking.id,
            spotId: currBooking.spotId,
            Spot: {
                id: currSpot.id,
                ownerId: currSpot.ownerId,
                address: currSpot.address,
                city: currSpot.city,
                state: currSpot.state,
                country: currSpot.country,
                lat: currSpot.lat,
                lng: currSpot.lng,
                name: currSpot.name,
                price: currSpot.price,
                previewImage: url
            },
            userId: currBooking.userId,
            startDate: currBooking.startDate,
            endDate: currBooking.endDate,
            createdAt: currBooking.endDate,
            updatedAt: currBooking.updatedAt
        }

        payload.push(data)
    }

    res.json({Bookings: payload})
})


module.exports = router;
