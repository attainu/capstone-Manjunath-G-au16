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
        res.status(500).send(err)
    }
});

//Display My Doubts 
//-----------------------------------------
doubtRouter.get("/myDoubts", Authenticate, async (req, res) => {
    const askedBy = req.rootUser.email
    try {
        doubts = await Doubt.find({ askedBy: askedBy });
        res.status(200).send(doubts);
    } catch (err) {
        res.status(500).send(err)
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
        res.status(500).send(err)
    }
});

//Edit Doubt
//--------------------
doubtRouter.put("/editDoubt/:id", Authenticate, async (req, res) => {
    try {
        const _id = req.params.id
        const doubt = await Doubt.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(200).send(doubt)
    } catch (err) {
        res.status(500).send(err)
    }
});

//Delete Doubt
//--------------------
doubtRouter.delete("/deleteDoubt/:id", Authenticate, async (req, res) => {
    try {
        const _id = req.params.id
        const doubt = await Doubt.findByIdAndDelete(_id)
        res.status(200).send(doubt)
    } catch (err) {
        res.status(500).send(err)
    }
});

//Answer Doubt
//--------------------
doubtRouter.put("/answerDoubt/:id", Authenticate, async (req, res) => {
    try {
        const answer = req.body.answer
        const answeredBy = req.rootUser.email
        const status = "answered"
        const _id = req.params.id
        const doubt = await Doubt.findByIdAndUpdate(_id, { answer, answeredBy, status }, {
            new: true
        })
        res.status(200).send(doubt)
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = doubtRouter;