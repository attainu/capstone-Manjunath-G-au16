const express = require("express");
const commentRouter = express.Router();
require("../db/conn");
const Comment = require("../models/commentSchema");
const Authenticate = require("../middleware/authenticate");
commentRouter.use(express.json())

//Upload Comment 
//-----------------------------------------
commentRouter.post("/uploadComment", Authenticate, async (req, res) => {
    const name = req.rootUser.name
    const email = req.rootUser.email
    const { videoID, comment } = req.body;
    if (!comment) {
        return res.status(422).json({ Error: "plz fill the fields properly" });
    }
    try {
        const userComment = new Comment({ name, email, videoID, comment });
        await userComment.save();
        res.status(201).json({ message: "Comment uploaded successfully" });
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = commentRouter;