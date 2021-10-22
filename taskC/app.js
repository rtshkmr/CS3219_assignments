require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// Logic goes here
// importing user context
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// =========================== ROUTES ======================================
// REGISTER ROUTE
app.post("/register", async (req, res) => {
    let encryptedPassword;
    try {
        // Get user input
        const {first_name, last_name, email, password} = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        // save user token
        user.token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


const auth = require("./middleware/auth");

app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
//============================================================================

module.exports = app;