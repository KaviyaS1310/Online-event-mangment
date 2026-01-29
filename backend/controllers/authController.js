// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Register User
// exports.register = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
        
//         // Check if user exists
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         // Hash Password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({ name, email, password: hashedPassword, role });
//         await user.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// // Login User
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid Credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
//     } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password (security step!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Create a JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, user: { name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};