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

    const spotImageId = req.params.imageId;

    const spotImageExists = await SpotImage.findOne({
        where: {
            id: spotImageId
        }
    })

    if (!spotImageExists || spotImageExists.length <= 0) {
        return res.status(404).json({message: "Spot Image couldn't be found"})
    };


    const ownerSpots = await Spot.findAll({
        where: {
            ownerId: user
        }
    })

    for( let i = 0; i < ownerSpots.length; i++) {
        let currSpot = ownerSpots[i];
        // return res.json('ur in the loop')
        const ownerImage = await SpotImage.findOne({
            where: {
                spotId: currSpot.id,
                id: spotImageId
            }
        })

        if (ownerImage) {
            ownerImage.destroy()
            return res.json({message: "Successfully deleted"})
        }
    }

    return res.json('you don\'t own the image!')
})

module.exports = router;
