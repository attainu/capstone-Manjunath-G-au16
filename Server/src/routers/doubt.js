const express = require("express");
const doubtRouter = express.Router();
require("../db/conn");
const Doubt = require("../models/doubtSchema");
const Authenticate = require("../middleware/authenticate");
doubtRouter.use(express.json())

//ask Doubt 
//-----------------------------------------
doubtRouter.post("/askDoubt", Authenticate, async (req, res) => {
    const askedBy = req.rootUser.email
    const { question } = req.body;
    if (!question) {
        return res.status(422).json({ Error: "plz fill the field properly" });
    }
    try {
        const doubt = new Doubt({ askedBy, question });
        await doubt.save();
        res.status(201).json({ message: "Doubt asked successfully" });
    } catch (err) {
        console.log(err);
    }
});

module.exports = doubtRouter;