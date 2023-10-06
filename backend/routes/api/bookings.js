const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage, Booking } = require('../../db/models');
const review = require('../../db/models/review');

const router = express.Router();

// delete a booking
router.delete('/:bookingId', requireAuth, async(req, res) => {

    const user = req.user.id;

    const bookingId = req.params.bookingId;

    const bookingExists = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    if (!bookingExists || bookingExists.length <= 0) {
        return res.status(404).json({message: "Booking couldn't be found"})
    };

    const bookingBelongsToUser = await Booking.findOne({
        where: {
            userId: user,
            id: bookingId
        }
    })

    if(bookingBelongsToUser) {

        console.log('here',bookingBelongsToUser.startDate.getTime())
        bookingBelongsToUser.destroy()

        return res.json({message: 'Succesfully deleted'})
    }

    const spotBelongsToUser = await Spot.findAll({
        where: {
            ownerId: user
        }
    })

    if (spotBelongsToUser.length) {
        for (let i = 0; i < spotBelongsToUser.length; i++) {
            const currSpot = spotBelongsToUser[i];

            const checkBelongsToUser = await Booking.findOne({
                where: {
                    spotId: currSpot.id,
                    id: bookingId
                }
            })

            if (checkBelongsToUser) {
                checkBelongsToUser.destroy()

                return res.json({message: 'Succesfully deleted'})
            }
        }
    }

    return res.json('you don\'t own the spot or the booking')
})
// edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const user = req.user.id;

    const bookingId = req.params.bookingId;

    const { startDate, endDate } = req.body;
    let newDate = new Date(startDate);
    let newDate2 = new Date(endDate);
    let startDateString = newDate.toDateString();
    let endDateString = newDate2.toDateString();
    let newDate3 = new Date(endDateString);
    let newDate4 = new Date (startDateString)
    let compareStart = newDate4.getTime();
    let compareEnd = newDate3.getTime();

    if ( compareEnd <= compareStart) {
        const err = new Error("Bad Request")
        err.errors = { endDate: "endDate cannot be on or before startDate"}
        delete err.stack;
        return next(err);
    };

    const bookingExists = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    if (!bookingExists || bookingExists.length <= 0) {
        return res.status(404).json({message: "Booking couldn't be found"})
    };

    const bookingOwner = await Booking.findAll({
        where: {
            userId: user,
            id: bookingId
        }
    })

    if (bookingOwner.length > 0) {
        for (let i = 0; i <bookingOwner.length; i++) {

            let currBooking = bookingOwner[i]
            let currBookingStart = currBooking.startDate.getTime()
            let currBookingEnd = currBooking.endDate.getTime()

            if (compareStart >= currBookingStart && compareStart <= currBookingEnd) {
                const errors = new Error("Sorry, this spot is already booked for the specified dates")
                errors.errors = { startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"}
                delete errors.stack;
                return res.status(403).json({message:"Sorry, this spot is already booked for the specified dates", ...errors})
            };

            if (compareEnd >= currBookingStart && compareEnd <= currBookingEnd) {
                const errors = new Error("Sorry, this spot is already booked for the specified dates")
                errors.errors = { startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"}
                delete errors.stack;
               return res.status(403).json({message:"Sorry, this spot is already booked for the specified dates", ...errors})
            };

            if (compareStart <= currBookingStart && compareEnd >= currBookingEnd) {
                const errors = new Error("Sorry, this spot is already booked for the specified dates")
                errors.errors = { startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"}
                delete errors.stack;
               return res.status(403).json({message:"Sorry, this spot is already booked for the specified dates", ...errors})
            }

            if (Date.now() > currBookingEnd || Date.now() > compareStart) return res.status(403).json({message: `Past bookings can't be modified`});

            currBooking.startDate = compareStart
            currBooking.endDate = compareEnd
            currBooking.validate();
            currBooking.save();

            return res.json(currBooking)
        }
    }
    return res.json('you do not own this booking')

});

// get all bookings from current user
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
