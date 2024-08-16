const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: Date, // Stores both date and time
        required: true
    },
    location: {
        type: String,
        required: true
    },
    cost: {
        type: mongoose.Types.Decimal128, // Stores both date and time
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
