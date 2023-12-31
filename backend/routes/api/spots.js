const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage, Booking } = require('../../db/models');
const { noExtendLeft } = require('sequelize/lib/operators');
const cookieParser = require('cookie-parser');

const router = express.Router();

const validateSignup = [
    check('address')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        // .exists({ checkFalsy: true})
        .not()
        .isInt()
        .withMessage('Latitude is not valid'),
    check('lng')
        // .exists({ checkFalsy: true})
        .not()
        .isInt()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy : true})
        .withMessage('Price per day is required'),
    handleValidationErrors
]

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt()
        .isLength({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors,
]

const validatePaginations = [
    check('page')
        .exists().optional({values: 'falsy'})
        .isInt({min: 1})
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .exists().optional({values: 'falsy'})
        .isInt({min:1})
        .withMessage('Size must be greater than or equal to 1'),
    check("maxLat")
        .exists().optional({values: 'falsy'})
        .isFloat({min: -90, max: 90})
        .withMessage("Maximum latitude is invalid"),
    check("minLat")
        .exists().optional({values: 'falsy'})
        .isFloat({min: -90, max: 90})
        .withMessage("Minimum latitude is invalid"),
    check("minLng")
        .exists().optional({values: 'falsy'})
        .isFloat({min: -180, max: 180})
        .withMessage("Maximum longitude is invalid"),
    check("maxLng")
        .exists().optional({values: 'falsy'})
        .isFloat({min: -180, max: 180})
        .withMessage("Minimum longitude is invalid"),
    check("minPrice")
        .exists().optional({values: 'falsy'})
        .isFloat({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .exists().optional({values: 'falsy'})
        .isFloat({min: 0})
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]
// creating booking based on spot ID
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {

    const user = req.user.id;

    let spotId = req.params.spotId;
    const payload = [];

    const {startDate, endDate} = req.body;
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
        next(err);
    };

    const spotExists = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if (!spotExists || spotExists.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const booking = await Booking.findAll({
        where: {
            spotId: spotExists.id
        }
    })

    const spotOwner = await Spot.findAll({
        where: {
            ownerId: user,
            id: spotId
        }
    })

    if(!spotOwner.length) {
        // console.log(spotExists)
        for (let i = 0; i <booking.length; i++) {

            let currBooking = booking[i]
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
            };

        }

        const newBooking = await Booking.create({spotId: spotExists.id, userId: user, startDate, endDate})
        return res.json(newBooking)
    }

    return res.status(401).json('you own the spot')
});

// get all bookings for spot on spot id
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const user = req.user.id;

    const spotId = req.params.spotId;

    const payload = [];

    const spotExists = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if (!spotExists || spotExists.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const notOwnedBookings = await Booking.findAll({
        where: {
            spotId: spotExists.id
        }
    })

    const spotOwner = await Spot.findAll({
        where: {
            id: spotExists.id,
            ownerId: user
        }
    })


    if (spotOwner.length) {
        const ownedBookings = await Booking.findAll({
            where:{
                spotId: spotExists.id
            }
        });

        for( let i = 0; i < ownedBookings.length; i++) {
            const currBooking = ownedBookings[i];
            // console.log('this', currSpot.id)
            const currUser = await User.findByPk(user)

            // const currBooking = await Booking.findOne({
            //     where: {
            //         spotId: currSpot.id,
            //         userId: currUser.id
            //     }
            // })

            const data = {
                User: {
                    id: currUser.id,
                    firstName: currUser.firstName,
                    lastName: currUser.lastName
                },
                id: currBooking.id,
                spotId: currBooking.spotId,
                userId: currBooking.userId,
                startDate: currBooking.startDate,
                endDate: currBooking.endDate,
                createdAt: currBooking.endDate,
                updatedAt: currBooking.updatedAt
            }
            payload.push(data)
        }

        return res.json({Bookings: payload})
    }
    if (!spotOwner.length) {

        for( let i = 0; i < notOwnedBookings.length; i++) {
            const currBooking = notOwnedBookings[i];

            const data = {
                spotId: spotExists.id,
                startDate: currBooking.startDate,
                endDate: currBooking.endDate
            }
            payload.push(data)
        }
        return res.json({Bookings: payload})
    }
});

// create review for spot based on spot id
router.post('/:spotId/reviews', requireAuth, validateNewReview, async (req, res) => {
    const { review, stars } = req.body;

    const  {spotId}  = req.params.spotId;

    const userId = req.user.id;

    const allSpots = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!allSpots || allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: allSpots.id
        }
    })

    console.log(existingReview)
    if (existingReview) return res.status(500).json({message: 'User already has a review for this spot'});



    const newReview = await Review.create({spotId: allSpots.id, userId, review, stars});



    res.status(201).json(newReview)
});

// all reviews by spot id
router.get('/:spotId/reviews', async( req, res) => {
    const allReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    const allSpots = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })

    if (!allSpots || allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };
   const payload = [];

    for (let i = 0; i < allReviews.length; i++ ) {
        const currReview = allReviews[i];

        const user = await User.findOne({
            where: {
                id: currReview.userId
            },
            attributes: ['id', 'firstName', 'lastName']
        });

        const images = await ReviewImage.findAll({
            where: {
                reviewId: currReview.id
            },
            attributes: ['id', 'url']
        });

        const data = {
            id: currReview.id,
            userId: currReview.userId,
            spotId: currReview.spotId,
            review: currReview.review,
            stars: currReview.stars,
            createdAt: currReview.createdAt,
            updatedAt: currReview.updatedAt,
            User: user,
            ReviewImages: images
        }

        payload.push(data);
    }
    res.json({Reviews: payload})
})
// add image to a spot based on spot id
router.post('/:spotId/images', requireAuth, async(req, res) => {

    const { spotId } = req.params

    const { url, preview } = req.body;

    const allSpots = await Spot.findAll({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    })

    if (!allSpots || allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const newImg = await SpotImage.create({spotId, url ,preview})

    res.json({
        id: newImg.id,
        url: newImg.url,
        preview: newImg.preview
    })
});

// get all spots owned by the current logged in user
router.get('/current', requireAuth, async (req, res) => {

    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    const payload = [];

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];

        const all = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        const sum = await Review.sum('stars',{
            where: {
                spotId: spot.id
            }
        })

        const img = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })

        let url;

        if (img) url = img.url

        const avg = sum / all.length

        const data = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avg,
            previewImage: url || spot.previewImage
        }
        payload.push(data)
    }
    res.json({Spots: payload})

});

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;

    const allSpots = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    })

    if (!allSpots || allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    allSpots.destroy();

    res.json({mesage: 'Successfully deleted'});
});

// edit a spot
router.put('/:spotId', requireAuth, validateSignup, async (req, res) => {
    const { spotId } = req.params

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const allSpots = await Spot.findAll({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    })

    if (!allSpots || allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const editedSpot = await Spot.findByPk(spotId)

        editedSpot.address = address,
        editedSpot.city = city,
        editedSpot.state = state,
        editedSpot.country = country,
        editedSpot.lat = lat || 1,
        editedSpot.lng = lng || 1,
        editedSpot.name = name,
        editedSpot.description = description,
        editedSpot.price = price

        editedSpot.validate();
        editedSpot.save();

    res.json(editedSpot)
})


// get a spot by its ID
router.get('/:spotId', async (req, res) => {

    const { spotId } = req.params

    const allSpots = await Spot.findAll({
        where: {
            id: spotId
        }
    })

    if (allSpots.length <= 0) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const payload = [];

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];

        const all = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        const owner = await User.findByPk(spot.ownerId)

        const sum = await Review.sum('stars',{
            where: {
                spotId: spot.id
            }
        })

        const imgs = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        })

        const avg = sum / all.length

        const data = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews: all.length,
            avgRating: avg,
            SpotImages: imgs,
            Owner: owner
        }
        payload.push(data)
    }
    res.json({Spots: payload})

})

// create a new spot
router.post('/', requireAuth, validateSignup, async(req, res) => {

    const {address, city, state, country, lat, lng, name, description, price, previewImg} = req.body;

    const newSpot = await Spot.create({ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price})
    // delete validateSignup.stack
    newSpot.previewImage = previewImg
    res.json(newSpot);
})

// get all the spots
router.get('/', validatePaginations, async(req, res) => {
    let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    const payload = [];
    const pagination = {};
    if (!page) page = 1;
    if (!size) size = 20;
    if (page != 0) {
        pagination.limit = size ? size : 20;
        pagination.offset = page ? size * (page - 1) : 0;
    }
    const where = {}
    const queryObj = {where: {}, ...pagination}

    let customFunc;

    // if (process.env.NODE_ENV === 'production') {
    //     customFunc = 'num_value'
    // } else {
    //     customFunc = 'value'
    // }

    if (minLat) {
        // console.log('u hit here')
        queryObj.where.lat = {
            [Op.gte]: parseFloat(minLat)
        }
        // queryObj.where = sequelize.where(sequelize.fn(customFunc, sequelize.col('lat')), { [Op.gte]: parseFloat(minLat)})
    };

    if (maxLat) {
        queryObj.where.lat = {
            [Op.lte]: parseFloat(maxLat)
        }
    };

    if (minLng) {
        queryObj.where.lat = {
            [Op.gte]: parseFloat(minLng)
        }
    };

    if (maxLng) {
        queryObj.where.lat = {
            [Op.lte]: parseFloat(maxLng)
        }
    };

    if(minPrice) {
        queryObj.where.price = {
            [Op.gte]: parseFloat(minPrice)
        }
    };

    if (maxPrice) {
        queryObj.where.price = {
            [Op.lte]: parseFloat(maxPrice)
        }
    };

    const allSpots = await Spot.findAll(queryObj)

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];

        const all = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        const sum = await Review.sum('stars',{
            where: {
                spotId: spot.id
            }
        })

        const img = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })

        let url;

        if (img) url = img.url

        const avg = sum / all.length

        const data = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avg,
            previewImage: url || spot.previewImage
        }
        payload.push(data)
    }
    res.json({Spots: payload, page, size: pagination.limit})
})



module.exports = router;

// const allSpots = await Spot.findAll({
    //     include: [
    //         {
    //             model: SpotImage,
    //             attributes: []
    //         },
    //         {
    //             model: Review,
    //             attributes: []
    //         }
    //     ],
    //     attributes: {
    //         include:
    //         [
    //             [sequelize.col('SpotImages.url'), 'previewImage'],
    //         ]
    //     }
    // });
    // allSpots.avgRating = await Spot.sum('price')
    // // let test =
    // console.log( allSpots.id )
