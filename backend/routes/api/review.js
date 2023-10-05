const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage } = require('../../db/models');
const review = require('../../db/models/review');

const router = express.Router();

const validateEditReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt()
        .isLength({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// add image to review based on review ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const user = req.user.id;

    let reviewId = req.params.reviewId;
    reviewId = parseInt(reviewId);
    const { url } = req.body;

    const allReviews = await Review.findOne({
        where: {
            id: req.params.reviewId,
            userId: req.user.id
        }
    })

    if (!allReviews || allReviews.length <= 0) {
        return res.status(404).json({message: "Review couldn't be found"})
    };

    const allImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (allImages.length >= 10) {
        return res.status(403).json({message: 'Maximum number of images for this resource was reached'})
    }

    const newReviewImage = await ReviewImage.create({reviewId: allReviews.id, url})


    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
});
// delete a review
router.delete('/:reviewId', requireAuth, async(req, res) => {

})
// edit a review
router.put('/:reviewId', requireAuth, validateEditReview, async (req, res) => {

    const { review, stars } = req.body;

    const currentReview = await Review.findOne({
        where: {
            id: req.params.reviewId,
            userId: req.user.id
        }
    })

    if (!currentReview || currentReview.length <= 0) {
        return res.status(404).json({message: "Review couldn't be found"})
    };

    const editedReview = await Review.findByPk(req.params.reviewId);

        editedReview.review = review
        editedReview.stars = stars

    editedReview.validate();
    editedReview.save();

    res.json(editedReview)

});

// get all reviews of the current user
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

        const reviewImg = await ReviewImage.findAll({
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
