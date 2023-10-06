const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const user = req.user.id;

    const reviewImageId = req.params.imageId;

    const reviewImageExists = await ReviewImage.findOne({
        where: {
            id: reviewImageId
        }
    })

    if (!reviewImageExists || reviewImageExists.length <= 0) {
        return res.status(404).json({message: "Review Image couldn't be found"})
    };

    const ownerReviews = await Review.findAll({
        where: {
            userId: user
        }
    })

    for( let i = 0; i < ownerReviews.length; i++) {
        let currReview = ownerReviews[i];
        // return res.json('ur in the loop')
        const ownerImage = await ReviewImage.findOne({
            where: {
                id: reviewImageId,
                reviewId: currReview.id
            }
        })

        if (ownerImage) {
            ownerImage.destroy()
            return res.json({message: "Successfully deleted"})
        }
    }

    return res.json('you don\'t own the image')
})

module.exports = router;
