const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

const User = require("./models/userSchema");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello from Server");
});

//User Registration
//-----------------------------------------
app.post("/register", async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ Error: "plz fill the field properly" });
    }
    try {
        const userExist = await User.findOne({
            email: email
        });
        if (userExist) {
            return res.status(422).json({ Error: "User already Exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ Error: "Passwords are not matching " });
        } else {
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});

//User login
//-----------------------------------------
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Fill both the fields" });
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credentials" });
            } else {
                const token = await userLogin.generateAuthToken();
                console.log("token:", token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now + 25892000000),
                    httpOnly: true,
                });
                return res.json({ message: "User signedin successfully" });
            }
        } else {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
});
