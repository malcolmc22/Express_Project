const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User } = require('../../db/models');

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
        .exists({ checkFalsy: true})
        .not()
        .isInt()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true})
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

        const imgs = await SpotImage.findByPk(spot.id)

        const url = imgs.url

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
            previewImage: url
        }
        payload.push(data)
    }
    res.json({Spots: payload})

});



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

router.post('/', requireAuth, validateSignup, async(req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const newSpot = await Spot.create({ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price})

    res.json(newSpot);
})

// get all the spots
router.get('/', async(req, res) => {

    const allSpots = await Spot.findAll()
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

        const img = await SpotImage.findByPk(spot.id)

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
            previewImage: url
        }
        payload.push(data)
    }
    res.json({Spots: payload})
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
