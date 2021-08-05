const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
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

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
});
