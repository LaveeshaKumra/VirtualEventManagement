const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const {  authenticationMiddleware,roleMiddleware }  = require('../utils/middleware');


//middleware just to check if user is logged in , as any role can access it
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventDetails);

//crud operations for organizer
router.post('/create',authenticationMiddleware,roleMiddleware("organizer"), eventController.createEvent);
router.put('/update/:id',authenticationMiddleware,roleMiddleware("organizer"), eventController.updateEvent);
router.delete('/delete/:id', authenticationMiddleware, roleMiddleware("organizer"), eventController.deleteEvent);

//operations for a participant
//register for event 
//any role can register for a event , hence removing rolemiddleware 
router.put('/:id/register',authenticationMiddleware, eventController.registerForEvent);




module.exports = router;
