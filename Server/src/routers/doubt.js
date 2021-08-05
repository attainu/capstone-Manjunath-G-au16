const express = require("express");
const doubtRouter = express.Router();
require("../db/conn");
const Doubt = require("../models/doubtSchema");
const Authenticate = require("../middleware/authenticate");
doubtRouter.use(express.json())

//Display Doubts 
//-----------------------------------------
doubtRouter.get("/doubts", Authenticate, async (req, res) => {
    try {
        doubts = await Doubt.find({ status: "pending" });
        res.status(200).send(doubts);
    } catch (err) {
        console.log(err);
    }
});

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

//Edit Doubt
//--------------------
doubtRouter.put("/editDoubt", Authenticate, async (req, res) => {
    const { id, question } = req.body;
    try {
        await Doubt.findById(id, (error, Update) => {
            Update.question = String(question);
            Update.save();
        });
    } catch (err) {
        console.log(err);
    }
    res.status(200).send("Updated");
});

//Answer Doubt
//--------------------
doubtRouter.put("/answerDoubt", Authenticate, async (req, res) => {
    const answeredBy = req.rootUser.email
    const { id, answer } = req.body;
    const status = "answered"
    try {
        await Doubt.findById(id, (error, Update) => {
            Update.status = String(status);
            Update.answer = String(answer);
            Update.answeredBy = String(answeredBy);
            Update.save();
        });
    } catch (err) {
        console.log(err);
    }
    res.status(200).send("Answered");
});

module.exports = doubtRouter;