const express = require('express');
const profileController = require('../controllers/profileController');
const {  authenticationMiddleware }  = require('../utils/middleware');


const router = express.Router();

router.get('/',authenticationMiddleware, profileController.profileinfo);
router.get('/bookings', authenticationMiddleware, profileController.bookings);
router.put('/bookings/:eventId/cancel', authenticationMiddleware, profileController.cancelBooking);

module.exports = router;