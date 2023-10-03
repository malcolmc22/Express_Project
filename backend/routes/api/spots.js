const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User } = require('../../db/models');

const router = express.Router();

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

})

router.get('/', async(req, res) => {
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

        const url = img.url

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
