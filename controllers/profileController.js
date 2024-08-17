const Event = require('../models/eventModel'); 
const User = require('../models/userModel');

// Controller function to fetch user profile details
const profileinfo = async (req, res) => {
    try {
        const loggedinUser = await User.findOne({ email: req.user.email });
        if (!loggedinUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(loggedinUser); // Send the events as a JSON response
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching user details.' });
    }
};


// Controller function to fetch user booking details
const bookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const events = await Event.find({ participants: userId });
        if (!events) {
            return res.status(204).send("You do not have any booking.");
        }
        res.status(200).json(events); // Send the events as a JSON response
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
};

// Controller function to cancel a booking
const cancelBooking = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const event = await Event.findByIdAndUpdate(
            eventId,
            { $pull: { participants: userId } },
            { new: true }
        );

        if (!event) {
            return res.status(404).send("Event not found");
        }

        res.status(200).json({ message: 'Booking canceled successfully', event });
    } catch (error) {
        console.error('Error canceling booking:', error.message);
        res.status(500).json({ error: 'An error occurred while canceling the booking.' });
    }
};

module.exports = {
    profileinfo,
    bookings,
    cancelBooking
};