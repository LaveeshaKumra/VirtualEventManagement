# VirtualEventManagement

# Overview
This project is a backend system for a virtual event management platform. It focuses on user registration, event scheduling, and participant management using MongoDB. The system ensures secure user authentication and provides comprehensive event management capabilities.

# Key Features
- User Authentication: Secure user registration and login using bcrypt for password hashing and JWT for session management.
- Event Management: Create, update, and delete events. Each event includes details such as date, time, description, and participant list.
- Event Registration: Users can register for events and manage their registrations.

# Setup Instructions
## 1. Clone the Repository

    git clone <repository-url>
    cd <repository-directory>

## 2. Database Setup
Install MongoDB<br />
Ensure MongoDB is installed and running on your machine.<br />
Import Database<br />
To import the database and collections:<br />
     
     mongorestore --db events ./events
   
Alternatively, set up the database manually:<br />
Create a database named events.<br />
Create the following collections: events, user.<br />
Predefined Users:<br />
- org1@gmail.com (Role: Organizer)
- test1@gmail.com (Role: Participant)
(Both users have the password: 123456)<br />

## 3. Node Project Setup
Install Dependencies

    npm install  
    
Create Environment File<br />
Create a .env file in the root directory and add the following:<br />

    JWT_SECRET=your_jwt_secret
    DB_STRING='mongodb://localhost:27017/events'

Modify the DB_STRING according to your MongoDB setup.<br />
  
## 4. Start the Node Project
To start the Node.js application, run:<br />

    node index.js

# API Endpoints
## Authentication
### Register

POST localhost:3000/auth/register

Body:

    {
      "email": "org1@gmail.com",
      "password": "123456",
      "role": "organiser" // optional
    }
### Login

POST localhost:3000/auth/login

Body:

    {
        "email": "test1@gmail.com",
        "password": "123456"
    }

## Event Management
### Get All Events

GET localhost:3000/events/

### Get Event by ID

GET localhost:3000/events/:eventid

Header:

    Authorization: Bearer <jwt_token>

### Create Event

POST localhost:3000/events/create

Header:

    Authorization: Bearer <jwt_token>
Body:

    {
        "eventname": "event1",
        "datetime": "{{currentDateTime}}",
        "location": "bangalore",
        "description": "test description",
        "cost": 0
    }
For datetime, use the pre-requisite script:

    var currentDateTime = new Date().toISOString();
    pm.environment.set("currentDateTime", currentDateTime);

### Update Event Details

PUT localhost:3000/events/update/:eventid

Header:

    Authorization: Bearer <jwt_token>
Body:

    {
        "eventname": "Event1 updated details",
        "description": "Live music Event",
        "location": "bangalore",
        "datetime": "{{currentDateTime}}",
        "cost": {
            "$numberDecimal": "10"
        },
        "participants": []
    }

### Delete Event

DELETE localhost:3000/events/delete/:eventid

Header:

    Authorization: Bearer <jwt_token>

### Participant Registration for an Event

PUT localhost:3000/events/:eventid/register

Header:

    Authorization: Bearer <jwt_token>

## User Profile

### Get User Profile

GET localhost:3000/profile

Header:

    Authorization: Bearer <jwt_token>

### Get User Bookings

GET localhost:3000/profile/bookings

Header:

    Authorization: Bearer <jwt_token>

### Cancel Booking

PUT localhost:3000/profile/bookings/:eventId/cancel

Header:

    Authorization: Bearer <jwt_token>



