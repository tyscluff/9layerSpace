import express from 'express';
import User from '../schemas/userSchema.js';

//Initialize Route
const router = express.Router();

//GET route for find
router.get('/find', async (req, res) => {
    let username = req.query.username;
    const users = await User.find({username: {$regex: "^" + username}});

    res.send(users);
});

router.put('/newFollow', async (req, res) => {
    const user = await User.findOneAndUpdate({ username: req.body.username }, { $push: {following: req.body.toFollow } }, 
       { returnOriginal: false });

    res.send("Ok"); 
});

router.get('/suggested', async (req, res) => {
    const suggested = await User.find({username: {$ne: req.query.username}}).limit(25);
    

    res.send(suggested);
});

router.get('/following', async (req, res) => {
    const user = await User.find({username: req.query.username});

    const following = user[0].following;

    res.send(following);
});

export default router 
