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
        const {first_name, last_name, email, password, role} = req.body;
        console.log("registering role:", role)

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        if(!role in Roles){
           res.status(400).send("what kinda role is that?")
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
            role: Roles[role],
        });
        console.log("user created");
        console.log(user);

        // Create token
        // save user token
        user.token = jwt.sign(
            {user_id: user._id, email, role},
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
                { user_id: user._id, email, role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


const {verifyVipToken, verifyToken} = require("./middleware/auth");
const Roles = require("./model/roles");

app.get("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.get("/lounge", verifyVipToken, (req, res) => {
    res.status(200).send("You my VIP <3")
})
//============================================================================

module.exports = app;