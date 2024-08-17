const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validateRegistration, validateLogin } = require('../utils/validation');
const JWT_SECRET = process.env.JWT_SECRET;


exports.register = async (req, res) => {
    // Validate if the registration request is valid
    const { error } = validateRegistration(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }

    // Get email/password from request
    const { email, password , role} = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists.");
        }

        // Save hashed password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword ,role });
        //console.log(newUser)
        await newUser.save();

        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error.');
    }
};


exports.login = async (req, res) => {
    // Validate if the login request is valid
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Get email/password from request
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).send("Invalid email or password.");
        }

        // Check if the password is correct
        const pwdcheck = await bcrypt.compare(password, existingUser.password);
        if (!pwdcheck) {
            return res.status(400).send('Invalid email or password.');
        }
        console.log(existingUser)
        console.log(existingUser._id)
        // Generate a JWT token
        const token = jwt.sign({
            email: existingUser.email,
            role: existingUser.role,
            _id: existingUser._id
        }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error.');
    }
};