const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

const User = require("./models/userSchema");
const cookieParser = require("cookie-parser");
const Authenticate = require("./middleware/authenticate");
app.use(cookieParser());

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(require("./routers/user"));

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello from Server");
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
});
