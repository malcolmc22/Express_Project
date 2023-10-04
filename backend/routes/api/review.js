const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage } = require('../../db/models');
const review = require('../../db/models/review');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });

    const payload = [];

    for ( let i = 0; i < allReviews.length; i ++) {
        const currReview = allReviews[i];

        const currUser = await User.findByPk(currReview.userId);

        const currSpot = await Spot.findByPk(currReview.spotId);

        const img = await SpotImage.findOne({
            where: {
                spotId: currSpot.id
            }
        });

        let url;

        if (img) url = img.url;

        const reviewImg = await ReviewImage.findOne({
            where: {
                reviewId: currReview.id
            },
            attributes: ['id', 'url']
        })

        const data = {
            id: currReview.id,
            userId: currReview.userId,
            spotId: currReview.spotId,
            review: currReview.review,
            stars: currReview.stars,
            createdAt: currReview.createdAt,
            updatedAt: currReview.updatedAt,
            User: currUser,
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
                description: currSpot.description,
                price: currSpot.price,
                previewImage: url
            },
            ReviewImages: [reviewImg]
        }
        payload.push(data)
    }


    res.json({Reviews: payload})
});




module.exports = router;

// const review = await Review.findOne({
//     where: {
//         userId: user
//     },
//     include: [
//         {
//             model: User,
//             attributes: {
//                 exclude: ['createdAt', 'updatedAt', 'hashedPassword', 'email', 'username']
//             }
//         },
//         {
//             model: Spot,
//             include: {
//                 model: SpotImage,
//                 attributes: [[sequelize.col('url'), 'previewImage']]
//             },
//             attributes: {
//                 exclude: ['createdAt', 'updatedAt'],
//                 include: [ [sequelize.col('SpotImages.url'), 'previewImage'] ]
//             }
//         },
//         {
//             model: ReviewImage,
//             attributes: {
//                 exclude: ['createdAt', 'updatedAt', 'reviewId'],
//             }
//         }
//     ],
// });
