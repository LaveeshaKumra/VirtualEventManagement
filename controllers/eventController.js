// controllers/eventController.js
const Event = require('../models/eventModel'); 
const User = require('../models/userModel');
const { validateEventDetails } = require('../utils/validation');

// // Controller function to fetch all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database
        res.status(200).json(events); // Send the events as a JSON response
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
};

const getEventDetails = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found.');
        }
        res.status(200).json(event); // Send the event as a JSON response
    } catch (error) {
        console.error('Error fetching event details:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching event details.' });
    }
};




const createEvent = async (req, res) => {
    const { error, value } = validateEventDetails(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }
    try {
        const { eventname , description ,datetime ,location, cost ,participants  } = value;
        const organizer = await User.findOne({ email: req.user.email });
        if (!organizer) {
            return res.status(404).send("Organizer not found");
        }
        const newEvent = new Event({ 
            'eventname':eventname,
            'description':description,
            'datetime': new Date(datetime),
            'location':location,
            'cost':cost,
            'participants':participants,
            'organizer':organizer
        });
        await newEvent.save();
        const status={
            'status':'Event Created',
            newEvent
        }
        res.status(201).send(status);
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error.');
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updateData = req.body;
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found.');
        }
        // Update the event
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found.');
        }

        // Delete the event
        await Event.findByIdAndDelete(eventId);
        res.status(200).send('Event deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
}


const registerForEvent = async (req, res) => {
    const eventId = req.params.id;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).send('Event not found.');
    }
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
        return res.status(404).send("User not found");
    }

    console.log(event)
    console.log(user)
   
    try {
        // Check if the user is already a participant
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found.');
        }

        if (event.participants.includes(user._id)) {
            return res.status(400).send('User is already a participant.');
        }

        await Event.updateOne(
            { _id: eventId },
            { $addToSet: { participants: user._id } } // $addToSet prevents duplicates
        );

        // Fetch the updated event
        const updatedEvent = await Event.findById(eventId);
        console.log(updatedEvent);
        res.status(500).send('Registered Successfully');
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error.');
    }

    // Update the event with registered candidate
    // const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
    // res.status(201).send(status);
    // res.json(updatedEvent);
};

module.exports = {
    getAllEvents,createEvent,updateEvent,deleteEvent,
    getEventDetails,registerForEvent
};
